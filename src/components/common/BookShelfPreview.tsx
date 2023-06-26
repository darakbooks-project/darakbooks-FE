import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { bookshelfDataProps } from '@/types/bookshelf';

interface BookShelfPreviewProps {
  nickname: string;
  imageSrcArr: bookshelfDataProps[];
  memberId: string;
}

const BookShelfPreview = ({
  nickname,
  imageSrcArr,
  memberId,
}: BookShelfPreviewProps) => {
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

  return (
    <div
      onClick={() => moveProfile(memberId)}
      className='w-[100%] h-[11.688rem] bg-[#FFFEF8] shadow-around rounded-t-md cursor-pointer xxs:h-[10rem]'
      style={{
        perspective: '300px',
        transform: 'translate3d(0,0,0)',
      }}
    >
      <div className='flex'>
        <div className='flex flex-col w-[100%]'>
          <p className='text-xs ml-[calc((50%-(5.491rem/2)-5.491rem)/2)] relative top-3 xxs:ml-[calc((50%-5.491rem)/2-0.5rem)]'>
            {nickname}의 서재
          </p>
          <div className='flex justify-evenly items-center w-[100%] relative top-6 xs:p-1'>
            {imageSrcArr.map(({ bookIsbn, thumbnail }) => {
              return (
                <div key={bookIsbn} className='z-10 drop-shadow-lg'>
                  <Image
                    src={thumbnail}
                    width={87}
                    height={130}
                    placeholder='blur'
                    blurDataURL={thumbnail}
                    alt='추천 책장 책 표지'
                    className='rounded-r max-w-[6.063rem] max-h-[8.125rem] xxs:w-[4.625rem] xxs:px-1 '
                  />
                </div>
              );
            })}
          </div>
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
  );
};

export default BookShelfPreview;
