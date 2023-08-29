"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import moment from 'moment';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  const handleCopy = () => {
    alert("You just hearted this post!")
  }

  return (
    <div className='prompt_card'>
        <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        onClick={handleProfileClick}>
          <Image
              src={post.creator.image.replaceAll(" ", "%20")}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {post.creator.username}
              </h3>
            </div>
          </div>
          <div className="/cursor-pointer">
          {session?.user.id && (
              <Image
                src='/assets/icons/heart-gray.svg'
                width={24}
                height={24}
                alt="Heart Button"
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center gap-3">          
          <Image
              src={post.foto.replaceAll(" ", "%20")}
              alt='user_image'
              width={250}
              height={250}
              className='object-contain rounded-lg my-5'
            />
        </div>
        <p className="font-satoshi text-sm text-gray-700">
          {post.prompt}
          </p>
        <p className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}>
          #{post.tag}
          </p>
          <p className="font-inter text-xs mt-4  text-gray-500">
                Posted On: {moment(post.promptTime).format('MMM Do YYYY')}
              </p>
          {session?.user.id === post.creator._id && pathName === '/profile' && (

          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}>Delete</p>
          </div>
          )}
      </div>
  )
};

export default PromptCard;