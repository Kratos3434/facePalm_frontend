import Login from "@/components/Login"
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

const verifyToken = () => {
    const store = cookies();
    const retToken = store.get('retrieveToken')?.value;
    const token = store.get('token')?.value;
    if(retToken) {
        redirect("/verifyemail");
    } else if(token) {
        redirect("/");
    }
}
const Home = () => {
    verifyToken();
    return(
        <Login />
    )
}

export default Home;