
import Home from '@/components/Home';
import { cookies } from 'next/headers';

const getUser = () => {
  const store = cookies();
  const user = store.get('user')?.value;
  console.log(user)
  if(user) {
    return JSON.parse(user);
  }
}

export default function HomePage() {
  const user = getUser();

  return (
    <Home user={user} />
  )
}
