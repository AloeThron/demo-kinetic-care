import { AppLink } from "@/components/layout/app-link"
import type { PageChrome } from "@/data/content"

type SiteFooterProps = {
  chrome: PageChrome
}

export function SiteFooter({ chrome }: SiteFooterProps) {
  return (
    <footer className="relative border-t border-border/40 bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between md:py-14">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="grid size-8.5 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-sm shadow-primary/30">
              KC
            </span>
            <span className="font-heading text-base font-semibold tracking-tight text-background">
              Kinetic Care
            </span>
          </div>
          <p className="text-sm text-background/70">{chrome.footer}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium" aria-label="ลิงก์ท้ายหน้า">
          {chrome.footerLinks.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="text-background/80 transition-colors hover:text-accent"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>
      </div>
    </footer>
  )
}
