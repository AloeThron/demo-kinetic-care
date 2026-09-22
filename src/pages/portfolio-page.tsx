import { ExternalLink } from "lucide-react"

import { AppButton } from "@/components/layout/app-link"
import { SectionHeading } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  benchmarks,
  colorTokens,
  deliverables,
  portfolioMeta,
  principles,
} from "@/data/content"

const principleStyles = {
  navy: "border border-white/10 bg-foreground text-background shadow-xl",
  primary: "border border-primary/20 bg-primary text-primary-foreground shadow-xl shadow-primary/20",
  sky: "border border-border/80 bg-card text-foreground shadow-lg shadow-primary/5",
} as const

export function PortfolioPage() {
  return (
    <div className="flex flex-col">
      <section className="section-glow relative overflow-hidden bg-foreground py-16 text-background md:py-24">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase backdrop-blur-sm">
            Benchmark → Insight → Concept
          </span>
          <h1 className="flex flex-col gap-3 max-w-4xl text-4xl font-extrabold tracking-tight text-white leading-[1.38] sm:text-5xl sm:leading-[1.32] md:text-6xl md:leading-[1.28]">
            <span>เปลี่ยนข้อมูลจาก 3 เว็บไซต์</span>
            <span>
              <span className="inline-block">ให้เป็น</span>{" "}
              <span className="text-gradient-on-dark inline-block">ประสบการณ์คลินิกที่ชัดกว่า</span>
            </span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-background/80 md:text-lg md:leading-[1.75]">
            กรณีศึกษานี้ไม่ได้ออกแบบใหม่ให้เว็บไซต์อ้างอิง แต่สกัด pattern ที่ทำงานได้
            วิเคราะห์จุดอ่อนร่วม และนำมาสร้างแนวทางสำหรับเว็บไซต์คลินิกใหม่
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {portfolioMeta.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section id="benchmark" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            eyebrow="Market references"
            title={"เราเรียนรู้อะไร\nจากแต่ละเว็บไซต์"}
            description="ใช้เฉพาะข้อมูลสาธารณะที่ตรวจพบ และไม่นำชื่อ ราคา รีวิว รูป หรือข้อความของคลินิกอื่นมาเป็นข้อมูลของแบรนด์ใหม่"
          />
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl shadow-primary/5">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="py-4 font-bold text-foreground">แหล่งอ้างอิง</TableHead>
                  <TableHead className="py-4 font-bold text-foreground">จุดแข็งที่นำมาเป็น pattern</TableHead>
                  <TableHead className="py-4 font-bold text-foreground">ข้อจำกัดที่ POC ตั้งใจแก้</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarks.map((item) => (
                  <TableRow key={item.href} className="border-border/50 transition-colors hover:bg-muted/30">
                    <TableCell className="py-4 align-top font-medium">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        <span>{item.name}</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                    </TableCell>
                    <TableCell className="py-4 align-top text-sm leading-relaxed text-foreground/90">
                      {item.strength}
                    </TableCell>
                    <TableCell className="py-4 align-top text-sm leading-relaxed text-muted-foreground">
                      {item.limit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section id="strategy" className="scroll-mt-24 bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            align="center"
            eyebrow="Experience strategy"
            title={"3 เสาหลัก\nที่กำกับแนวคิด POC"}
            description="ทุกการตัดสินใจต้องช่วยให้ผู้ใช้เข้าใจ เลือก และติดต่อได้ง่ายขึ้น โดยไม่สร้างคำรับรองผลหรือข้อมูลทางการแพทย์ขึ้นเอง"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal key={item.label} className="h-full" delay={index * 0.08}>
                <div className={`flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${principleStyles[item.tone]}`}>
                  <div className="flex flex-col gap-4">
                    <span
                      className={`text-xs font-bold tracking-widest uppercase ${item.tone === "sky"
                        ? "text-primary"
                        : "text-accent"
                        }`}
                    >
                      {item.label}
                    </span>
                    <h3 className="font-heading text-xl font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${item.tone === "sky" ? "text-muted-foreground" : "opacity-85"}`}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            eyebrow="Visual system"
            title={"Clinical clarity\nwith human warmth"}
            description="ภาพลักษณ์วางอยู่ระหว่างความน่าเชื่อถือเชิงคลินิกกับความเป็นมนุษย์ ใช้ contrast ชัด ขนาดตัวอักษรอ่านง่าย และองค์ประกอบที่กดใช้งานได้บนมือถือ"
          />
          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            aria-label="ชุดสี POC"
          >
            {colorTokens.map((token) => (
              <div
                key={token.hex}
                className={`group relative flex min-h-32 flex-col justify-end gap-1 rounded-2xl p-4.5 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${token.className}`}
              >
                <span className="text-xs uppercase tracking-wider opacity-85">{token.name}</span>
                <span className="font-mono text-xs tracking-tight">{token.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="deliverables"
        className="section-glow relative scroll-mt-24 overflow-hidden bg-foreground py-16 text-background md:py-24"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            inverse
            eyebrow="What this proves"
            title={"จาก reference\nไปสู่ของที่ใช้งานได้"}
            description="POC นี้พิสูจน์ทั้งการวิเคราะห์ การจัดโครงสร้าง การออกแบบ responsive และการทำ interaction ก่อนเริ่มระบบจริง"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <article
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">
                      STEP {item.label}
                    </span>
                  </div>
                  <span
                    className="h-0.5 w-full rounded-full bg-gradient-to-r from-accent via-accent/50 to-transparent"
                    aria-hidden="true"
                  />
                  <h3 className="pt-1.5 font-heading text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-background/80">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="pt-4">
            <AppButton
              href="/proposal"
              size="lg"
              className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-xl shadow-accent/25 hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/35 hover:-translate-y-0.5"
            >
              ดูขอบเขตและข้อเสนอ
            </AppButton>
          </div>
        </div>
      </section>
    </div>
  )
}
