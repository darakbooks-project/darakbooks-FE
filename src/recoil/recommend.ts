import { atom } from 'recoil';

import { RecommendBookResultType } from '@/types/recommend';

interface RecommendBookAtomType extends RecommendBookResultType {
  userRequest: string;
}

export const RecommendBookResult = atom<RecommendBookAtomType>({
  key: 'RecommendBookKey',
  default: {
    userRequest: '',
    reason: '',
    title: '',
  },
});
