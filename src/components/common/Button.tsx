interface Props {
  text: string;
  onButtonClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Button = ({ text, onButtonClick }: Props) => {
  return (
    <div className='w-32' onClick={onButtonClick}>
      <button className='w-full h-12 px-[6px] py-[8px] rounded border-0 outline-0 bg-violet-500 hover:bg-violet-600 box-border cursor-pointer ease-in duration-300'>
        {text}
      </button>
    </div>
  );
};

export default Button;
