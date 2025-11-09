"use client"

import { motion } from "framer-motion"
import { LanguageThemeSwitcher } from "@/components/language-theme-switcher"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface HeaderProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const t = useTranslation(locale)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-teal-dark to-teal-darker border-b border-teal-light/20 py-8 relative"
    >
      <div className="container mx-auto px-4">
        <div className="absolute top-4 right-4">
          <LanguageThemeSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-teal-lighter text-lg">{t.subtitle}</p>
        </div>
      </div>
    </motion.header>
  )
}
