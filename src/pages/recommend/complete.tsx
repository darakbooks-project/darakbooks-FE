import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getBookDataByTitle } from '@/api/book';
import { postBookshelfApi } from '@/api/bookshelf';
import Header from '@/components/common/Header';
import Toast from '@/components/common/Toast/Toast';
import { isAuthorizedSelector } from '@/recoil/auth';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';
import { RecommendBookResult } from '@/recoil/recommend';

const RecommendCompletePage = () => {
  const { title: bookTitle, reason } = useRecoilValue(RecommendBookResult);
  const router = useRouter();
  const { mutate: postMyBookshelf } = useMutation(postBookshelfApi);
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const setIsRendedOnboarding = useSetRecoilState(isRendedOnboardingAtom);
  const {
    data: recommendBookData,
    isError,
    isLoading,
  } = useQuery(['recommendBookData'], () => getBookDataByTitle(bookTitle), {
    enabled: !!bookTitle,
    cacheTime: 0,
  });

  if (isError || !bookTitle || !recommendBookData?.documents.length)
    return (
      <div className='flex flex-col items-center justify-center h-full bg-background text-textBlack'>
        <h3 className='font-medium text-clamp2xl'>책을 찾지 못했어요!</h3>
        <p>다시 시도해주세요😥</p>
        <button
          className='p-2 mt-4 text-white rounded bg-main'
          onClick={() => router.push('/recommend/userinput')}
        >
          돌아가기
        </button>
      </div>
    );
  if (isLoading) return <></>;

  const { authors, isbn, thumbnail, title } = recommendBookData.documents[0];

  const handleAddMyBookShelf = () => {
    const bookData = {
      title,
      bookIsbn: isbn.split(' ')[0],
      thumbnail,
      authors,
    };
    postMyBookshelf(bookData, {
      onSuccess: () => {
        Toast.show({ message: '책 담기에 성공했어요!', type: 'success' });
        router.push('/profile');
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          Toast.show({
            message: '이미 책장에 저장된 책이에요.',
            type: 'warning',
          });
        }
      },
    });
  };

  const handleMoveBookDetailPage = () => {
    router.push(`/book/detail?isbn=${isbn.split(' ')[0]}`);
  };

  const handleMoveMain = () => {
    router.push('/');
    setIsRendedOnboarding(true);
  };

  const changeBookButton = (isAuthorized: boolean): React.ReactNode => {
    const loginUserButton = (
      <div className='flex justify-center'>
        <button
          onClick={handleAddMyBookShelf}
          className='flex items-center justify-center w-2/5 mr-3 font-medium bg-white border-2 rounded-lg h-14 border-main shadow-round text-main'
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
          className='w-3/5 font-medium text-white rounded-lg h-14 bg-main shadow-round'
        >
          책 상세보기
        </button>
      </div>
    );

    const guestButton = (
      <button
        onClick={handleMoveMain}
        className='w-full font-medium text-white rounded-lg h-14 bg-main shadow-round'
      >
        책방 들어가기
      </button>
    );

    return isAuthorized ? loginUserButton : guestButton;
  };

  return (
    <div className='h-full bg-[url(/images/bookRecommend/background3.svg)] bg-no-repeat bg-cover bg-center'>
      <Header />
      <div className='flex items-center justify-center h-[26.375rem]'>
        <Image
          src={thumbnail}
          width={187}
          height={284}
          placeholder='blur'
          blurDataURL={thumbnail}
          alt='추천 책 표지'
          className='max-w-[11.6875rem] h-full max-h-[17.75rem] w-full rounded-r-md xs:px-1 drop-shadow-around xxs:w-[160px] xxs:h-[15rem]'
        />
      </div>
      <div className='absolute bottom-0 top-[30.125rem] w-ful shadow-roundY rounded-t-[1.875rem] max-w-xl '>
        <div className='flex flex-col items-center pt-8 bg-white rounded-t-[1.875rem] px-11 pb-14'>
          <h2 className='pb-1 font-bold text-clamp2xl text-main'>{title}</h2>
          <h3 className='text-textGray text-clampBase'>{authors}</h3>
          <div className='h-1 my-6 w-7 bg-main ' />
          <p>{reason}</p>
        </div>
        <div className='w-full px-5 pb-10 bg-white'>
          {changeBookButton(isAuthorized)}
        </div>
      </div>
    </div>
  );
};

export default RecommendCompletePage;
