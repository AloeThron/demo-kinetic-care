import { motion } from "framer-motion"
import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { AppButton, AppLink } from "@/components/layout/app-link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { PageChrome } from "@/data/content"

type SiteHeaderProps = {
  chrome: PageChrome
}

function isNavItemActive(
  href: string,
  pathname: string,
  activeSection: string
) {
  const [itemPath, hash] = href.split("#")
  const normalizedPath = itemPath || "/"

  if (hash) {
    if (pathname !== normalizedPath) return false
    return activeSection === hash
  }

  if (normalizedPath === "/") return pathname === "/"
  return pathname.startsWith(normalizedPath)
}

export function SiteHeader({ chrome }: SiteHeaderProps) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds: string[] = []
    for (const item of chrome.nav) {
      const [path, hash] = item.href.split("#")
      const itemPath = path || "/"
      if (hash && itemPath === pathname) {
        sectionIds.push(hash)
      }
    }

    if (sectionIds.length === 0) {
      setActiveSection("")
      return
    }

    const updateActiveSection = () => {
      // Check if near bottom of page
      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight
      if (docHeight - scrollBottom < 50) {
        setActiveSection(sectionIds[sectionIds.length - 1])
        return
      }

      // Check section positions relative to header
      const headerOffset = 140
      let current = ""

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= headerOffset) {
            current = id
          }
        }
      }

      // If near top of page and no section is past headerOffset
      if (!current && window.scrollY < 200) {
        const urlHash = window.location.hash.replace("#", "")
        if (urlHash && sectionIds.includes(urlHash)) {
          current = urlHash
        } else if (pathname === "/portfolio" || pathname === "/proposal") {
          current = sectionIds[0]
        }
      }

      if (current) {
        setActiveSection(current)
      }
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("hashchange", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("hashchange", updateActiveSection)
    }
  }, [chrome.nav, pathname])

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 px-4 pt-3 pb-2 md:px-6">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-5 rounded-2xl px-5 py-3 transition-all duration-300 md:px-6 ${scrolled
          ? "glass border border-border/80 shadow-lg shadow-primary/5 backdrop-blur-xl"
          : "bg-background/85 border border-border/40 backdrop-blur-md shadow-sm"
          }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-3 font-semibold transition-opacity hover:opacity-90"
        >
          <div className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
            <span>KC</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-bold tracking-tight text-foreground md:text-base">
              Kinetic Care
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase max-[620px]:hidden">
              {chrome.kicker}
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 min-[900px]:flex"
          aria-label={chrome.navLabel}
        >
          {chrome.nav.map((item) => {
            const active = isNavItemActive(item.href, pathname, activeSection)
            return (
              <AppLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium tracking-normal transition-colors duration-200 ${active
                  ? "text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId={`nav-active-${pathname}`}
                    className="absolute inset-0 rounded-full bg-primary shadow-sm shadow-primary/25"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </AppLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <AppButton
            href={chrome.cta.href}
            size="default"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 max-[620px]:hidden"
          >
            {chrome.cta.label}
          </AppButton>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="เปิดเมนู"
                  className="rounded-xl min-[900px]:hidden"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="rounded-l-2xl border-l border-border/80">
              <SheetHeader className="p-6 pb-2">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
                    KC
                  </span>
                  <SheetTitle className="text-lg font-bold">Kinetic Care</SheetTitle>
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-6 pt-3" aria-label={chrome.navLabel}>
                {chrome.nav.map((item) => {
                  const active = isNavItemActive(item.href, pathname, activeSection)
                  return (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <AppLink
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${active
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  )
                })}
              </nav>
              <div className="px-6 pt-4 pb-6">
                <SheetClose
                  nativeButton={false}
                  render={
                    <AppButton
                      href={chrome.cta.href}
                      size="lg"
                      className="w-full rounded-xl py-3 text-base font-semibold shadow-md shadow-primary/20"
                    />
                  }
                >
                  {chrome.cta.label}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
