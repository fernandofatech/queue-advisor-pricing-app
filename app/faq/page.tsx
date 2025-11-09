"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqContent } from "@/components/faq-content"
import { useLocale } from "@/hooks/use-locale"

export default function FaqPage() {
  const { locale, setLocale, isLoaded } = useLocale()

  if (!isLoaded) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <FaqContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
