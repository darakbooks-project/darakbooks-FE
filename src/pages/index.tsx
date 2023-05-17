import Slider from 'react-slick';

import BookShelfPreview from '@/components/common/BookShelfPreview';
import ImageComponent from '@/components/common/ImageComponent';

const BOOKSHELFDUMMY = [
  {
    memberId: '1',
    images: [
      'https://ifh.cc/g/2h1yGb.jpg',
      'https://ifh.cc/g/3yaCkO.jpg',
      'https://ifh.cc/g/HRw0xB.jpg',
      'https://ifh.cc/g/Mb8x6h.jpg',
    ],
  },
  {
    memberId: '2',
    images: [
      'https://ifh.cc/g/2h1yGb.jpg',
      'https://ifh.cc/g/3yaCkO.jpg',
      'https://ifh.cc/g/HRw0xB.jpg',
      'https://ifh.cc/g/Mb8x6h.jpg',
    ],
  },
  {
    memberId: '3',
    images: [
      'https://ifh.cc/g/2h1yGb.jpg',
      'https://ifh.cc/g/3yaCkO.jpg',
      'https://ifh.cc/g/HRw0xB.jpg',
      'https://ifh.cc/g/Mb8x6h.jpg',
    ],
  },
  {
    memberId: '4',
    images: [
      'https://ifh.cc/g/2h1yGb.jpg',
      'https://ifh.cc/g/3yaCkO.jpg',
      'https://ifh.cc/g/HRw0xB.jpg',
      'https://ifh.cc/g/Mb8x6h.jpg',
    ],
  },
];

const FEEDDUMMY = [
  {
    memberId: '1',
    img: 'https://ifh.cc/g/2h1yGb.jpg',
  },
  {
    memberId: '2',
    img: 'https://ifh.cc/g/3yaCkO.jpg',
  },
  {
    memberId: '3',
    img: 'https://ifh.cc/g/HRw0xB.jpg',
  },
  {
    memberId: '4',
    img: 'https://ifh.cc/g/Mb8x6h.jpg',
  },
];

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main>
      <section>
        <h1 className='text-xl m-3'>오늘의 책장</h1>
        <div className='mx-10'>
          <Slider {...settings}>
            {BOOKSHELFDUMMY.map(({ img, memberId }) => (
              <BookShelfPreview
                key={memberId}
                imageSrcArr={img}
                memberId={memberId}
              />
            ))}
          </Slider>
        </div>
      </section>
      <section className='mt-10'>
        <h1 className='text-xl m-3'>오늘의 기록</h1>
        <div className='grid grid-cols-3  gap-2 m-2'>
          {FEEDDUMMY.map(({ img, memberId }) => (
            <ImageComponent
              key={memberId}
              lazy={true}
              placeholder=''
              src={img}
              size='feed-small'
              alt='기록 피드 이미지'
              imgStyle='w-full h-full'
            />
          ))}
        </div>
      </section>
    </main>
  );
}
