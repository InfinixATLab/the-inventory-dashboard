export const Modal = ({ children, onClose }:{children:React.ReactNode,onClose:()=>void}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow relative w-11/12 max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900">
          X
        </button>
        {children}
      </div>
    </div>
  );
};
