
import Home from '@/components/Home';
import { cookies } from 'next/headers';

const getUser = () => {
  const store = cookies();
  const user = store.get('user')?.value;
  console.log(user)
  if (user) {
    return JSON.parse(user);
  }
}

const getPosts = async () => {
  const res = await fetch("http://localhost:8080/admin/post/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer dfsdfsdsdfsfssfvgthgbh"
    }
  });
  const data = await res.json();

  return data.data;
}

export default async function HomePage() {
  const user = getUser();
  const posts = await getPosts();
  return (
    <Home user={user} posts={posts} />
  )
}
