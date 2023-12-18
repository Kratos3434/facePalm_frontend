
import Home from '@/components/Home';
import { cookies } from 'next/headers';

const getUser = async () => {
  const store = cookies();
  const token = store.get('token')?.value;
  const res = await fetch('http://localhost:8080/user/current', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await res.json();
  return data.data;
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
  const user = await getUser();
  const posts = await getPosts();
  return (
    <Home user={user} posts={posts} />
  )
}
