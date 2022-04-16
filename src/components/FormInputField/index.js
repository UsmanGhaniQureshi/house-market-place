const FormInputField = ({
  inputType,
  lableText,
  inputValue,
  onChangeInput,
  inputClasses,
  labelClasses,
  containerClasses,
}) => {
  return (
    <div className={containerClasses}>
      <label className={labelClasses}>{lableText}</label>
      <input
        type={inputType || "text"}
        value={inputValue}
        className={inputClasses}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default FormInputField;
