import { Metadata } from "next";

export const metadata: Metadata = {
    title: "facePalm - log in or sign up",
    description: "Login or sign up to facePalm and connect with people around the world"
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