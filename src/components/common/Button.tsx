interface ButtonProps {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  color: 'blue' | 'gray';
  onButtonClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Button = ({ children, size, color, onButtonClick }: ButtonProps) => {
  return (
    <div className={`${buttonSize[size]}`} onClick={onButtonClick}>
      <button
        className={`${buttonColor[color]} w-full h-full px-[6px] py-[8px] rounded border-0 outline-0 box-border cursor-pointer ease-in duration-300`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

interface buttonSizeType {
  [key: string]: string;
}

interface buttonColorType {
  [key: string]: string;
}

const buttonSize: buttonSizeType = {
  small: 'w-20 h-8 text-xs',
  medium: 'w-24 h-10 text-base',
  large: 'w-32 h-12 text-lg',
};

const buttonColor: buttonColorType = {
  blue: 'bg-violet-500 hover:bg-violet-600 text-white',
  gray: 'bg-gray-300 hover:bg-gray-400 text-black',
};
