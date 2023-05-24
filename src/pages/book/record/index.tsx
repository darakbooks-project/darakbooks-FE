import { useRouter } from 'next/router';
import React, { useState } from 'react';

import RecordForm from '@/components/book/record/RecordForm';
import RecordHeader from '@/components/book/record/RecordHeader';

const BookRecordPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const {
    query: { bid },
  } = useRouter();

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <RecordHeader
        bid={bid}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <RecordForm startDate={startDate} />
    </div>
  );
};

export default BookRecordPage;
