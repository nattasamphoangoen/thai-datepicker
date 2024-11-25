export interface DatePickerProps {
  /** วันที่เริ่มต้น (ถ้ามี) */
  initialDate?: Date;
  /** callback เมื่อมีการเลือกวันที่ */
  onDateSelect?: (date: Date) => void;
  /** callback เมื่อมีการล้างค่า */
  onClear?: () => void;
  /** format ของวันที่ที่แสดง */
  dateFormat?: string;
  /** placeholder สำหรับ input */
  placeholder?: string;
  /** className สำหรับ input */
  inputClassName?: string;
  /** className สำหรับ dropdown */
  dropdownClassName?: string;
  /** กำหนดจำนวนปีที่แสดงก่อนและหลังปีปัจจุบัน */
  yearRange?: number;
  /** ปรับแต่งสีต่างๆ */
  theme?: {
    primary?: string;
    secondary?: string;
    today?: string;
    selected?: string;
  };
  /** คำที่แสดงในปุ่มต่างๆ */
  labels?: {
    today?: string;
    clear?: string;
    backToToday?: string;
  };
  /** disabled state */
  disabled?: boolean;
}
