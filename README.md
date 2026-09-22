# Clinic Website POC

เว็บไซต์สาธิต Kinetic Care เป็นแอป Vite + React + TypeScript มี 3 หน้า:

- `/` — เว็บไซต์คลินิกสมมติ Kinetic Care
- `/portfolio` — Benchmark-to-Concept case study
- `/proposal` — ข้อเสนอ scope, package และราคา

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` สร้างไฟล์พร้อมโฮสต์ไว้ที่ `dist/`

## Important Boundaries

- แบรนด์ Kinetic Care เป็นแบรนด์สมมติ
- แบบฟอร์มตรวจเฉพาะฝั่งเบราว์เซอร์ แล้วแสดงสถานะสำเร็จในหน้า ไม่ส่งหรือบันทึกข้อมูล
- ไม่มีรีวิวหรือผลลัพธ์ผู้ป่วยที่สร้างขึ้นเอง
- เว็บไซต์อ้างอิงทั้ง 3 แห่งใช้เพื่อ benchmark เท่านั้น
- ราคาใน proposal เป็นกรอบตั้งต้นก่อน discovery

## Image Asset

ไฟล์: `public/clinic-hero.png`

สร้างด้วย built-in image generation tool โดยใช้ prompt:

> Photorealistic wide editorial photograph for a premium physical therapy clinic landing page. A calm Thai woman physical therapist in a deep-navy polo assesses shoulder range of motion for a seated Thai man in a light gray athletic shirt on a navy treatment table. Bright contemporary clinic, large windows and soft daylight on the left, navy accent wall and aqua exercise ball on the right. No text, logo, watermark, medical claims, needles or surgery.

ภาพนี้เป็น concept asset ไม่ใช่ภาพบุคลากรหรือสถานที่จริง
