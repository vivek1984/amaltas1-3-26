// import {
//     Dialog,
//     DialogPanel,
//     Transition,
//     TransitionChild,
// } from '@headlessui/react';

// export default function Modal({
//     children,
//     show = false,
//     maxWidth = '2xl',
//     closeable = true,
//     onClose = () => {},
// }) {
//     const close = () => {
//         if (closeable) {
//             onClose();
//         }
//     };

//     const maxWidthClass = {
//         sm: 'sm:max-w-sm',
//         md: 'sm:max-w-md',
//         lg: 'sm:max-w-lg',
//         xl: 'sm:max-w-xl',
//         '2xl': 'sm:max-w-2xl',
//     }[maxWidth];

//     return (
//         <Transition show={show} leave="duration-200">
//             <Dialog
//                 as="div"
//                 id="modal"
//                 className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
//                 onClose={close}
//             >
//                 <TransitionChild
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="absolute inset-0 bg-gray-500/75" />
//                 </TransitionChild>

//                 <TransitionChild
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                     enterTo="opacity-100 translate-y-0 sm:scale-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                     <DialogPanel
//                         className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
//                     >
//                         {children}
//                     </DialogPanel>
//                 </TransitionChild>
//             </Dialog>
//         </Transition>
//     );
// }


import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) onClose();
    };

    const maxWidthClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    }[maxWidth];

    return (
        <Transition appear show={show} as={Transition}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={close}
            >
                {/* Backdrop */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </TransitionChild>

                {/* Modal container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className={`w-full ${maxWidthClass} transform rounded-lg bg-white shadow-xl transition-all`}
                            >
                                {/* Scroll INSIDE modal */}
                                <div className="max-h-[80vh] overflow-y-auto p-6">
                                    {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}