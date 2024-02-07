import Post from "@/components/Post";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { baseURL } from "@/env";

const getUsersPost = async (postId: string, userId: string) => {
  const cookie = cookies();
  const token = cookie.get('token')?.value;
  const res = await fetch(`${baseURL}/public/post?authorId=${userId}&postId=${postId}`);
  const data = await res.json();
  if (!data.status) {
    return notFound();
  } else {
    const currentUser = await fetch(`${baseURL}/user/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const userData = await currentUser.json();

    return [data.data, userData.data, token];
  }
}

const Page = async ({ params }: any) => {
  const [post, currentUser, token] = await getUsersPost(params.id, params.name.split(".")[2]);

  return <Post post={post} token={token} currentUser={currentUser} />;
}

export default Page;