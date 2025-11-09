"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CreditsContent } from "@/components/credits-content"
import { useLocale } from "@/hooks/use-locale"

export default function CreditsPage() {
  const { locale, setLocale, isLoaded } = useLocale()

  if (!isLoaded) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <CreditsContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
