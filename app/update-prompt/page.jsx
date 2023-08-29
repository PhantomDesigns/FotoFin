"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id'); 
  const { data: session, status } = useSession()
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag,
            foto: data.foto,
        });
    };

    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not Found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt