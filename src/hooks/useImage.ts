import { UseMutationResult } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

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
      if (!files || !files[0]) {
        return;
      }
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
          alert(error);
        },
      });
    },
    [mutation],
  );

  return [image, onChange] as const;
};

export default useImage;
