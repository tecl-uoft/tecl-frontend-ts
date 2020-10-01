import React from "react";

interface IFocusedModalProps {
  setShowModal(showModal: boolean): void;
  children: React.ReactNode;
}

function FocusedModal(props: IFocusedModalProps) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity cursor-pointer"
          onClick={() => props.setShowModal(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block w-10/12 p-6 align-bottom bg-white rounded-lg transform transition-all my-8 align-middle "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default FocusedModal;
