import Footer from "../Footer";

const LayOut = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 bg-slate-200">{children}</div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};

export default LayOut;
