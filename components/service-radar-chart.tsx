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

  // Updated colors for better contrast and brand consistency
  const sqsColor = theme === "dark" ? "hsl(265, 60%, 70%)" : "hsl(265, 70%, 55%)"
  const kafkaColor = theme === "dark" ? "hsl(40, 80%, 65%)" : "hsl(40, 85%, 50%)"
  const gridColor = theme === "dark" ? "hsl(250, 20%, 35%)" : "hsl(250, 15%, 70%)"
  const textColor = theme === "dark" ? "hsl(0, 0%, 95%)" : "hsl(0, 0%, 15%)"

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
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{
              fill: textColor,
              fontSize: 10,
              fontWeight: 500,
            }}
            stroke={gridColor}
          />
          <Radar
            name="Amazon SQS"
            dataKey="sqs"
            stroke={sqsColor}
            fill={sqsColor}
            fillOpacity={0.4}
            strokeWidth={3}
          />
          <Radar
            name="Apache Kafka (MSK)"
            dataKey="kafka"
            stroke={kafkaColor}
            fill={kafkaColor}
            fillOpacity={0.4}
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
