
import Home from '@/components/Home';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';
import { publicBaseURL, userBaseURL } from '@/env';
import { redirect } from 'next/navigation';


const getUser = async () => {
  const store = cookies();
  const token = store.get('token')?.value;
  try {
    const res = await fetch(`${userBaseURL}/current`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await res.json();
    console.log("CALLED GETUSER")
    return [data.data, token];
  } catch (err) {
    redirect("/login");
  }
}

const getPosts = async () => {
  try {
    const res = await fetch(`${publicBaseURL}/post/list`, {
      cache: 'no-store',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer dfsdfsdsdfsfssfvgthgbh"
      }
    });
    const data = await res.json();

    return data.data;
  } catch (err) {
    redirect("/login");
  }
}

export default async function HomePage() {
  noStore();
  const [user, token] = await getUser();
  const posts = await getPosts();
  return (
    <Home user={user} posts={posts} token={token} />
  )
}
