import { AlertCircle, CheckCircle2, ChevronRight, Sparkles } from "lucide-react"

import { AppButton } from "@/components/layout/app-link"
import { SectionHeading } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  extraScope,
  includedScope,
  packages,
  proposalMeta,
  terms,
  timeline,
} from "@/data/content"

export function ProposalPage() {
  return (
    <div className="flex flex-col">
      <section className="section-glow relative overflow-hidden bg-foreground py-16 text-background md:py-24">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase backdrop-blur-sm">
            ข้อเสนอออกแบบและพัฒนาเว็บไซต์
          </span>
          <h1 className="flex flex-col gap-3 max-w-4xl text-4xl font-extrabold tracking-tight text-white leading-[1.38] sm:text-5xl sm:leading-[1.32] md:text-6xl md:leading-[1.28]">
            <span>เว็บไซต์คลินิกที่ช่วยให้คนเข้าใจ</span>
            <span>
              <span className="inline-block">เชื่อมั่น และ</span>{" "}
              <span className="text-gradient-on-dark inline-block">ตัดสินใจติดต่อ</span>
            </span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-background/80 md:text-lg md:leading-[1.75]">
            ข้อเสนอนี้นำบทเรียนจากเว็บไซต์อ้างอิงสามแห่งมาพัฒนาเป็นแนวทาง UX/UI
            ใหม่สำหรับแบรนด์ของลูกค้า โดยไม่คัดลอกหน้าตา เนื้อหา รีวิว
            หรือคำกล่าวอ้างของคลินิกอื่น
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {proposalMeta.map((item) => (
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

      <section id="scope" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            eyebrow="ขอบเขตงานที่แนะนำ"
            title={"เริ่มจากงานที่สร้าง\nผลลัพธ์ได้จริง"}
            description="แพ็กเกจกลางเป็นตัวเลือกแนะนำ เพราะช่วยต่อยอด POC ให้เป็นเว็บไซต์พร้อมใช้งาน โดยยังไม่ขยายไปถึงระบบเฉพาะทางที่ยังไม่ได้เก็บข้อมูลตั้งต้น"
          />
          <div className="grid gap-6 min-[900px]:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-between rounded-3xl border border-primary/20 bg-card p-7 shadow-xl shadow-primary/5 md:p-9">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2.5 text-primary">
                  <Sparkles className="size-5" />
                  <h3 className="font-heading text-xl font-bold text-foreground leading-snug">
                    สิ่งที่รวมในขอบเขตหลัก
                  </h3>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {includedScope.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 rounded-2xl border border-border/50 bg-muted/30 p-3.5 text-sm sm:text-base text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-md md:p-9">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <AlertCircle className="size-5" />
                  <h3 className="font-heading text-xl font-bold text-foreground leading-snug">
                    สิ่งที่ต้องประเมินเพิ่มเติม
                  </h3>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {extraScope.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 rounded-2xl border border-border/40 bg-muted/20 p-3.5 text-sm sm:text-base text-muted-foreground"
                    >
                      <ChevronRight className="mt-0.5 size-4.5 shrink-0 text-muted-foreground/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            align="center"
            eyebrow="ตัวเลือกด้านงบประมาณ"
            title={"เลือกแพ็กเกจตาม\nระดับความพร้อม"}
            description="ราคาเป็นกรอบตั้งต้นสำหรับข้อเสนอนี้ โดยต้องยืนยันจำนวนหน้า ระบบ และผู้รับผิดชอบเนื้อหาก่อนออกใบเสนอราคาสุดท้าย"
          />
          <div className="grid gap-6 lg:grid-cols-3 items-stretch">
            {packages.map((item, index) => {
              if (item.recommended) {
                return (
                  <Reveal key={item.id} className="h-full" delay={index * 0.08}>
                    <div className="relative flex h-full flex-col rounded-3xl bg-gradient-to-b from-primary via-accent to-primary p-px shadow-2xl shadow-primary/25 lg:-translate-y-2">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md shadow-primary/30">
                          <Sparkles className="size-3" />
                          ตัวเลือกแนะนำ
                        </span>
                      </div>
                      <div className="flex h-full flex-col justify-between rounded-[calc(var(--radius-3xl)-1px)] bg-card p-7 md:p-9">
                        <div className="flex flex-col gap-6">
                          <span className="text-xs font-bold tracking-wider text-primary uppercase">
                            {item.eyebrow}
                          </span>
                          <div>
                            <h3 className="font-heading text-2xl font-bold text-foreground leading-snug">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-3xl font-extrabold tracking-tight text-primary">
                              {item.price}
                            </p>
                          </div>
                          <ul className="flex flex-col gap-3 pt-2">
                            {item.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-8">
                          <AppButton
                            href="/proposal#timeline"
                            size="lg"
                            className="w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
                          >
                            {item.cta}
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              }

              return (
                <Reveal key={item.id} className="h-full" delay={index * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:p-9">
                    <div className="flex flex-col gap-6">
                      <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        {item.eyebrow}
                      </span>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                          {item.price}
                        </p>
                      </div>
                      <ul className="flex flex-col gap-3 pt-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-muted-foreground/60" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-8">
                      <AppButton
                        href="/proposal#timeline"
                        variant="outline"
                        size="lg"
                        className="w-full rounded-full border-border/80 py-3.5 text-base font-semibold hover:bg-muted hover:-translate-y-0.5"
                      >
                        {item.cta}
                      </AppButton>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Alert className="rounded-2xl border-border/80 bg-card p-5 md:p-6 shadow-sm">
            <AlertCircle className="size-4 text-primary" />
            <AlertTitle className="text-sm font-bold text-foreground">ข้อควรระวังเรื่องราคา</AlertTitle>
            <AlertDescription className="text-xs leading-relaxed text-muted-foreground">
              ราคา 29,000 บาทเหมาะกับงานวางแบบ UX/UI เท่านั้น
              ยังไม่ควรนำเสนอเป็นราคาสร้างเว็บไซต์เต็มระบบ หากยังไม่ทราบ CMS,
              ระบบที่ต้องเชื่อมต่อ จำนวนหน้า และปริมาณงานย้ายข้อมูล
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section
        id="timeline"
        className="section-glow relative scroll-mt-24 overflow-hidden bg-foreground py-16 text-background md:py-24"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            inverse
            eyebrow="ใช้เวลาประมาณ 5–7 สัปดาห์"
            title={"ทำทีละช่วง\nและอนุมัติเป็นจุด"}
            description="ทำงานเป็นช่วงและขออนุมัติเป็นระยะ เพื่อลดความเสี่ยงที่เนื้อหา ระบบ หรือผู้อนุมัติจะไม่ตรงกันในภายหลัง"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, idx) => (
              <article
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">
                      {item.label}
                    </span>
                    <span className="font-heading text-2xl font-black text-white/20 group-hover:text-accent/40">
                      0{idx + 1}
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
              href="/portfolio"
              size="lg"
              className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-xl shadow-accent/25 hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/35 hover:-translate-y-0.5"
            >
              ดูแนวคิดและหลักฐานประกอบ
            </AppButton>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-border/80 bg-card p-7 shadow-xl shadow-primary/5 md:p-12 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-14 min-[900px]:items-start">
            <div className="flex flex-col gap-5 pb-6 min-[900px]:pb-0">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                  ขั้นตอนถัดไป
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground leading-[1.3] md:text-4xl md:leading-[1.28]">
                <span className="inline-block">ยืนยัน brief</span>{" "}
                <span className="inline-block">ก่อนล็อกราคา</span>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                ขอข้อมูลชื่อแบรนด์ จำนวนสาขา เป้าหมายการติดต่อ รายการหน้า
                ระบบที่ต้องเชื่อม และผู้อนุมัติหลัก จากนั้นจึงสรุปขอบเขตงาน ระยะส่งมอบ
                และราคาสุดท้าย
              </p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-muted/30 p-7">
              <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                เงื่อนไขทำงานที่แนะนำ
              </h3>
              <ul className="flex flex-col gap-3">
                {terms.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-foreground/85">
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
