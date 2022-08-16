const SliderImage = ({ imageUrl, price, description }) => {
  return (
    <div className="relative w-full">
      <img src={imageUrl} className="w-full h-52 md:h-72 object-cover" />
      <div className="flex flex-col absolute  top-1/3">
        <span className="bg-black text-white px-3 py-1">{description}</span> <br />
        <span className="bg-white text-black rounded-full  text-xs inline-block p-2">
          {price}
        </span>
      </div>
    </div>
  );
};

export default SliderImage;
