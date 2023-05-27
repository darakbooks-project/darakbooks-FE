import { UseMutationResult } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { MAX_FILE_SIZE } from '@/constants/file';

interface postImageProps {
  name: string;
  url: string;
}

interface registerImageReturn {
  img_name: string;
  img_url: string;
}

const useImage = (
  initialState: postImageProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mutation: UseMutationResult<registerImageReturn, unknown, FormData, unknown>,
) => {
  const [image, setImage] = useState<postImageProps>(initialState);
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
        formData.append('file', files[0]);
        mutation.mutate(formData, {
          onSuccess: (data) => {
            const newImage = {
              name: data.img_name,
              url: data.img_url,
            };
            setImage(newImage);
          },
        });
      }
    },
    [mutation],
  );

  return [image, onChange] as const;
};

export default useImage;
