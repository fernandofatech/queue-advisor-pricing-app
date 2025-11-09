interface PricingData {
  sqs: { "1M": string; "10M": string; "100M": string }
  kafka: { "1M": string; "10M": string; "100M": string }
}

// This is more reliable than fetching large pricing files and updates infrequently enough
// that static data is appropriate. Sources:
// SQS: https://aws.amazon.com/sqs/pricing/
// MSK: https://aws.amazon.com/msk/pricing/
export async function getAwsPricing(): Promise<PricingData> {
  // SQS Standard Queue pricing
  // First 1M requests/month: Free (but we'll show cost beyond free tier)
  // $0.40 per million requests after free tier
  const sqsPricePerMillion = 0.4

  // MSK pricing (kafka.m5.large instances in us-east-1)
  // Broker: $0.21/hour
  // Storage: $0.10/GB-month
  const mskBrokerHourlyRate = 0.21
  const hoursPerMonth = 730 // Standard month
  const storageGBMonth = 0.1

  // Calculate MSK costs (3 brokers minimum for high availability)
  const mskBaseCost = 3 * mskBrokerHourlyRate * hoursPerMonth // ~$460/month

  // Estimate storage needs based on message volume
  // 1M messages = ~10GB, 10M = ~100GB, 100M = ~500GB
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
