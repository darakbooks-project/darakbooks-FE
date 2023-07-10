import Image from 'next/image';

const RecommendLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background text-textBlack'>
      <Image
        src='/images/bookRecommend/recommendResultCharacter.svg'
        width={162}
        height={102}
        alt='책 추천 캐릭터'
      />
      <h2 className='w-3/4 mt-4 mb-3 font-medium text-center text-clamp2xl'>
        나에게 딱 맞는
        <br /> 책을 찾는 중이에요!
      </h2>
      <p className='w-3/4 font-normal text-center text-clampBase'>
        거의 다 됐어요! 조금만 기다려주세요
      </p>
    </div>
  );
};

export default RecommendLoading;
