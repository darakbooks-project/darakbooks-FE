import { useCallback, useState } from 'react';

import { MAX_FILE_SIZE } from '@/constants/file';

interface postImageProps {
  id: string;
  url: string;
}

const useImage = (
  initialState: postImageProps,
  type: 'IMAGE' | 'PROFILE', // 다른 곳에 쓰일 곳이 있다면 type 지정해서 사용
  // api: () => void, api 통신 시 사용할 함수
) => {
  const [image, setImage] = useState<postImageProps>();
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      const formData = new FormData();
      const limit = MAX_FILE_SIZE / (1204 * 1204);

      if (!files) {
        return;
      }
      if (files[0].size > MAX_FILE_SIZE) {
        alert(`업로드 가능한 최대 용량은 ${limit}MB 입니다.`);
        return;
      } else {
        formData.append(type, files[0]);
        {
          /*
           1. react-query mutate를 이용 post
           2. 성공 시 이미지 id와 url return 받기
           3. url로 이미지 미리보기 구현
    
           파일보내기api.mutate(formData, {
            onSuccess: (data) => {
              const newImage = {
                id:data.id;
                url:data.url
              }
              setImage(newImage)
            }
           })
           */
        }
      }
      console.log(formData.get(type));
    },
    [type],
  );

  return [image, onChange] as const;
};

export default useImage;
