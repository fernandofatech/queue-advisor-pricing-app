"use client"

import { Globe, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import type { Locale } from "@/lib/i18n"

interface LanguageThemeSwitcherProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function LanguageThemeSwitcher({ locale, onLocaleChange }: LanguageThemeSwitcherProps) {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => onLocaleChange("en")} className="cursor-pointer">
            <span className={locale === "en" ? "font-semibold text-primary" : ""}>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onLocaleChange("pt")} className="cursor-pointer">
            <span className={locale === "pt" ? "font-semibold text-primary" : ""}>Português</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            <span className={theme === "light" ? "font-semibold text-primary" : ""}>
              {locale === "en" ? "Light" : "Claro"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            <span className={theme === "dark" ? "font-semibold text-primary" : ""}>
              {locale === "en" ? "Dark" : "Escuro"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
            <Monitor className="mr-2 h-4 w-4" />
            <span className={theme === "system" ? "font-semibold text-primary" : ""}>
              {locale === "en" ? "System" : "Sistema"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
