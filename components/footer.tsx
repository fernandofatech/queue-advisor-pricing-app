import type { Locale } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslation(locale);

  const content = {
    en: {
      copyright: "© 2025 QueueAdvisor",
      builtBy: "Built by",
      mvpNotice: "Open Source MVP",
      disclaimer: "Independent project aggregating AWS information. All trademarks belong to their respective owners.",
      github: "GitHub",
      credits: "Credits",
    },
    pt: {
      copyright: "© 2025 QueueAdvisor",
      builtBy: "Criado por",
      mvpNotice: "MVP Open Source",
      disclaimer: "Projeto independente agregando informações da AWS. Todas as marcas pertencem aos seus respectivos proprietários.",
      github: "GitHub",
      credits: "Créditos",
    },
  };

  const c = content[locale];

  return (
    <footer className="border-t border-border/50 py-6 mt-12 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: MVP + Copyright */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">🚀 {c.mvpNotice}</span>
            <span className="text-muted-foreground">{c.copyright}</span>
          </div>

          {/* Center: Creator */}
          <div className="text-center">
            <span className="text-muted-foreground text-sm">
              {c.builtBy}{" "}
              <a
                href="https://fernando.moretes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-secondary transition-colors font-medium"
              >
                Fernando Azevedo
              </a>
            </span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/fernandoazevedomoretes/queue-advisor-pricing-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-primary transition-colors text-sm font-medium"
            >
              {c.github}
            </a>
            <span className="text-border">•</span>
            <a
              href="/credits"
              className="text-muted-foreground hover:text-brand-primary transition-colors text-sm font-medium"
            >
              {c.credits}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">{c.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
