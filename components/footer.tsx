import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslation(locale)

  return (
    <footer className="bg-card border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
        <p>© 2025 QueueAdvisor {t.builtBy} Fernando Moretes</p>
        <p>AWS Solutions Architect | Creator of calculator.moretes.com</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://fernando.moretes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-light transition-colors"
          >
            fernando.moretes.com
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/in/fernando-francisco-azevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-light transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-xs opacity-70 pt-2">Deployed on Vercel</p>
      </div>
    </footer>
  )
}
