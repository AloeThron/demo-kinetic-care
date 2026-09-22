type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "split" | "center"
  inverse?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
  inverse = false,
}: SectionHeadingProps) {
  const eyebrowBadgeClass = inverse
    ? "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase backdrop-blur-sm"
    : "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase"

  const titleClass = inverse
    ? "text-3xl font-bold tracking-tight text-background leading-[1.4] md:text-5xl md:leading-[1.35]"
    : "text-3xl font-bold tracking-tight text-foreground leading-[1.4] md:text-5xl md:leading-[1.35]"

  const descriptionClass = inverse
    ? "max-w-xl text-sm leading-relaxed text-background/80 md:text-base md:leading-[1.8]"
    : "max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base md:leading-[1.8]"

  const titleContent = title.includes("\n") ? (
    <span className="flex flex-col gap-2 md:gap-3">
      {title.split("\n").map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))}
    </span>
  ) : (
    title
  )

  if (align === "center") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <div className="w-fit">
          <span className={eyebrowBadgeClass}>{eyebrow}</span>
        </div>
        <h2 className={titleClass}>{titleContent}</h2>
        {description ? <p className={descriptionClass}>{description}</p> : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between">
      <div className="flex max-w-xl flex-col items-start gap-4">
        <span className={eyebrowBadgeClass}>{eyebrow}</span>
        <h2 className={titleClass}>{titleContent}</h2>
      </div>
      {description ? <p className={descriptionClass}>{description}</p> : null}
    </div>
  )
}
