import Image from 'next/image';
import React from 'react';
import DatePicker from 'react-datepicker';

import styles from '@/components/book/record/Calendar.module.css';

interface DatePickerComponentProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function DatePickerComponent({
  startDate,
  setStartDate,
}: DatePickerComponentProps) {
  const getMonth = (date: Date) => {
    return new Date(date).toString().substring(4, 7).toUpperCase();
  };
  const getYear = (date: Date) => {
    return new Date(date).getFullYear();
  };

  return (
    <>
      <DatePicker
        id='calendar'
        className='hidden'
        fixedHeight
        selected={startDate}
        shouldCloseOnSelect
        calendarClassName={styles.calenderWrapper}
        onChange={(date) => setStartDate(date)}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className='flex items-center justify-between px-4'>
            <div className='text-[#242424] text-xl' onClick={decreaseMonth}>
              <Image
                src='/images/record/calendar-left.svg'
                alt='left-arrow'
                width={32}
                height={32}
              />
            </div>
            <div>
              <div className='text-base text-[#242424]'>{getYear(date)}</div>
              <div className='text-xl text-[#242424]'>{getMonth(date)}</div>
            </div>
            <div className='text-[#242424] text-xl' onClick={increaseMonth}>
              <Image
                src='/images/record/calendar-right.svg'
                alt='right-arrow'
                width={32}
                height={32}
              />
            </div>
          </div>
        )}
        dayClassName={(d) =>
          d.getDate() === startDate?.getDate()
            ? styles.selectedDay
            : styles.unselectedDay
        }
      />
      <label htmlFor='calendar'>
        {startDate ? (
          <div className='w-[12rem] flex justify-end h-8 text-[14px] text-textBlack cursor-pointer font-prettyNight'>
            읽은 날짜 {startDate.toLocaleDateString('ko')}
          </div>
        ) : (
          <div className='w-[6.5rem] text-[14px] text-textBlack flex justify-center items-center h-8 border rounded-[50px] border-solid border-[#c1c1c1] cursor-pointer font-prettyNight'>
            읽은 날짜 기록
          </div>
        )}
      </label>
    </>
  );
}

export default DatePickerComponent;
