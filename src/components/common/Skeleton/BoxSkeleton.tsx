import tw from 'tailwind-styled-components';

import SkeletonBase from './Base';

interface BoxProps {
  width: string;
  height: string;
}

const BoxSkeleton = ({ width, height }: BoxProps) => {
  return (
    <SkeletonBase>
      <BoxStyles width={width} height={height} />
    </SkeletonBase>
  );
};

const BoxStyles = tw.span`
  block
  bg-gray-200
  dark:bg-gray-700
  rounded-md
  ${({ width, height }: BoxProps) => `${width} ${height}`};
`;

export default BoxSkeleton;
