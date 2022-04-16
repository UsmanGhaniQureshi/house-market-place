const FormButton = ({ btnState, btnText, btnOnClick }) => {
  return (
    <button
      type="button"
      className={
        btnState === btnText
          ? "bg-green-600 text-white px-3 py-2 rounded-md m-1 font-bold w-full"
          : "bg-white text-black px-3 py-2 rounded-md m-1 font-bold w-full"
      }
      onClick={btnOnClick}
    >
      {btnText}
    </button>
  );
};

export default FormButton;
