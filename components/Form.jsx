'use client'

import { useState } from 'react'
import Link from 'next/link';
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { usePathname, useRouter } from "next/navigation";

const Form = ({ type, post, setPost, submitting, handleSubmit, handleFileChange }) => {

  const pathName = usePathname();
  const uploader = Uploader({
    apiKey: "public_FW25bda733j9VK2eaxVZXX7chvuQ", // Get production API keys from Bytescale
  });

  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const handleComplete = files => {
    const message = files.map(x => x.fileUrl).join("\n");
    setPost({ ...post, foto: message})
    return message;
  };

  const [toggle, setToggle] = useState(true)

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='dec text-left max-w-md mt-5'>
        {type} and share amazing photos with the world!
      </p>

      <form 
      onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi mt-10 font-semibold text-base text-gray-700'>Your Fin Foto</span><br/>
          <p>
          <img src={post.foto} className='w-48 object-center rounded-lg my-2 justify-center'/>
          {pathName === '/create-post' && (
          <UploadButton uploader={uploader}
            options={options}
            onComplete={handleComplete}>
            {({onClick}) =>
            <button onClick={onClick}
            className='block my-5 w-100 text-sm mr-4 py-2 px-4 rounded-full border-0 font-semibold bg-blue-700 justify-center text-white'>
            Upload a file...
            </button>
            }
            </UploadButton>
            )}
            </p>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your Fin Description</span>
          <textarea 
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value})}
          placeholder='Describe your Fin here (in 160 characters)...'
          required
          className='form_textarea'
          maxLength="160">
          </textarea>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Fin Tags {` `}
            <span className='font-normal'> (smallmouthbass, gar, trout) </span>
          </span>
          <input 
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value})}
          placeholder='#tag'
          required
          className='form_input'>
          </input>
        </label>


        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
          href="/"
          className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-blue-700 rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>

      </form>
    </section>
  )
}

export default Form