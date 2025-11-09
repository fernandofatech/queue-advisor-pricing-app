export interface ComparisonResult {
  recommendation: string
  explanation: string
  radarData: Array<{
    metric: string
    sqs: number
    kafka: number
  }>
  pricing: {
    sqs: { "1M": string; "10M": string; "100M": string }
    kafka: { "1M": string; "10M": string; "100M": string }
  }
}
