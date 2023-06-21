import { atom } from 'recoil';

import { RecommendBookResultType } from '@/types/recommend';

export const RecommendBookResult = atom<RecommendBookResultType>({
  key: 'RecommendBookKey',
  default: {
    Title: '',
    Author: '',
    ISBN: '',
    Image: '',
    Intro: '',
    Reason: '',
  },
});
