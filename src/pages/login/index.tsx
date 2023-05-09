import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Image
        src='./images/login-image.svg'
        width={200}
        height={400}
        alt='로그인 페이지 사진'
      />
      <div>서비스 이름</div>
      <div>서비스 한 줄 설명</div>
      <button>카카오 로그인</button>
      <footer>© 서비스 이름. All rights reversed.</footer>
    </div>
  );
};

export default LoginPage;
