import ReactDom from "react-dom";

export default function Modal({ children, handleCloseModal }) {
  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-50 p-4">
      <button 
        onClick={handleCloseModal} 
        className="absolute inset-0 bg-[#f8fafc] opacity-80 z-40 border-none cursor-pointer"
      ></button>
      <div className="relative z-50 max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-3xl w-full mx-auto min-h-[400px] md:min-h-[30rem] xl:min-h-[40rem] rounded-2xl border border-gray-300 bg-white p-4 sm:p-6 md:p-8 flex flex-col gap-4">
      {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
