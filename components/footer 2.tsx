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
      builtBy: "Built with ❤️ by",
      title: "AWS Solutions Architect & Cloud Enthusiast",
      passionate:
        "Passionate about cloud architecture, automation, and helping teams make better technology decisions.",
      mvpNotice: "MVP Project - Open Source & Community Driven",
      disclaimer:
        "This is an independent MVP that aggregates AWS information. All AWS services, MCP, and documentation are property of their respective owners. This tool combines existing resources to help with architecture decisions.",
      portfolio: "Visit Portfolio",
      github: "GitHub",
      linkedin: "LinkedIn",
      contribute: "Contribute",
      moreTools: "More tools at calculator.moretes.com",
      deployed: "Proudly deployed on AWS",
    },
    pt: {
      copyright: "© 2025 QueueAdvisor",
      builtBy: "Construído com ❤️ por",
      title: "Arquiteto de Soluções AWS & Entusiasta de Cloud",
      passionate:
        "Apaixonado por arquitetura cloud, automação e ajudar equipes a tomar melhores decisões tecnológicas.",
      mvpNotice: "Projeto MVP - Open Source & Impulsionado pela Comunidade",
      disclaimer:
        "Este é um MVP independente que agrega informações da AWS. Todos os serviços AWS, MCP e documentações são propriedade de seus respectivos donos. Esta ferramenta combina recursos existentes para ajudar nas decisões de arquitetura.",
      portfolio: "Visite o Portfólio",
      github: "GitHub",
      linkedin: "LinkedIn",
      contribute: "Contribuir",
      moreTools: "Mais ferramentas em calculator.moretes.com",
      deployed: "Orgulhosamente implantado na AWS",
    },
  };

  const c = content[locale];

  return (
    <footer className="bg-gradient-to-b from-card/30 to-card/80 border-t border-border/50 py-8 md:py-12 mt-12 md:mt-16 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Creator Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20">
            <span className="text-sm font-medium text-foreground">
              {c.builtBy}{" "}
              <a
                href="https://fernando.moretes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
              >
                Fernando Francisco Azevedo
              </a>
            </span>
          </div>
          <p className="text-sm font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {c.title}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">{c.passionate}</p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap text-xs md:text-sm mb-6">
          <a
            href="https://fernando.moretes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors font-medium flex items-center gap-1"
          >
            🌐 {c.portfolio}
          </a>
          <span className="text-border">•</span>
          <a
            href="https://github.com/fernandoazevedomoretes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors font-medium flex items-center gap-1"
          >
            💻 {c.github}
          </a>
          <span className="text-border">•</span>
          <a
            href="https://www.linkedin.com/in/fernando-francisco-azevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors font-medium flex items-center gap-1"
          >
            👔 {c.linkedin}
          </a>
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-2 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground">{c.moreTools}</p>
          <p className="text-xs opacity-60">{c.deployed}</p>
          <p className="text-xs font-medium text-foreground">{c.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
