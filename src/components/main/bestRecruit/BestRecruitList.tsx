import { BestGroupListType } from '@/types/recruit';

import BestRecruitListItem from './BestRecruitListItem';

const BestRecruitList = ({
  BestGroupList,
}: {
  BestGroupList: BestGroupListType[];
}) => {
  return (
    <section className='bg-white border border-solid border-[#DFDFDF] rounded-md mx-5 mt-14'>
      <h2 className='mx-5 font-bold my-7 text-clampLg'>
        지금 가장 인기있는 모임
      </h2>
      <ul>
        {BestGroupList.length ? (
          BestGroupList.map((group, i) => (
            <BestRecruitListItem
              key={group.group_group_id}
              {...group}
              index={i}
            />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center m-6 text-center'>
            <h4 className='font-medium text-clampBase'>
              생성된 모임이 없어요.
            </h4>
            <p className=' text-clampSm text-textGray pt-1'>
              지금 독서 모임을 생성해보세요!
            </p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default BestRecruitList;
