import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { getRecommendBookShelf } from '@/api/bookshelf';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
const Image = dynamic(() => import('next/image'));

const BookShelfPreview = () => {
  const {
    data: currentBookshelfData,
    isLoading: isBookshelfLoading,
    isError: isBookshelfError,
  } = useQuery(
    ['customRecommendBookshelf'],
    () => getRecommendBookShelf(isAuthorized),
    {
      select: (data) => {
        return {
          userId: data.users.userId,
          nickname: data.users.nickname,
          bookshelves: data.bookshelves,
        };
      },
    },
  );
  const { openAuthRequiredModal } = useAuth();
  const router = useRouter();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const moveProfile = (memberId: string) => {
    if (!isAuthorized) return openAuthRequiredModal();
    router.push({
      pathname: '/profile',
      query: {
        ownerId: memberId,
      },
    });
  };

  if (isBookshelfError || !currentBookshelfData?.userId)
    return (
      <BookshelfContainer>
        <BookshelfCommend>추천 책장을 찾지 못했어요.</BookshelfCommend>
      </BookshelfContainer>
    );

  return (
    <BookshelfContainer>
      {isBookshelfLoading ? (
        <BookshelfCommend>추천 책장을 찾고 있어요!</BookshelfCommend>
      ) : (
        <div
          onClick={() => moveProfile(currentBookshelfData.userId)}
          style={{
            perspective: '300px',
            transform: 'translate3d(0,0,0)',
          }}
        >
          <div className='flex flex-col w-[100%]'>
            <p className='text-xs font-medium ml-[calc((50%-(5.491rem/2)-5.491rem)/2)] relative top-3 xxs:ml-[calc((50%-5.491rem)/2-0.5rem)]'>
              {currentBookshelfData.nickname}의 서재
            </p>
            <div className='flex justify-evenly items-center w-[100%] relative top-6 xs:p-1'>
              {currentBookshelfData.bookshelves.map(
                ({ bookIsbn, thumbnail }) => {
                  return (
                    <div key={bookIsbn} className='z-10 drop-shadow-lg'>
                      <Image
                        src={thumbnail}
                        width={87}
                        height={130}
                        alt='추천 책장 책 표지'
                        className='rounded-r max-w-[6.063rem] max-h-[8.125rem] xxs:w-[4.625rem] xxs:px-1 '
                      />
                    </div>
                  );
                },
              )}
            </div>
          </div>
          <div
            className='bg-[#E2D6CA] w-[99%] h-3.5 relative top-4 mx-auto'
            style={{
              transform: 'rotateX(40deg)',
            }}
          ></div>
          <div className='w-[100%] h-2.5 bg-white relative top-4'></div>
        </div>
      )}
    </BookshelfContainer>
  );
};

export default BookShelfPreview;

const BookshelfContainer = tw.div`
w-[100%] 
h-[11.6875rem] 
bg-background 
drop-shadow-md 
rounded-t-md 
cursor-pointer 
xxs:h-[10rem]
`;

const BookshelfCommend = tw.p`
flex 
items-center 
justify-center
h-full
`;
