"use client";

import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

let daysOfWeek: string[] = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

daysOfWeek = daysOfWeek.reverse();

interface SelectedDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<moment.Moment>(
    moment().locale("fa").startOf("day")
  );
  const [daysInMonth, setDaysInMonth] = useState<(number | null)[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    day: currentDate.jDate(),
    month: currentDate.jMonth() + 1,
    year: currentDate.jYear(),
  });

  useEffect(() => {
    const year = currentDate.jYear();
    const month = currentDate.jMonth();

    const firstDayOfMonth = moment(currentDate).jDate(1);
    const lastDayOfMonth = moment(currentDate).endOf("jMonth");

    const daysArray: (number | null)[] = [];

    let startDay = firstDayOfMonth.day();

    for (let i = -1; i < startDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.jDate(); i++) {
      daysArray.push(i);
    }

    setDaysInMonth(daysArray);
  }, [currentDate]);

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "jMonth"));
    setSelectedDate({
      day: null,
      month: null,
      year: null,
    });
  };

  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "jMonth"));
    setSelectedDate({
      day: null,
      month: null,
      year: null,
    });
  };

  const handleDayClick = (day: number | null) => {
    if (day) {
      setSelectedDate({
        day,
        month: currentDate.jMonth() + 1,
        year: currentDate.jYear(),
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full h-[450px] max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center w-full mb-3 mt-0">
        <button
          onClick={nextMonth}
          className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaArrowLeft size={20} className="text-blue-500" />
        </button>
        <h2 className="text-[23px] ">
          {currentDate.format("jYYYY")} {currentDate.format("jMMMM")}
        </h2>
        <button
          onClick={prevMonth}
          className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaArrowRight size={20} className="text-blue-500" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full text-md text-right">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="py-2 text-center font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 text-sm gap-[7px] w-full"
        style={{ direction: "rtl" }}
      >
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-10 w-10 mx-auto text-center rounded-full border border-gray-300 cursor-pointer transition-colors ${
              day === selectedDate.day &&
              currentDate.jMonth() + 1 === selectedDate.month &&
              currentDate.jYear() === selectedDate.year
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-green-100"
            }`}
            onClick={() => handleDayClick(day)}
          >
            <span className="ltr">
              {day ? day.toLocaleString("fa-IR") : ""}
            </span>
          </div>
        ))}
      </div>
      <div className="fixed top-[550px]">
        <p>
          {selectedDate.day
            ? moment()
                .jYear(selectedDate.year!)
                .jMonth(selectedDate.month! - 1)
                .jDate(selectedDate.day!)
                .format("jYYYY/jMM/jDD")
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Calendar;
