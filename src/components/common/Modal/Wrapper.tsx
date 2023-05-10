import { useEffect } from 'react';

interface ModalWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ModalWrapper = ({ children, isOpen }: ModalWrapperProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full min-h-screen bg-black bg-opacity-60 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
