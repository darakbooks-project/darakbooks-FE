import { atom } from 'recoil';

import { RecommendBookResultType } from '@/types/recommend';

export const RecommendBookResult = atom<RecommendBookResultType>({
  key: 'RecommendBookKey',
  default: {
    reason: '',
    title: '',
  },
});
