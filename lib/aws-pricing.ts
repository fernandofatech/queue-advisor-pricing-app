export type AwsRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-central-1"
  | "ap-southeast-1"
  | "ap-northeast-1"
  | "sa-east-1"

export interface RegionInfo {
  code: AwsRegion
  name: string
  location: string
}

export interface PricingData {
  sqs: { "1M": string; "10M": string; "100M": string }
  kafka: { "1M": string; "10M": string; "100M": string }
  region: RegionInfo
}

export const AWS_REGIONS: Record<AwsRegion, RegionInfo> = {
  "us-east-1": { code: "us-east-1", name: "US East (N. Virginia)", location: "🇺🇸 Virginia" },
  "us-east-2": { code: "us-east-2", name: "US East (Ohio)", location: "🇺🇸 Ohio" },
  "us-west-1": { code: "us-west-1", name: "US West (N. California)", location: "🇺🇸 California" },
  "us-west-2": { code: "us-west-2", name: "US West (Oregon)", location: "🇺🇸 Oregon" },
  "eu-west-1": { code: "eu-west-1", name: "Europe (Ireland)", location: "🇮🇪 Ireland" },
  "eu-central-1": { code: "eu-central-1", name: "Europe (Frankfurt)", location: "🇩🇪 Germany" },
  "ap-southeast-1": { code: "ap-southeast-1", name: "Asia Pacific (Singapore)", location: "🇸🇬 Singapore" },
  "ap-northeast-1": { code: "ap-northeast-1", name: "Asia Pacific (Tokyo)", location: "🇯🇵 Japan" },
  "sa-east-1": { code: "sa-east-1", name: "South America (São Paulo)", location: "🇧🇷 Brazil" },
}

// Regional pricing variations (multipliers based on us-east-1)
// Source: https://aws.amazon.com/sqs/pricing/ and https://aws.amazon.com/msk/pricing/
const REGIONAL_PRICING: Record<
  AwsRegion,
  { sqsMultiplier: number; mskBrokerMultiplier: number; mskStorageMultiplier: number }
> = {
  "us-east-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.0, mskStorageMultiplier: 1.0 },
  "us-east-2": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.0, mskStorageMultiplier: 1.0 },
  "us-west-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.048, mskStorageMultiplier: 1.025 },
  "us-west-2": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.0, mskStorageMultiplier: 1.0 },
  "eu-west-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.048, mskStorageMultiplier: 1.0 },
  "eu-central-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.095, mskStorageMultiplier: 1.05 },
  "ap-southeast-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.095, mskStorageMultiplier: 1.025 },
  "ap-northeast-1": { sqsMultiplier: 1.0, mskBrokerMultiplier: 1.143, mskStorageMultiplier: 1.05 },
  "sa-east-1": { sqsMultiplier: 1.5, mskBrokerMultiplier: 1.5, mskStorageMultiplier: 1.5 },
}

// Static pricing data based on official AWS pricing pages
// Sources:
// SQS: https://aws.amazon.com/sqs/pricing/
// MSK: https://aws.amazon.com/msk/pricing/
// Last updated: November 2024
export async function getAwsPricing(region: AwsRegion = "us-east-1"): Promise<PricingData> {
  const pricing = REGIONAL_PRICING[region]

  // SQS Standard Queue pricing (base: US East - N. Virginia)
  // First 1M requests/month: Free tier
  // After free tier: $0.40 per million requests (Standard)
  // Each 64KB chunk of payload counts as 1 request
  const sqsBasePricePerMillion = 0.4
  const sqsPricePerMillion = sqsBasePricePerMillion * pricing.sqsMultiplier

  // MSK pricing (kafka.m5.large instances, base: US East - N. Virginia)
  // Broker instance: $0.21/hour per broker (billed per second)
  // Storage: $0.10/GB-month
  // Minimum 3 brokers recommended for high availability
  const mskBaseBrokerHourlyRate = 0.21
  const mskBaseStorageGBMonth = 0.1
  const mskBrokerHourlyRate = mskBaseBrokerHourlyRate * pricing.mskBrokerMultiplier
  const storageGBMonth = mskBaseStorageGBMonth * pricing.mskStorageMultiplier

  const hoursPerMonth = 730 // Standard month (24 hours × 30.42 days)

  // Base infrastructure cost (3 brokers for production-grade HA)
  const mskBaseCost = 3 * mskBrokerHourlyRate * hoursPerMonth

  // Storage estimates based on message volume and retention
  // Assumptions: 1KB avg message size, 7-day retention
  // 1M messages = ~10GB, 10M = ~100GB, 100M = ~500GB (with replication factor 3)
  const msk1M = mskBaseCost + 10 * storageGBMonth
  const msk10M = mskBaseCost + 100 * storageGBMonth
  const msk100M = mskBaseCost + 500 * storageGBMonth

  // Return pricing structure
  return {
    sqs: {
      "1M": `$${sqsPricePerMillion.toFixed(2)}`,
      "10M": `$${(sqsPricePerMillion * 10).toFixed(2)}`,
      "100M": `$${(sqsPricePerMillion * 100).toFixed(2)}`,
    },
    kafka: {
      "1M": `$${msk1M.toFixed(2)}`,
      "10M": `$${msk10M.toFixed(2)}`,
      "100M": `$${msk100M.toFixed(2)}`,
    },
    region: AWS_REGIONS[region],
  }
}

// Get best region (lowest cost) for a given workload
export function getBestPricingRegion(messagesPerMonth: number): { region: RegionInfo; reason: string } {
  // For very high volume, lower MSK multipliers matter more
  if (messagesPerMonth > 100000000) {
    return {
      region: AWS_REGIONS["us-east-1"],
      reason: "Lowest MSK broker and storage costs for high-volume workloads",
    }
  }

  // For moderate volume, SQS is likely chosen, so both have equal pricing
  return {
    region: AWS_REGIONS["us-east-1"],
    reason: "Most cost-effective for SQS workloads (same price across most US regions)",
  }
}
