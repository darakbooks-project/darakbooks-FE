import tw from 'tailwind-styled-components';

const SkeletonBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <SkeletonBaseWrap>
      <SkeletonBaseItemWrap>{children}</SkeletonBaseItemWrap>
    </SkeletonBaseWrap>
  );
};

const SkeletonBaseWrap = tw.div`
  flex 
  animate-pulse
  justify-center
`;

const SkeletonBaseItemWrap = tw.div`
  flex-shrink-0
`;

export default SkeletonBase;
