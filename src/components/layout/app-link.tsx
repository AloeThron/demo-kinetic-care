import type { ComponentProps, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"

type SharedLinkProps = Omit<ComponentProps<typeof Link>, "to" | "children">

function splitHref(href: string) {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) {
    return { path: href, hash: "" }
  }

  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex),
  }
}

type AppLinkProps = SharedLinkProps & {
  href: string
  children?: ReactNode
}

export function AppLink({ href, className, children, ...props }: AppLinkProps) {
  const { pathname } = useLocation()
  const { path, hash } = splitHref(href)

  if (hash && pathname === path) {
    return (
      <a href={hash} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className} {...props}>
      {children}
    </Link>
  )
}

type AppButtonProps = {
  href: string
  children?: ReactNode
  variant?: ComponentProps<typeof Button>["variant"]
  size?: ComponentProps<typeof Button>["size"]
  className?: string
} & Omit<ComponentProps<typeof Button>, "variant" | "size" | "className" | "render" | "nativeButton">

export function AppButton({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: AppButtonProps) {
  const { pathname } = useLocation()
  const { path, hash } = splitHref(href)
  const shared = {
    ...props,
    variant,
    size,
    className,
    nativeButton: false as const,
  }

  if (hash && pathname === path) {
    return (
      <Button {...shared} render={<a href={hash} />}>
        {children}
      </Button>
    )
  }

  return (
    <Button {...shared} render={<Link to={href} />}>
      {children}
    </Button>
  )
}
