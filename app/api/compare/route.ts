import { type NextRequest, NextResponse } from "next/server"
import { getAwsPricing, getBestPricingRegion, type AwsRegion } from "@/lib/aws-pricing"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Extract region from form data
    const region: AwsRegion = formData.region || "us-east-1"

    // Fetch AWS pricing data for selected region
    const pricing = await getAwsPricing(region)

    // Extract and normalize form data
    const messagesPerMonth = Number.parseInt(formData.messagesPerMonth) || 0
    const requireOrdering = formData.requireOrdering === "yes"
    const replayNeeded = formData.replayNeeded === "yes"
    const messageLossTolerance = formData.messageLossTolerance
    const isMulticloud = formData.environment === "multicloud"
    const monthlyBudget = Number.parseInt(formData.monthlyBudget) || 0

    // Get best pricing region recommendation
    const bestRegion = getBestPricingRegion(messagesPerMonth)

    let recommendation = "Amazon SQS"
    let explanation = ""
    let queueType = "Standard"

    // Decision logic based on AWS best practices and use case patterns

    // Priority 1: Replay capability is a strong indicator for Kafka
    if (replayNeeded && messagesPerMonth > 10000000) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "Your requirement for message replay with significant volume makes Kafka the optimal choice. MSK provides unlimited message retention and replay capabilities, essential for event sourcing, audit trails, and data reprocessing scenarios. Kafka's log-based architecture allows consumers to rewind and reprocess messages from any point in time."
    }
    // Priority 2: Ordering + Replay + High Volume = Kafka
    else if (requireOrdering && replayNeeded) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "Your need for strict message ordering combined with replay capabilities is a classic Kafka use case. MSK maintains strict ordering within partitions and allows unlimited replay of historical messages. This is ideal for event streaming architectures, CQRS patterns, and complex event processing where both order and reprocessability are critical."
    }
    // Priority 3: Very high volume typically justifies Kafka's infrastructure costs
    else if (messagesPerMonth > 100000000) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "At this message volume (100M+ messages/month), Kafka's architecture provides better throughput and lower per-message costs. MSK can handle millions of messages per second per broker, and the fixed infrastructure cost becomes more economical than per-request pricing at scale. You'll also benefit from Kafka's superior monitoring and operational tooling for high-throughput workloads."
    }
    // Priority 4: Multicloud strategy favors portable solutions
    else if (isMulticloud && (messagesPerMonth > 5000000 || replayNeeded)) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "For multicloud architectures with your workload requirements, Kafka offers superior portability. While MSK is AWS-managed, Apache Kafka runs consistently across all cloud providers and on-premises environments. This prevents vendor lock-in and enables seamless workload migration. Consider using Kafka's MirrorMaker for cross-region or cross-cloud replication."
    }
    // Priority 5: Ordering without replay - consider SQS FIFO
    else if (requireOrdering && !replayNeeded && messagesPerMonth < 50000000) {
      recommendation = "Amazon SQS"
      queueType = "FIFO"
      explanation =
        "SQS FIFO queues are perfect for your ordering requirements. With high-throughput mode, FIFO queues support up to 70,000 messages per second (3,000 per second in standard mode), providing strict ordering and exactly-once processing. This is significantly simpler and more cost-effective than Kafka when replay isn't needed. FIFO queues are ideal for financial transactions, task sequencing, and order processing systems."
    }
    // Priority 6: Low budget + moderate volume = SQS
    else if (monthlyBudget < 100 && messagesPerMonth < 50000000) {
      recommendation = "Amazon SQS"
      explanation =
        "For your budget and message volume, SQS is the most economical choice. With the free tier covering 1 million requests per month and $0.40 per additional million, SQS offers unbeatable value for moderate workloads. It's fully serverless with no infrastructure to manage, eliminating operational overhead and allowing you to focus entirely on your application logic."
    }
    // Priority 7: Critical data with very low loss tolerance
    else if (messageLossTolerance === "low" && messagesPerMonth > 50000000) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "For mission-critical workloads at this scale with low loss tolerance, Kafka's durable, replicated commit log architecture provides superior data durability guarantees. MSK replicates data across multiple availability zones with configurable replication factors and acknowledgment modes (acks=all). Combined with Kafka's log compaction and retention policies, you get enterprise-grade reliability for critical data."
    }
    // Default: SQS Standard for general-purpose message queuing
    else {
      recommendation = "Amazon SQS"
      queueType = "Standard"
      explanation =
        "Based on your requirements, SQS Standard queues provide the optimal balance of simplicity, cost, and scalability. With unlimited throughput, at-least-once delivery, and no infrastructure management, SQS excels at decoupling microservices, handling background jobs, and load leveling. The serverless model means you only pay for what you use, with automatic scaling to handle any load. This is AWS's recommended solution for asynchronous message processing."
    }

    // Add queue type to recommendation if SQS
    if (recommendation === "Amazon SQS" && queueType) {
      explanation = `Recommended queue type: **${queueType}**\n\n${explanation}`
    }

    // Radar chart data - scaled 0-10 based on actual capabilities
    const radarData = [
      { metric: "Cost Efficiency", sqs: 9, kafka: messagesPerMonth > 100000000 ? 7 : 4 },
      { metric: "Throughput", sqs: 8, kafka: 10 },
      { metric: "Latency", sqs: 9, kafka: 7 },
      { metric: "Operational Simplicity", sqs: 10, kafka: 4 },
      { metric: "Message Replay", sqs: 1, kafka: 10 },
      { metric: "Durability", sqs: 8, kafka: 10 },
    ]

    return NextResponse.json({
      recommendation,
      explanation,
      radarData,
      pricing,
      bestRegion,
    })
  } catch (error) {
    console.error("[v0] Error in compare API:", error)
    return NextResponse.json({ error: "Failed to process comparison" }, { status: 500 })
  }
}
