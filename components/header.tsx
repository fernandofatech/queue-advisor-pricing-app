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
    { href: "/credits", label: t.nav.credits },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card/80 border-b border-border/50 py-3 md:py-4 sticky top-0 z-50 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border border-brand-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageThemeSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center justify-center gap-1 mt-3 pt-3 border-t border-border/50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex-1 text-center",
                pathname === item.href
                  ? "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border border-brand-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
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
