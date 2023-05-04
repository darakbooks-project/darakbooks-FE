const BottomNav = () => {
  return (
    <nav className='fixed left-[50%] bottom-0 translate-x-[-50%] w-full h-[4rem] bg-yellow-200 max-w-3xl flex items-centerr'>
      <div className='flex justify-around items-center w-full'>
        <div className='cursor-pointer w-14 text-center'>메인</div>
        <div className='cursor-pointer w-14 text-center'>검색</div>
        <div className='cursor-pointer w-14 text-center'>기록</div>
        <div className='cursor-pointer w-14 text-center'>추천</div>
        <div className='cursor-pointer w-14 text-center'>모집</div>
      </div>
    </nav>
  );
};

export default BottomNav;
