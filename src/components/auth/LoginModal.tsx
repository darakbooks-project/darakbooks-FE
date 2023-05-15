import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { isOpenedAuthRequiredModalAtom } from '@/recoil/atom/auth';

import ConfirmModal from '../common/Modal/Confirm';

const LoginModal = () => {
  const [isOpenedModal, setIsOpenedModal] = useRecoilState(
    isOpenedAuthRequiredModalAtom,
  );
  const router = useRouter();

  const onClickConfirm = () => {
    setIsOpenedModal(false);
    router.push('/login');
  };

  const onClickCancel = () => {
    setIsOpenedModal(false);
  };

  return (
    <ConfirmModal
      isOpen={isOpenedModal}
      onClickConfirm={onClickConfirm}
      onClickCancel={onClickCancel}
      text={`로그인이 필요한 기능입니다.\n로그인 하시겠습니까?`}
    />
  );
};

export default LoginModal;
