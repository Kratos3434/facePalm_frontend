import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Email",
    description: "Verify your email to complete signup"
}

interface Props {
    children: React.ReactNode
}
const LoginLayout = ( { children }: Props ) => {
    return(
        <main className="tw-bg-[#F0F2F5]">
            {children}
        </main>
    )
}

export default LoginLayout;