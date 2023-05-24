import React, { useState } from 'react';

const DUMMY1 = Array.from({ length: 6 }, (_, idx) => `내 책장${idx}`);
const DUMMY2 = Array.from({ length: 6 }, (_, idx) => `전체 피드${idx}`);
const DUMMY3 = Array.from({ length: 6 }, (_, idx) => `마이 독서 모임${idx}`);

const ProfileContents = () => {
  const [option, setOption] = useState('books');

  return (
    <div>
      <button onClick={() => setOption('books')} className='border-basic p-2'>
        내 책장
      </button>
      <button onClick={() => setOption('feed')} className='border-basic p-2'>
        전체 피드
      </button>
      <button onClick={() => setOption('recruit')} className='border-basic p-2'>
        마이 독서 모임
      </button>
    </div>
  );
  {
    /* 프로필 정보, 글 리스트들 불러오는 건 SSR로 하기 */
  }
  {
    option === 'books' && (
      <div className='grid grid-cols-3'>
        {DUMMY1.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
    );
  }
  {
    option === 'feed' && (
      <div className='grid grid-cols-3'>
        {DUMMY2.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
    );
  }
  {
    option === 'recruit' && (
      <div className='grid grid-cols-3'>
        {DUMMY3.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
    );
  }
};

export default ProfileContents;
