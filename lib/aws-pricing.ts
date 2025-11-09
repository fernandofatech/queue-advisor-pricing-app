interface PricingData {
  sqs: { "1M": string; "10M": string; "100M": string }
  kafka: { "1M": string; "10M": string; "100M": string }
}

// Static pricing data based on official AWS pricing pages (US East - N. Virginia region)
// This approach is more reliable than fetching large pricing files and updates infrequently
// Sources:
// SQS: https://aws.amazon.com/sqs/pricing/
// MSK: https://aws.amazon.com/msk/pricing/
// Last updated: November 2024
export async function getAwsPricing(): Promise<PricingData> {
  // SQS Standard Queue pricing (US East - N. Virginia)
  // First 1M requests/month: Free tier
  // After free tier: $0.40 per million requests (Standard) or $0.50 per million (FIFO)
  // Each 64KB chunk of payload counts as 1 request
  // Message size: up to 256KB
  const sqsPricePerMillion = 0.4

  // MSK pricing (kafka.m5.large instances in US East - N. Virginia)
  // Broker instance: $0.21/hour per broker (billed per second)
  // Storage: $0.10/GB-month
  // Minimum 3 brokers recommended for high availability and fault tolerance
  const mskBrokerHourlyRate = 0.21
  const hoursPerMonth = 730 // Standard month (24 hours × 30.42 days)
  const storageGBMonth = 0.1

  // Base infrastructure cost (3 brokers for production-grade HA)
  const mskBaseCost = 3 * mskBrokerHourlyRate * hoursPerMonth // ~$460.50/month

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
  }
}
