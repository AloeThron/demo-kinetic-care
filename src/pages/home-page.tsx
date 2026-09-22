import type { Variants } from "framer-motion"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CheckIcon,
  ClipboardList,
  Dumbbell,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
} from "lucide-react"
import { useState } from "react"

import { ConsultForm } from "@/components/consult-form"
import { AppButton } from "@/components/layout/app-link"
import { SectionHeading } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  faqs,
  processSteps,
  services,
  symptoms,
  trustPoints,
  trustRow,
} from "@/data/content"

const trustIcons = [UserCheck, ClipboardList, ShieldCheck] as const
const serviceIcons = [Activity, HeartPulse, Dumbbell, BookOpen] as const

function SymptomExplorer() {
  const reduce = useReducedMotion()
  const [value, setValue] = useState<(typeof symptoms)[number]["id"]>("neck")
  const current = symptoms.find((item) => item.id === value) ?? symptoms[0]

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onValueChange={(next) => {
        const match = symptoms.find((item) => item.id === next)
        if (match) setValue(match.id)
      }}
      className="items-stretch gap-6 min-[900px]:grid min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <TabsList variant="line" className="h-auto w-full flex-col gap-3 p-0 bg-transparent">
        {symptoms.map((item) => {
          const isActive = item.id === value
          return (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className={`w-full justify-between rounded-2xl border p-4.5 text-left transition-all duration-300 md:p-5 ${isActive
                ? "border-primary/40 bg-card shadow-lg shadow-primary/8 ring-2 ring-primary/20 after:hidden"
                : "border-border/70 bg-card/60 text-muted-foreground hover:border-primary/30 hover:bg-card hover:text-foreground"
                }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`grid size-9 place-items-center rounded-xl text-xs font-bold transition-colors ${isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {item.step}
                </span>
                <span className="font-heading text-sm font-semibold sm:text-base">{item.label}</span>
              </div>
              <ArrowRight
                className={`size-4.5 transition-transform duration-300 ${isActive ? "translate-x-1 text-primary" : "text-muted-foreground/40"
                  }`}
              />
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={value} className="m-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="h-full"
          >
            <div className="flex h-full flex-col justify-between gap-7 rounded-3xl border border-border/80 bg-card p-7 shadow-xl shadow-primary/5 md:p-10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
                    <span className="size-2 rounded-full bg-accent" />
                    จุดเริ่มต้น • ขั้นตอน {current.step}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    ประเมินตามอาการของคุณ
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground leading-snug md:text-3xl md:leading-snug">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {current.summary}
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                    สิ่งที่จะเน้นดูแล
                  </p>
                  <ul className="mt-3 flex flex-col gap-3">
                    {current.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3.5 rounded-2xl border border-border/50 bg-muted/40 p-4 text-sm sm:text-base text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5 mt-2">
                <span className="text-sm text-muted-foreground">
                  พร้อมคุยแผนการดูแลกับนักกายภาพบำบัด
                </span>
                <AppButton
                  href="/#consult"
                  size="default"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                >
                  ปรึกษาอาการนี้
                </AppButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  )
}

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20">
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 -left-16 size-96 rounded-full bg-accent/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 size-[26rem] rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-secondary/60 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-8 min-[900px]:grid-cols-[0.95fr_1.05fr] min-[900px]:py-16">
        <motion.div
          className="flex flex-col gap-6"
          variants={heroStagger}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.div variants={heroItem}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span>ตัวอย่างเส้นทางการปรึกษาและประเมินอาการ</span>
            </div>
          </motion.div>
          <motion.h1
            variants={heroItem}
            className="flex flex-col gap-3 text-4xl font-extrabold tracking-tight text-foreground leading-[1.38] md:text-5xl md:leading-[1.32] lg:text-[3.4rem] lg:leading-[1.3]"
          >
            <span>กลับไปใช้ชีวิตที่คุณรัก</span>
            <span className="min-[900px]:whitespace-nowrap">
              <span className="inline-block">ด้วยแผนดูแลที่</span>{" "}
              <span className="text-gradient inline-block">เข้าใจคุณ</span>
            </span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.75]"
          >
            เริ่มต้นจากอาการ เห็นขั้นตอนชัดเจน และเลือกช่องทางติดต่อได้ โดยไม่ต้องรู้ศัพท์ทางการแพทย์ก่อน
          </motion.p>
          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4 pt-2">
            <AppButton
              href="/#symptoms"
              size="lg"
              className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
            >
              วิเคราะห์อาการ
            </AppButton>
            <AppButton
              href="/#consult"
              variant="outline"
              size="lg"
              className="rounded-full border-border/80 bg-card/80 px-7 py-3.5 text-base font-semibold shadow-md transition-all duration-300 hover:bg-muted hover:-translate-y-0.5"
            >
              นัดประเมินเบื้องต้น
            </AppButton>
          </motion.div>
          <motion.ul
            variants={heroItem}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-3 text-xs sm:text-sm font-medium text-muted-foreground"
          >
            {trustRow.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          className="relative order-first min-[900px]:order-none"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-primary/30 via-accent/20 to-border/40 shadow-2xl shadow-primary/15">
            <img
              src="/clinic-hero.png"
              alt="นักกายภาพบำบัดกำลังประเมินช่วงการเคลื่อนไหวหัวไหล่ของผู้รับบริการ"
              className="aspect-[16/10] w-full rounded-[1.4rem] object-cover ring-1 ring-foreground/5"
            />
          </div>

          <motion.div
            className="absolute -top-4 -left-3 max-w-[230px] sm:max-w-[260px] min-[900px]:-top-16 min-[900px]:-left-10"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="glass rounded-2xl border border-border/80 p-4 sm:p-5 shadow-xl shadow-primary/10 backdrop-blur-xl">
              <div className="flex items-center gap-3.5">
                <span className="grid size-11 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Star className="size-5 fill-accent text-accent" />
                </span>
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-foreground">
                    ข้อมูลชัดเจนก่อนตัดสินใจ
                  </span>
                  <span className="text-[0.68rem] text-muted-foreground">
                    เริ่มจากอาการ ไม่เริ่มจากเครื่องมือ
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 right-2 w-[380px] max-w-[calc(100vw-1rem)] min-[900px]:-bottom-[3.25rem] min-[900px]:-right-8"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }
          >
            <div className="glass overflow-visible rounded-2xl border border-border/80 p-5 shadow-xl shadow-primary/10 backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Sparkles className="size-5" />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-heading text-xs font-bold text-foreground">
                    เห็นขั้นตอนชัดเจน
                  </span>
                  <p className="min-w-0 whitespace-normal break-words text-xs leading-snug text-muted-foreground">
                    อาการ → แนวทางดูแล → ปรึกษา → นัดหมาย
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <section
        id="symptoms"
        className="scroll-mt-24 bg-gradient-to-b from-muted/50 to-background py-16 md:py-24"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            eyebrow="เริ่มต้นจากอาการ"
            title={"ไม่รู้ชื่อบริการ\nก็เริ่มต้นได้"}
            description="ช่วยลดภาระจากเมนูบริการจำนวนมาก โดยพาผู้ใช้เริ่มจากสิ่งที่รู้ดีที่สุด—อาการของตัวเอง—ไปยังข้อมูลที่ควรถามต่อ"
          />
          <SymptomExplorer />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            align="center"
            eyebrow="ความไว้วางใจก่อนการดูแล"
            title={"มั่นใจก่อน\nตัดสินใจจอง"}
            description="เว็บไซต์คลินิกควรตอบคำถามสำคัญก่อนขอข้อมูลติดต่อ และไม่ใช้คำรับรองผลแทนการประเมิน"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {trustPoints.map((item, index) => {
              const Icon = trustIcons[index % trustIcons.length]
              return (
                <Reveal key={item.number} className="h-full" delay={index * 0.08}>
                  <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 md:p-8 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-6" />
                        </span>
                        <span className="font-heading text-2xl font-bold text-muted-foreground/30 group-hover:text-primary/40">
                          {item.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 bg-gradient-to-b from-muted/50 to-background py-16 md:py-24"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            eyebrow="จัดบริการให้เข้าใจง่าย"
            title={"เลือกบริการตาม\nสิ่งที่คุณต้องการ"}
            description="แต่ละหน้าเชื่อมอาการ วิธีประเมิน ผู้ดูแล ขั้นตอน และปุ่มชวนติดต่ออย่างต่อเนื่อง เพื่อไม่ให้ผู้ใช้หลุดจากเส้นทาง"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((item, index) => {
              const Icon = serviceIcons[index % serviceIcons.length]
              return (
                <Reveal key={item.title} className="h-full" delay={index * 0.08}>
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-8 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/20 text-primary shadow-sm ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-6" />
                        </span>
                        <span className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-bold tracking-wider text-secondary-foreground uppercase">
                          {item.label}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-4 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>ดูแนวทางการดูแลต่อเนื่อง</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="section-glow relative scroll-mt-24 overflow-hidden bg-foreground py-16 text-background md:py-24"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <SectionHeading
            inverse
            eyebrow="ขั้นตอนถัดไปที่ชัดเจน"
            title={"รู้ว่าจะเกิดอะไรขึ้น\nก่อนตัดสินใจ"}
            description="ขั้นตอนที่สั้นและชัดเจน พร้อมใช้คำชุดเดียวกันทุกหน้า ช่วยลดความกังวลก่อนติดต่อ"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <article
                key={step.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">
                      {step.label}
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
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-background/80">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consult" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/40 via-accent/30 to-border/50 p-px shadow-2xl shadow-primary/10">
            <div className="rounded-[calc(var(--radius-3xl)-1px)] bg-card p-7 md:p-12 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-14">
              <div className="flex flex-col gap-6 pb-6 min-[900px]:pb-0">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                  เริ่มต้นการปรึกษา
                </span>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground leading-[1.3] md:text-4xl md:leading-[1.28]">
                  <span className="inline-block">เริ่มจากข้อมูล</span>{" "}
                  <span className="inline-block">เท่าที่คุณมี</span>
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  แบบฟอร์มตัวอย่างเก็บเฉพาะข้อมูลที่ช่วยให้ทีมตอบกลับได้ตรงประเด็น
                  หากพัฒนาจริง เว็บไซต์สามารถเชื่อม LINE Official Account, ระบบ CRM หรือระบบนัดหมายเดิมของคลินิกได้
                </p>
                <div className="mt-3 flex flex-col gap-2.5 rounded-2xl border border-border/60 bg-muted/40 p-5">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                    <ShieldCheck className="size-4.5 text-primary" />
                    <span>ความปลอดภัยและความเป็นส่วนตัว</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    ไม่เปิดเผยข้อมูลสุขภาพต่อสาธารณะ พร้อมคัดกรองและส่งต่อให้ทีมนักกายภาพบำบัดโดยตรง
                  </p>
                </div>
              </div>
              <div>
                <ConsultForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 bg-gradient-to-b from-muted/50 to-background py-16 md:py-24"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title={"ตอบคำถามสำคัญ\nก่อนตัดสินใจจอง"}
            description="คลายข้อกังวลที่พบบ่อย เพื่อให้คุณตัดสินใจปรึกษาได้อย่างมั่นใจ"
          />
          <Accordion className="flex flex-col gap-3.5">
            {faqs.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-2xl border border-border/80 bg-card px-6 py-2 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground leading-snug hover:no-underline hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
