interface ToggleProps {
  name: string;
  disabled: true;
  onChange(): void;
}

const Toggle = ({ name, disabled, onChange }) => {
  return (
    <>
      <label className='inline-block cursor-pointer select-none'>
        <input type='checkbox' name={name} disabled={disabled} />
        <div className='w-[64px] h-[30px] p-[2px] rounded-[15px] box-border	bg-gray-300 ease-out duration-200' />
      </label>
      <style jsx>
        {`
          div::after {
            content: '';
            position: relative;
            left: 0;
            display: block;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: white;
            transition: left 0.2s ease-out;
          }

          input {
            display: none;

            &:checked + div {
              background: blue;
            }

            &:checked + div:after {
              left: calc(100% - 26px);
            }

            &:disabled + div {
              opacity: 0.7;
              cursor: not-allowed;

              &:after {
                opacity: 0.7;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Toggle;
