import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { pageChrome, pageKeyFromPath } from "@/data/content"

function PageTransition() {
  const location = useLocation()
  const reduce = useReducedMotion()

  if (reduce) {
    return <Outlet />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}

export function SiteLayout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const chrome = pageChrome[pageKeyFromPath(location.pathname)]

  useEffect(() => {
    document.title = chrome.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute("content", chrome.description)
  }, [chrome.description, chrome.title])

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
      return
    }

    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }, [location.hash, location.pathname, reduce])

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background shadow-lg"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <div className="border-b border-border/40 bg-muted/40 px-4 py-1.5 text-center text-xs text-muted-foreground backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            {chrome.barLabel}
          </span>
          <span className="hidden sm:inline text-foreground/80 font-normal">{chrome.barText}</span>
          <span className="sm:hidden text-foreground/80 font-normal truncate">{chrome.barText}</span>
        </div>
      </div>
      <SiteHeader chrome={chrome} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <PageTransition />
      </main>
      <SiteFooter chrome={chrome} />
    </div>
  )
}
