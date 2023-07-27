import Button from '../Button';
import ModalWrapper from './Wrapper';

interface ModalProps {
  text: string;
  isOpen: boolean;
}

interface ConfirmModalProps extends ModalProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  text,
  onClickCancel,
  onClickConfirm,
}: ConfirmModalProps) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className='absolute flex flex-col items-center w-[66%] max-w-lg gap-8 p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg top-1/2 left-1/2 rounded-2xl'>
        <div className='text-sm text-center whitespace-pre-line'>{text}</div>
        <div className='flex gap-4'>
          <Button size='small' color='blue' onButtonClick={onClickConfirm}>
            예
          </Button>
          <Button size='small' color='gray' onButtonClick={onClickCancel}>
            아니오
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
