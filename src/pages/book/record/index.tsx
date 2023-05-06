import { useRouter } from 'next/router';
import React, { useState } from 'react';

import RecordForm from '@/components/book/record/RecordForm';
import RecordPreparation from '@/components/book/record/RecordPreparation';

const BookRecordPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const {
    query: { bid },
  } = useRouter();

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <RecordPreparation
        bid={bid}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <RecordForm startDate={startDate} />
    </div>
  );
};

export default BookRecordPage;
