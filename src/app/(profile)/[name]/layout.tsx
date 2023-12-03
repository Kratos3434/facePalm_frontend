import NavBar from "@/components/NavBar";

interface Props {
    children: React.ReactNode
}
const ProfileLayout = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            <div className="tw-bg-[#F0F2F5] tw-pt-[52px]">
                {children}
            </div>
        </>
    )
}

export default ProfileLayout;