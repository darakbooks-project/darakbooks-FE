import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import { postBookshelfApi } from '@/api/bookshelf';
import { isAuthorizedSelector } from '@/recoil/auth';
import { selectRecommendResultModalAtom } from '@/recoil/modal';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';

interface RecommendResultType {
  authors: string[];
  isbn: string;
  thumbnail: string;
  title: string;
  reason: string;
}

const BackDrop = () => {
  const setRecommendResultModal = useSetRecoilState(
    selectRecommendResultModalAtom,
  );

  return (
    <div
      className='fixed w-full max-w-xl mx-auto h-screen z-20 bg-[rgba(0,0,0,0.6)] top-0'
      onClick={() => setRecommendResultModal(false)}
    />
  );
};

const ModalOverlay = ({
  title,
  isbn,
  thumbnail,
  authors,
  reason,
}: RecommendResultType) => {
  const setRecommendResultModal = useSetRecoilState(
    selectRecommendResultModalAtom,
  );
  const { mutate: postMyBookshelf } = useMutation(postBookshelfApi);
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const router = useRouter();
  const [flip, setFlip] = useState(false);
  const setIsRendedOnboarding = useSetRecoilState(isRendedOnboardingAtom);

  const handleAddMyBookShelf = () => {
    const bookData = {
      title,
      bookIsbn: isbn,
      thumbnail,
      authors,
    };
    postMyBookshelf(bookData, {
      onSuccess: () => {
        alert('내 책장에 책을 담았습니다.');
        router.push('/profile');
        setRecommendResultModal(false);
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          alert('이미 책장에 저장된 책입니다.');
        }
      },
    });
  };

  const handleMoveBookDetailPage = () => {
    router.push(`/book/detail?isbn=${isbn}`);
    setRecommendResultModal(false);
  };

  const handleMoveMain = () => {
    router.push('/');
    setIsRendedOnboarding(true);
    setRecommendResultModal(false);
  };

  const changeBookButton = (isAuthorized: boolean): React.ReactNode => {
    const loginUserButton = (
      <div className='flex justify-center mt-7'>
        <button
          onClick={handleAddMyBookShelf}
          className='flex items-center justify-center w-2/5 mr-3 bg-white border-2 rounded-lg h-14 border-main shadow-round text-main'
        >
          <Image
            src='/images/bookRecommend/bookshelfIcon.svg'
            width={32}
            height={32}
            alt='책장 아이콘'
          />
          담기
        </button>
        <button
          onClick={handleMoveBookDetailPage}
          className=' w-3/5 h-14 text-white rounded-lg bg-main disabled:bg-[#DFDFDF] shadow-round'
        >
          책 상세보기
        </button>
      </div>
    );

    const guestButton = (
      <button
        onClick={handleMoveMain}
        className='h-14 mt-7 w-full text-white rounded-lg bg-main disabled:bg-[#DFDFDF] shadow-round'
      >
        책방 들어가기
      </button>
    );

    return isAuthorized ? loginUserButton : guestButton;
  };

  return (
    <>
      <button
        onClick={() => setRecommendResultModal(false)}
        className='fixed inset-x-0 z-30 w-5/6 max-w-lg mx-auto top-16'
      >
        <Image
          src='/images/header/back-button-white.svg'
          width={32}
          height={32}
          alt='뒤로가기'
          className='fill-white'
        />
      </button>
      <div
        onClick={() => setRecommendResultModal(false)}
        className='w-full fixed top-[50%] z-20 inset-x-0 mx-auto h-full'
      >
        <div className='w-full h-full' style={{ perspective: '1000px' }}>
          <div
            className='w-full h-full'
            style={{
              transition: 'all .5s',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              transform: `${flip ? 'rotateY(180deg)' : ''}`,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) return;
              e.stopPropagation();
              setFlip(!flip);
            }}
          >
            <Container
              className='z-40'
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h3 className='pb-2 text-main text-clampBase'>
                카드를 눌러 뒤집어 보세요!
              </h3>
              <Image
                src={thumbnail}
                width={317}
                height={209}
                placeholder='blur'
                blurDataURL={thumbnail}
                alt='추천 책 표지'
                className='rounded-r max-w-[10.9375rem] h-full max-h-[16.625rem] w-full xs:px-1 drop-shadow-around xxs:w-[160px] xxs:h-[240px]'
              />
            </Container>
            <Container>
              <div
                className='flex flex-col items-center justify-between h-full py-4'
                style={{
                  transform: 'rotateY(180deg)',
                }}
              >
                <div>
                  <h1 className='pb-1 text-clamp2xl font-semibold text-center text-main'>
                    {title}
                  </h1>
                  <h5 className='text-[#707070] text-center'>
                    {authors.join(', ')}
                  </h5>
                </div>
                <Image
                  src='/images/bookRecommend/recommendResultCharacter.svg'
                  width={192}
                  height={120}
                  alt='책 추천 캐릭터'
                />
                <p className='overflow-auto text-clampSm'>{reason}</p>
              </div>
            </Container>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className='fixed left-0 right-0 z-30 w-5/6 max-w-lg mx-auto bottom-10 animate-slideUp'
        >
          {changeBookButton(isAuthorized)}
        </div>
      </div>
    </>
  );
};

const RecommendResultModal = ({
  bookData,
}: {
  bookData: RecommendResultType;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const element =
    typeof window !== 'undefined' && document.getElementById('portal');

  return mounted && element ? (
    <>
      {ReactDOM.createPortal(<BackDrop />, element)}
      {ReactDOM.createPortal(<ModalOverlay {...bookData} />, element)}
    </>
  ) : null;
};

export default RecommendResultModal;

const Container = tw.div`
bg-[white] 
h-2/4
min-h-[28.125rem]
border-8 
border-main
shadow-[0_2px_8px_rgba(0,0,0,0.6)] 
z-30 
p-4 
rounded-[14px] 
w-5/6 
max-w-lg 
flex 
flex-col 
justify-around 
items-center 
inset-x-0 
animate-slideUpModal 
mx-auto 
absolute
`;
