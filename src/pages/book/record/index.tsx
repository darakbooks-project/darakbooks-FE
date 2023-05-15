import { useRouter } from 'next/router';
import React, { useState } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import RecordForm from '@/components/book/record/RecordForm';
import RecordHeader from '@/components/book/record/RecordHeader';

const BookRecordPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const {
    query: { bid },
  } = useRouter();

  return (
    <AuthRequiredPage>
      <div className='h-screen p-5 border-2 border-red-500'>
        <RecordHeader
          bid={bid}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <RecordForm startDate={startDate} />
      </div>
    </AuthRequiredPage>
  );
};

export default BookRecordPage;
