import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Send, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { contactChannels, type ContactChannel } from "@/data/content"

const consultSchema = z.object({
  name: z.string().trim().min(1, "กรุณาระบุชื่อสำหรับติดต่อ"),
  channel: z.enum(contactChannels, { error: "กรุณาเลือกช่องทางที่สะดวก" }),
  concern: z.string().trim().min(1, "กรุณาระบุอาการหรือสิ่งที่ต้องการปรึกษา"),
})

type ConsultValues = z.infer<typeof consultSchema>

const channelItems = contactChannels.map((channel) => ({
  label: channel,
  value: channel,
}))

export function ConsultForm() {
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultValues>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      name: "",
      channel: "LINE" satisfies ContactChannel,
      concern: "",
    },
  })

  function onSubmit() {
    setSubmitted(true)
  }

  useEffect(() => {
    if (!submitted) return
    successRef.current?.focus()
  }, [submitted])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="gap-6">
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="name" className="text-sm font-medium text-foreground mb-1.5">
            ชื่อสำหรับติดต่อ <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="เช่น คุณสมชาย หรือ ชื่อเล่น"
            aria-invalid={errors.name ? true : undefined}
            className="h-12 rounded-xl border-border/80 bg-background/80 px-4 py-3 text-base sm:text-sm transition-all focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Controller
          name="channel"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid ? true : undefined}>
              <FieldLabel htmlFor="channel" className="text-sm font-medium text-foreground mb-1.5">
                ช่องทางที่สะดวกรับข้อมูล <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                items={channelItems}
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value)
                }}
              >
                <SelectTrigger
                  id="channel"
                  className="h-12 w-full rounded-xl border-border/80 bg-background/80 px-4 py-3 text-base sm:text-sm transition-all focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
                  aria-invalid={fieldState.invalid ? true : undefined}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border/80 p-1.5 shadow-xl backdrop-blur-lg">
                  <SelectGroup>
                    {channelItems.map((item) => (
                      <SelectItem key={item.value} value={item.value} className="rounded-lg py-2.5 px-3">
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Field data-invalid={errors.concern ? true : undefined}>
          <FieldLabel htmlFor="concern" className="text-sm font-medium text-foreground mb-1.5">
            อาการหรือสิ่งที่ต้องการปรึกษา <span className="text-destructive">*</span>
          </FieldLabel>
          <Textarea
            id="concern"
            rows={4}
            placeholder="เล่าอาการ เช่น ปวดคอบ่าเรื้อรังมา 2 สัปดาห์ หรือข้อศอกขัดเวลาเล่นกีฬา"
            aria-invalid={errors.concern ? true : undefined}
            className="min-h-32 rounded-xl border-border/80 bg-background/80 p-4 text-base sm:text-sm leading-relaxed transition-all focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            {...register("concern")}
          />
          <FieldError errors={[errors.concern]} />
        </Field>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 w-full gap-2.5 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/95 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>ทดลองส่งข้อมูลปรึกษา</span>
          <Send className="size-4.5" />
        </Button>

        <FieldDescription className="text-center text-xs text-muted-foreground/90 pt-1">
          <Sparkles className="mr-1.5 inline-block size-3.5 text-accent" />
          ระบบ POC นี้จำลองการส่งข้อมูล ไม่มีการบันทึกข้อมูลสุขภาพจริง
        </FieldDescription>

        {submitted ? (
          <Alert
            ref={successRef}
            tabIndex={-1}
            className="rounded-2xl border-accent/40 bg-accent/10 p-5 shadow-sm animate-in fade-in-50 slide-in-from-top-2 duration-300"
          >
            <div className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckIcon className="size-4.5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <AlertTitle className="text-base font-bold text-foreground leading-snug">
                จำลองการส่งข้อมูลสำเร็จ (POC Demo)
              </AlertTitle>
              <AlertDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                ในระบบจริง ข้อมูลจะถูกจัดรูปแบบและส่งต่อไปยัง LINE Official Account หรือระบบ CRM ของคลินิกทันที
              </AlertDescription>
            </div>
          </Alert>
        ) : null}
      </FieldGroup>
    </form>
  )
}
