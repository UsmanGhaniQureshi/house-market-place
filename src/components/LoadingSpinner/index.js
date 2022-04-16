import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <FaSpinner className="w-32 h-32 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
