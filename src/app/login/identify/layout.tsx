import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Verify your identity"
}

interface Props {
    children: React.ReactNode
}
const LoginLayout = ( { children }: Props ) => {
    return(
        <div className="tw-bg-[#F0F2F5]">
            {children}
        </div>
    )
}

export default LoginLayout;