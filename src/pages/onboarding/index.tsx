import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, ReactElement, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { useSetRecoilState } from 'recoil';

import PrettyNightFontLayout from '@/layout/prettyNightFontLayout';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';

const ONBOADINGDATA = [
  {
    title: '책으로 채우는 일상',
    desc: (
      <>
        오늘은 무슨 책을 읽으셨나요?
        <br /> 좋아하는 책, 인상깊은 구절을 기록해보세요
      </>
    ),
    image: '/images/onboarding/onboarding1.svg',
  },
  {
    title: '함께하는 지적 대화',
    desc: (
      <>
        누군가와 같은 책을 읽고 함께 하는 이야기, <br />
        비슷한 취향의 사람들과 함께 소통해보세요
      </>
    ),
    image: '/images/onboarding/onboarding2.svg',
  },
  {
    title: '더많은 책과 친해지기',
    desc: (
      <>
        수많은 책들 사이 나에게 딱! 맞는 책 한 권<br />
        다락책방이 차근차근 골라드릴게요
      </>
    ),
    image: '/images/onboarding/onboarding3.svg',
  },
];

const OnboardingPage = () => {
  const [lastSlide, setLastSlide] = useState(false);
  const setIsRendedOnboarding = useSetRecoilState(isRendedOnboardingAtom);
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: !lastSlide,
    dotsClass: 'dots_custom',
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_: unknown, newIndex: number) =>
      setTimeout(() => {
        setLastSlide(newIndex === 2);
      }, 350),
  };

  const handleMoveMain = () => {
    router.push('/');
    setIsRendedOnboarding(true);
  };

  const handleMoveRecommend = () => {
    router.push('/recommend/intro', '/recommend');
  };

  const handleMoveSkip = () => {
    sliderRef.current?.slickGoTo(2);
  };

  return (
    <div className='min-h-[100%] bg-background pb-4'>
      <div className='relative w-5/6 mx-auto'>
        <Slider {...settings} ref={sliderRef}>
          {ONBOADINGDATA.map((item) => (
            <Fragment key={item.title}>
              <div className='flex flex-col justify-center w-full pb-11'>
                <h2 className='mb-3 text-[1.625rem] font-medium text-main xxs:text-xl'>
                  {item.title}
                </h2>
                <p className='text-[#707070] xxs:text-sm'>{item.desc}</p>
              </div>
              <Image
                key={item.title}
                src={item.image}
                width={350}
                height={350}
                alt='온보딩 이미지'
                className='max-h-96'
              />
              {lastSlide && (
                <>
                  <button
                    onClick={handleMoveRecommend}
                    className='flex items-center justify-center w-full my-3 border-2 rounded-lg h-14 border-main text-main'
                  >
                    도서 추천 받기
                  </button>
                  <button
                    onClick={handleMoveMain}
                    className='w-full text-white border-2 rounded-lg h-14 border-main bg-main'
                  >
                    다락책방 들어가기
                  </button>
                </>
              )}
            </Fragment>
          ))}
        </Slider>
        {!lastSlide && (
          <div className='absolute right-0 flex flex-row-reverse bottom-2'>
            <button
              onClick={handleMoveSkip}
              className='pt-4 pb-0 pr-3 text-[#999797] font-prettyNight'
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <PrettyNightFontLayout>{page}</PrettyNightFontLayout>;
};

export default OnboardingPage;
