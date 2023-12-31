'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';    

import Profile from '@components/Profile';

const MyProfile = () => {
 
  const { data: session, status } = useSession()
  const router = useRouter();
  const [ posts, setPosts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true); // Add a loading state


  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
        setIsLoading(false); // Once data is fetched, set isLoading to false
      }
    };
    fetchPosts();
  }, [session]); // Include session as a dependency
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you wantto delete this post?");

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method : 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id );

        setPosts(filteredPosts);

      } catch (error) {
        console.log(error)
      }
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied - Please sign in.</p>
  }
  
  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
  )
}

export default MyProfile