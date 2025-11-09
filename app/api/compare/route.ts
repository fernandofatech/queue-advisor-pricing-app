import { type NextRequest, NextResponse } from "next/server"
import { getAwsPricing } from "@/lib/aws-pricing"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Fetch AWS pricing data
    const pricing = await getAwsPricing()

    // Decision logic
    const messagesPerMonth = Number.parseInt(formData.messagesPerMonth) || 0
    const requireOrdering = formData.requireOrdering === "yes"
    const replayNeeded = formData.replayNeeded === "yes"
    const messageLossTolerance = formData.messageLossTolerance
    const isMulticloud = formData.environment === "multicloud"

    let recommendation = "Amazon SQS"
    let explanation = ""

    // High volume + replay = Kafka
    if (messagesPerMonth > 50000000 && replayNeeded) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "You selected high volume with replay requirements. Kafka provides better event streaming control and message retention for complex event processing scenarios."
    }
    // Strict ordering + replay = Kafka
    else if (requireOrdering && replayNeeded) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "Your need for strict ordering and message replay makes Kafka the ideal choice. It maintains message order within partitions and allows unlimited replay capabilities."
    }
    // Multicloud = prefer Kafka (portable)
    else if (isMulticloud) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "For multicloud environments, Kafka offers better portability. While MSK is AWS-managed, Kafka can run anywhere, making migration easier."
    }
    // Low tolerance for loss + high volume
    else if (messageLossTolerance === "low" && messagesPerMonth > 100000000) {
      recommendation = "Apache Kafka (MSK)"
      explanation =
        "With extremely high volume and low tolerance for message loss, Kafka's durable, replicated logs provide superior guarantees for critical data."
    }
    // Default to SQS
    else {
      recommendation = "Amazon SQS"
      explanation =
        "Based on your requirements, SQS is the most cost-effective choice. It's fully managed, serverless, and ideal for decoupling microservices without the operational overhead of managing brokers."
    }

    // Radar chart data
    const radarData = [
      { metric: "Cost", sqs: 9, kafka: 5 },
      { metric: "Throughput", sqs: 7, kafka: 10 },
      { metric: "Latency", sqs: 8, kafka: 7 },
      { metric: "Simplicity", sqs: 10, kafka: 4 },
      { metric: "Replay", sqs: 2, kafka: 10 },
    ]

    return NextResponse.json({
      recommendation,
      explanation,
      radarData,
      pricing,
    })
  } catch (error) {
    console.error("[v0] Error in compare API:", error)
    return NextResponse.json({ error: "Failed to process comparison" }, { status: 500 })
  }
}
