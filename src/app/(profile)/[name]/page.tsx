import Profile from "@/components/Profile";
import { notFound } from "next/navigation";
const getUserProfile = async (name: string) => {
    const res = await fetch(`http:localhost:8080/public/user/${name}`);
    const data = await res.json();

    if(data.status) {
        return data.data;
    } else {
        notFound();
    }
}
const ProfilePage = async ({ params }: any) => {
    const user = await getUserProfile(params.name);

    return <Profile User={user} />
}

export default ProfilePage;