
interface Props {
    children: React.ReactNode,
    className?: string, 
}
const Modal = ({ children, className }: Props) => {
    return (
        <div className='tw-fixed  tw-left-0 tw-top-0 tw-w-full tw-h-full tw-overflow-auto tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-px-3 tw-z-[1000]'>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Modal;