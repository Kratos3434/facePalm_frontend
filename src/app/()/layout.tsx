import NavBar from "@/components/NavBar";

interface Props {
    children: React.ReactNode
}
const HomeLayout = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            <div className="tw-bg-[#F0F2F5]">
                {children}
            </div>
        </>
    )
}

export default HomeLayout;