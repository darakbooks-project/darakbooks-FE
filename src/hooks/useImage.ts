import { UseMutationResult } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import Toast from '@/components/common/Toast/Toast';
import { MAX_FILE_SIZE } from '@/constants/file';

interface postImageProps {
  name?: string;
  url?: string;
}

interface registerImageReturn {
  photoId: string;
  photoUrl: string;
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

      if (!files || !files[0]) {
        return;
      }
      if (files[0]?.size > MAX_FILE_SIZE) {
        Toast.show({
          message: `업로드 가능한 최대 용량은 ${limit}MB 입니다.`,
          type: 'error',
        });
        return;
      } else {
        formData.append('file', files[0]);
        mutation.mutate(formData, {
          onSuccess: ({ photoId, photoUrl }) => {
            const newImage = {
              name: photoId,
              url: photoUrl,
            };
            setImage(newImage);
          },
          onError: (error) => {
            console.error(error);
          },
        });
      }
    },
    [mutation],
  );

  return [image, onChange] as const;
};

export default useImage;
