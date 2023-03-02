import ContactForm from "./ContactForm";

//  Could have interface Props { } here and it would be the same thing
type Props = {
    id?: string[];
    open: boolean;
    onClose: () => void;
}

const Modal = ( props: Props ) => {
    if ( !props.open ) return (<></>);
    return (
        <div 
            onClick={ props.onClose } 
            className='fixed w-full h-full flex overflow-auto z-1 justify-center align-middle
                 bg-gray-300 bg-opacity-25'
        >
            <div
            // width = 2/5 = 40% because you can't write percentages in Tailwind
                className="max-w-600px w-2/5 fixed flex z-1 mt-20 bg-white shadow-xl rounded"
            // stopPropagation() going to be used so that if we click in the modal, it doesn't close    
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="w-full flex flex-col">
                        <div className="flex flex-row space-apart">
                            <p className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                                onClick={props.onClose}>
                                    {/* Use a fontawesome X here instead of just the X */}
                                    X
                            </p>
                        </div>
                    <div className="flex flex-col item-center text-center mt-3 p-2">
                        <ContactForm id={ props.id }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal