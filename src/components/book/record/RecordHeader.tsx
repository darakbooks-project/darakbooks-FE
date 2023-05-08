import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import DatePicker from 'react-datepicker';

interface RecordHeaderProps {
  bid: string | string[] | undefined;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}

const RecordHeader = ({ bid, startDate, setStartDate }: RecordHeaderProps) => {
  return (
    <div className='h-1/5  flex flex-row '>
      <div className='w-1/3 border-basic'>IMAGE</div>
      <div className='flex flex-col pl-5'>
        <button className='border-basic' disabled={!!bid}>
          책 선택
        </button>
        <DatePicker
          className='border-basic'
          selected={startDate}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onChange={(date) => setStartDate(date!)}
        />
      </div>
    </div>
  );
};

export default RecordHeader;
