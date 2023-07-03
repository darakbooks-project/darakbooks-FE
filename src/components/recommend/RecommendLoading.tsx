const RecommendLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background'>
      <h2 className='w-3/4 mb-3 text-clamp2xl font-semibold text-center text-[#333333]'>
        나에게 딱 맞는 책을 찾는 중이에요!
      </h2>
      <h3 className='w-3/4 text-[#707070] text-clampBase text-center font-medium'>
        거의 다 됐어요! 조금만 기다려주세요
      </h3>
    </div>
  );
};

export default RecommendLoading;
