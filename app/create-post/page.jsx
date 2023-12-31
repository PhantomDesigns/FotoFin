"use client";
import { useState } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    foto: '',
    prompt: '',
    tag: '',
    promptDate: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          foto: post.foto,
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id
        })
      })

      if(response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied - Please sign in.</p>
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePost