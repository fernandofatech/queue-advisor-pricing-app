"use client"

import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n"

const LOCALE_STORAGE_KEY = "queueadvisor-locale"

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load locale from localStorage on mount
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
    if (storedLocale && (storedLocale === "en" || storedLocale === "pt")) {
      setLocaleState(storedLocale)
    }
    setIsLoaded(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }

  return { locale, setLocale, isLoaded }
}
