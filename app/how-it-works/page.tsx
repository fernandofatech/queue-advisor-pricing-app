"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorksContent } from "@/components/how-it-works-content"
import { useLocale } from "@/hooks/use-locale"

export default function HowItWorksPage() {
  const { locale, setLocale, isLoaded } = useLocale()

  if (!isLoaded) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <HowItWorksContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
