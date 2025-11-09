import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://queueadvisor.fernando.moretes.com"),
  title: {
    default: "QueueAdvisor | AWS SQS vs Kafka Comparison Tool - Choose the Right Messaging Service",
    template: "%s | QueueAdvisor by Fernando Azevedo",
  },
  description:
    "Expert AWS messaging service comparison tool built by Solutions Architect Fernando Francisco Azevedo. Compare Amazon SQS and Apache Kafka (MSK) with real pricing data across 9 AWS regions. Get AI-powered recommendations based on your technical requirements, message volume, and budget. Supports EN/PT with MCP integration.",
  keywords: [
    "AWS SQS",
    "Apache Kafka",
    "AWS MSK",
    "Amazon SQS",
    "Kafka vs SQS",
    "AWS messaging",
    "message queue comparison",
    "AWS pricing calculator",
    "AWS Solutions Architect",
    "Fernando Francisco Azevedo",
    "AWS architecture decision",
    "serverless messaging",
    "event streaming",
    "AWS regions pricing",
    "SQS FIFO",
    "Kafka MSK pricing",
    "cloud messaging",
    "AWS MCP",
    "Model Context Protocol",
    "AWS automation",
    "comparação AWS",
    "SQS vs Kafka português",
  ],
  authors: [{ name: "Fernando Francisco Azevedo", url: "https://fernando.moretes.com" }],
  creator: "Fernando Francisco Azevedo",
  publisher: "Fernando Francisco Azevedo",
  generator: "v0.app",
  applicationName: "QueueAdvisor",
  referrer: "origin-when-cross-origin",
  category: "Technology",
  classification: "AWS Tools, Cloud Architecture, Developer Tools",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: "https://queueadvisor.fernando.moretes.com",
    title: "QueueAdvisor - AWS SQS vs Kafka Comparison Tool with Real Pricing",
    description:
      "Make informed AWS messaging decisions with QueueAdvisor. Compare SQS and Kafka (MSK) across 9 regions with real-time pricing. Built by AWS Solutions Architect Fernando Francisco Azevedo.",
    siteName: "QueueAdvisor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QueueAdvisor - AWS SQS vs Kafka Decision Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QueueAdvisor | AWS SQS vs Kafka Comparison Tool",
    description:
      "Expert AWS messaging comparison with real pricing across 9 regions. Make better architecture decisions.",
    creator: "@fernandoazevedo",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://queueadvisor.fernando.moretes.com",
    languages: {
      en: "https://queueadvisor.fernando.moretes.com",
      pt: "https://queueadvisor.fernando.moretes.com",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "QueueAdvisor",
        url: "https://queueadvisor.fernando.moretes.com",
        description:
          "AWS messaging service comparison tool with real pricing data across 9 regions. Compare Amazon SQS and Apache Kafka (MSK) with AI-powered recommendations.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "Fernando Francisco Azevedo",
          url: "https://fernando.moretes.com",
          jobTitle: "AWS Solutions Architect",
          description: "AWS Solutions Architect and Cloud Enthusiast passionate about helping teams make better technology decisions.",
        },
        featureList: [
          "Compare Amazon SQS and Apache Kafka (MSK)",
          "Real AWS pricing across 9 regions",
          "AI-powered recommendations",
          "Multi-language support (EN/PT)",
          "MCP integration ready",
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "QueueAdvisor",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
        },
      },
      {
        "@type": "Person",
        name: "Fernando Francisco Azevedo",
        url: "https://fernando.moretes.com",
        image: "https://fernando.moretes.com/avatar.jpg",
        jobTitle: "AWS Solutions Architect",
        worksFor: {
          "@type": "Organization",
          name: "Independent",
        },
        sameAs: [
          "https://linkedin.com/in/fernando-francisco-azevedo",
          "https://github.com/fernandoazevedomoretes",
          "https://fernando.moretes.com",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://queueadvisor.fernando.moretes.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: "https://queueadvisor.fernando.moretes.com/docs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "FAQ",
            item: "https://queueadvisor.fernando.moretes.com/faq",
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="queueadvisor-theme">
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
