import Post from "@/components/Post";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { baseURL } from "@/env";

const getUsersPost = async (postId: string, userId: string) => {
  const res = await fetch(`${baseURL}/public/post?authorId=${userId}&postId=${postId}`);
  const data = await res.json();
  if (!data.status) {
    return notFound();
  } else {
    return data.data;
  }
}

const Page = async ({ params }: any) => {
  const cookie = cookies();
  const post = await getUsersPost(params.id, params.name.split(".")[2]);

  return <Post post={post} token={cookie.get('token')?.value} />;
}

export default Page;