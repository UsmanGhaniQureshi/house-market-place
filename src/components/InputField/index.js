import { BsThreeDots, BsEyeFill } from "react-icons/bs";

const InputField = ({
  children,
  isPassword,
  name,
  value,
  onChange,
  onClick,
  ...otherProps
}) => {
  return (
    <div className="flex rounded-full bg-white items-center w-full border-none p-2 my-3">
      <div className="flex items-center flex-1 mx-2">
        {children}
        <input
          className="px-3 py-2 w-full outline-none border-none"
          placeholder={name}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
        />
      </div>
      <div className="flex p-2">
        {isPassword && <BsEyeFill onClick={onClick} className="mx-2" />}
        <BsThreeDots />
      </div>
    </div>
  );
};

export default InputField;
