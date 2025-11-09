"use client"

import { motion } from "framer-motion"
import { LanguageThemeSwitcher } from "@/components/language-theme-switcher"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const t = useTranslation(locale)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/docs", label: t.nav.docs },
    { href: "/faq", label: t.nav.faq },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-teal-dark to-teal-darker border-b border-teal-light/20 py-6 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
          </Link>
          <LanguageThemeSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        </div>

        <nav className="flex items-center justify-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-teal-light/20 text-white"
                  : "text-teal-lighter hover:bg-teal-light/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
