import React from "react";

interface IFocusedModalProps {
  setShowModal(showModal: boolean): void;
  children: React.ReactNode;
}

function FocusedModal(props: IFocusedModalProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-2 pt-4 pb-20 text-center sm:block sm:p-0">
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
          className="inline-block p-6 my-12 align-top transition-all transform bg-white rounded-lg"
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
