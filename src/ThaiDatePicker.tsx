// ThaiDatePicker.tsx
import React, { useState, useEffect, useRef } from "react";
import { DatePickerProps } from "./types";

export const ThaiDatePicker: React.FC<DatePickerProps> = ({
  initialDate,
  onDateSelect,
  onClear,
  dateFormat = "dd/MM/yyyy",
  placeholder = "วัน/เดือน/ปี",
  inputClassName = "",
  dropdownClassName = "",
  yearRange = 50,
  theme = {
    primary: "blue",
    secondary: "gray",
    today: "blue",
    selected: "red",
  },
  labels = {
    today: "วันนี้",
    clear: "ล้าง",
    backToToday: "กลับไปปีปัจจุบัน",
  },
  disabled = false,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<number>(
    initialDate?.getMonth() ?? today.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate?.getFullYear() ?? today.getFullYear()
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showDays, setShowDays] = useState<boolean>(true);
  const [showYears, setShowYears] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  // Format date using the provided format
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(formatDate(initialDate));
      setCurrentMonth(initialDate.getMonth());
      setCurrentYear(initialDate.getFullYear());
    }
  }, [initialDate]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calendar rendering logic
  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarDays: (Date | null)[] = [];

    // Add empty slots for padding
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(currentYear, currentMonth, i));
    }

    return (
      <div className="grid grid-cols-7 text-center gap-1">
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => date && handleDateSelect(date)}
            className={`cursor-pointer rounded-full p-1 ${
              date?.toDateString() === today.toDateString()
                ? `bg-${theme.today}-300 text-black`
                : date
                ? `hover:bg-${theme.primary}-200`
                : ""
            }`}
          >
            {date?.getDate()}
          </div>
        ))}
      </div>
    );
  };

  // Year selection rendering
  const renderYearSelection = () => {
    const startYear = today.getFullYear() - yearRange;
    const endYear = today.getFullYear() + yearRange;
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );

    return (
      <div className="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => {
              setCurrentYear(year);
              setShowYears(false);
              setShowDays(true);
            }}
            className={`cursor-pointer p-1 rounded-lg text-sm ${
              year === today.getFullYear()
                ? `bg-${theme.selected}-400 text-white`
                : year === currentYear
                ? `bg-${theme.primary}-200`
                : `hover:bg-${theme.primary}-200`
            }`}
          >
            {year + 543}
          </div>
        ))}
      </div>
    );
  };

  // Event handlers
  const handleDateSelect = (date: Date) => {
    setSelectedDate(formatDate(date));
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
    setShowCalendar(false);
    onDateSelect?.(date);
  };

  const handleClear = () => {
    setSelectedDate("");
    onClear?.();
    setShowCalendar(false);
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Main render
  return (
    <div className="relative inline-block">
      <input
        type="text"
        value={selectedDate}
        onClick={() => !disabled && setShowCalendar(!showCalendar)}
        readOnly
        disabled={disabled}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 cursor-pointer
          ${disabled ? "bg-gray-100" : "bg-white"}
          ${inputClassName}`}
      />

      {showCalendar && (
        <div
          ref={dropdownRef}
          className={`absolute mt-1 bg-white border rounded-md shadow-lg z-50 p-3 ${dropdownClassName}`}
        >
          {/* Calendar header */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => handleMonthChange("prev")}
              className={`text-${theme.secondary}-600 hover:text-${theme.secondary}-800 px-2`}
            >
              {"<"}
            </button>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setShowYears(!showYears)}
                className={`hover:bg-${theme.primary}-100 rounded px-2 py-1`}
              >
                {currentYear + 543}
              </button>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="border rounded px-2 py-1 mt-1"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleMonthChange("next")}
              className={`text-${theme.secondary}-600 hover:text-${theme.secondary}-800 px-2`}
            >
              {">"}
            </button>
          </div>

          {/* Calendar body */}
          {showDays ? (
            <>
              <div className="grid grid-cols-7 text-center mb-1">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              {renderCalendarDays()}
            </>
          ) : (
            renderYearSelection()
          )}

          {/* Footer buttons */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleDateSelect(new Date())}
              className={`bg-${theme.primary}-500 hover:bg-${theme.primary}-600 
                text-white px-2 py-1 rounded text-sm`}
            >
              {labels.today}
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              {labels.clear}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
