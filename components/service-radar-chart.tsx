"use client"

import { motion } from "framer-motion"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { useTheme } from "@/components/theme-provider"

interface ServiceRadarChartProps {
  data: Array<{
    metric: string
    sqs: number
    kafka: number
  }>
}

export function ServiceRadarChart({ data }: ServiceRadarChartProps) {
  const { theme } = useTheme()

  const sqsColor = theme === "dark" ? "hsl(190, 70%, 60%)" : "hsl(190, 75%, 45%)"
  const kafkaColor = theme === "dark" ? "hsl(280, 65%, 65%)" : "hsl(280, 70%, 50%)"
  const gridColor = theme === "dark" ? "hsl(190, 50%, 40%)" : "hsl(190, 40%, 60%)"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[400px] md:h-[500px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke={gridColor} strokeWidth={1.5} />
          <PolarAngleAxis
            dataKey="metric"
            tick={{
              fill: "hsl(var(--foreground))",
              fontSize: 13,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
            }}
          />
          <Radar
            name="Amazon SQS"
            dataKey="sqs"
            stroke={sqsColor}
            fill={sqsColor}
            fillOpacity={0.5}
            strokeWidth={2.5}
          />
          <Radar
            name="Apache Kafka (MSK)"
            dataKey="kafka"
            stroke={kafkaColor}
            fill={kafkaColor}
            fillOpacity={0.5}
            strokeWidth={2.5}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
