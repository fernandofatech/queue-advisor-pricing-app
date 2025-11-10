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

  // Bright, vibrant colors that work well in both themes
  const sqsColor = "#10b981" // Emerald green
  const kafkaColor = "#8b5cf6" // Purple
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = theme === "dark" ? "#f3f4f6" : "#1f2937"
  const axisColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[350px] sm:h-[400px] md:h-[450px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke={gridColor} strokeWidth={1.5} />
          <PolarAngleAxis
            dataKey="metric"
            tick={{
              fill: textColor,
              fontSize: 12,
              fontWeight: 600,
            }}
            stroke={axisColor}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{
              fill: textColor,
              fontSize: 11,
              fontWeight: 500,
            }}
            stroke={axisColor}
          />
          <Radar
            name="Amazon SQS"
            dataKey="sqs"
            stroke={sqsColor}
            fill={sqsColor}
            fillOpacity={0.3}
            strokeWidth={3}
          />
          <Radar
            name="Apache Kafka (MSK)"
            dataKey="kafka"
            stroke={kafkaColor}
            fill={kafkaColor}
            fillOpacity={0.3}
            strokeWidth={3}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "13px",
              fontWeight: 600,
              color: textColor,
            }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
