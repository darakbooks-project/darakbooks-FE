import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface BookShelfPreviewProps {
  nickname: string;
  imageSrcArr: StaticImageData[];
  memberId: string;
}

const BookShelfPreview = ({
  nickname,
  imageSrcArr,
  memberId,
}: BookShelfPreviewProps) => {
  return (
    <div
      className='w-[100%] h-[11.6875rem] bg-[#FFFEF8] drop-shadow-md rounded-t-md cursor-pointer'
      style={{
        perspective: '300px',
        transform: 'translate3d(0,0,0)',
      }}
    >
      <Link href={`bookshelf?memberId=${memberId}`} className=' flex'>
        <div className='flex flex-col w-[100%]'>
          <p className='text-xs ml-[calc((50%-(87.86px/2)-87.86px)/2)] relative top-3 xxs:ml-[calc((50%-87.86px)/2)]'>
            {nickname}의 서재
          </p>
          <div className='flex justify-evenly items-center w-[100%] relative top-6'>
            {imageSrcArr.map((src: StaticImageData) => {
              return (
                <div
                  key={src.src}
                  className='xxs:last:hidden drop-shadow-lg z-10'
                >
                  <Image
                    src={src}
                    width={87}
                    height={130}
                    placeholder='blur'
                    blurDataURL={src.src}
                    alt='추천 책장 책 표지'
                    className='rounded-r'
                    style={{ width: 87, height: 130 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Link>
      <div
        className='bg-[#E2D6CA] w-[99%] h-[14px] relative top-4 mx-auto'
        style={{
          transform: 'rotateX(40deg)',
        }}
      ></div>
      <div className='w-[100%] h-[10px] bg-white relative top-[16px]'></div>
    </div>
  );
};

export default BookShelfPreview;
