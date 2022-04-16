const SliderImage = ({ imageUrl, price, description }) => {
  return (
    <div className="relative">
      <img src={imageUrl} className="w-full h-80 object-cover" />
      <div className="flex flex-col absolute  top-1/3">
        <span className="bg-black text-white p-1">{description}</span> <br />
        <span className="bg-white text-black rounded-full  text-xs inline-block mx-2 mt-3 p-2">
          {price}
        </span>
      </div>
    </div>
  );
};

export default SliderImage;
