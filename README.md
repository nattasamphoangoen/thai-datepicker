#### thai-datepicker

##### วิธีใช้งาน

```bash
import { ThaiDatePicker } from 'thai-datepicker';

function App() {
  return (
    <ThaiDatePicker
      onDateSelect={(date) => console.log('Selected date:', date)}
      theme={{
        primary: 'blue',
        secondary: 'gray',
        today: 'green',
        selected: 'red'
      }}
      yearRange={50}
      placeholder="เลือกวันที่"
    />
  );
}
```

##### การปรับปรุงที่สำคัญ:

```bash
-- 1. เพิ่ม TypeScript interface สำหรับ props ทั้งหมด
-- 2. รองรับการปรับแต่ง:
--- สีธีม
--- ข้อความต่างๆ
--- รูปแบบวันที่
--- การจัดการ event ต่างๆ

-- 3. เพิ่ม disabled state
-- 4. รองรับการกำหนด className เพิ่มเติม
-- 5.แยกไฟล์เป็นโครงสร้างที่เหมาะสมสำหรับ library
```

##### ขั้นตอนการทำเป็น library:

###### 1. สร้าง project ใหม่:

```bash
mkdir thai-datepicker
cd thai-datepicker
npm init -y
```

###### 2. ติดตั้ง dependencies ที่จำเป็น:

```bash
npm install react react-dom typescript @types/react
```

###### 3. ตั้งค่า tsconfig.json และ package.json สำหรับ library

###### 4. สร้างโครงสร้างไฟล์:

```bash
thai-datepicker/
├── src/
│   ├── ThaiDatePicker.tsx
│   ├── types.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

###### 5. Build และ publish:

```bash
npm run build
npm publish
```
