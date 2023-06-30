import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import Slider from 'react-slick';

const ONBOADINGDATA = [
  {
    title: '책으로 채우는 일상',
    desc: (
      <h3>
        오늘은 무슨 책을 읽으셨나요?
        <br /> 좋아하는 책, 인상깊은 구절을 기록해보세요
      </h3>
    ),
    image: '/images/onboarding/onboarding1.svg',
  },
  {
    title: '함께하는 지적 대화',
    desc: (
      <h3>
        누군가와 같은 책을 읽고 함께 하는 이야기, <br />
        비슷한 취향의 사람들과 함께 소통해보세요
      </h3>
    ),
    image: '/images/onboarding/onboarding2.svg',
  },
  {
    title: '더많은 책과 친해지기',
    desc: (
      <h3>
        수많은 책들 사이 나에게 딱! 맞는 책 한 권<br />
        다락책방이 차근차근 골라드릴게요
      </h3>
    ),
    image: '/images/onboarding/onboarding3.svg',
  },
];

const OnboardingPage = () => {
  const [lastSlide, setLastSlide] = useState(false);
  const router = useRouter();

  const settings = {
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
    router.push(
      {
        pathname: '/',
        query: {
          isRendedOnboarding: 'true',
        },
      },
      '/',
    );
  };

  const handleMoveRecommend = () => {
    router.push('/recommend/intro', '/recommend');
  };

  return (
    <div className='min-h-[100%] bg-background pb-4'>
      <div className='relative'>
        <Slider {...settings}>
          {ONBOADINGDATA.map((item) => (
            <Fragment key={item.title}>
              <div className='flex flex-col justify-center w-5/6 pb-11'>
                <h2 className='mb-3 text-2xl font-bold text-main xxs:text-xl'>
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
                className='w-5/6 max-h-96'
              />
              {lastSlide && (
                <>
                  <button
                    onClick={handleMoveRecommend}
                    className='flex items-center justify-center w-5/6 my-3 border-2 rounded-lg h-14 border-main text-main'
                  >
                    도서 추천 받기
                  </button>
                  <button
                    onClick={handleMoveMain}
                    className='w-5/6 text-white border-2 rounded-lg h-14 border-main bg-main'
                  >
                    다락책방 들어가기
                  </button>
                </>
              )}
            </Fragment>
          ))}
        </Slider>
        {!lastSlide && (
          <button
            onClick={handleMoveMain}
            className='absolute w-5/6 pt-4 pb-0 pr-3 text-right bottom-2 left-[10%] text-[#999797]'
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
