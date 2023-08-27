"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [ providers, setProviders ] = useState(null);
  const [ toggleDropdown, setToggleDropdown ] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, []);
  return (

    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.png"
          width={40}
          height={40}
          className='object-contain'
          alt="FotoFin Logo"
        />
        <p className="logo_text">FotoFin</p>
      </Link>

      {/* Desktop  Nav*/}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button 
            type="button" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              />
            </Link>
          </div>
        ): (
          <>
           {providers && Object.values(providers).map(provider => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}/profile`})}
              className='black_btn'
            >
              Sign In
            </button>
           ))}
          </>
        )
        }
      </div>

      {/* Mobile Nav*/}

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link 
                    href="/profile"
                    className='dropdown_link'
                    onClick={(false)}>
                      My Profile
                  </Link>
                  <Link 
                    href="/create-post"
                    className='dropdown_link'
                    onClick={(false)}>
                      Create Post
                  </Link>
                  <button
                    type='button'
                    onClick={() => {setToggleDropdown(false);
                      signOut({ callbackUrl: 'http://localhost:3000/' });
                    }}
                  className='mt-5 w-full black_btn'>
                      Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
           {providers && Object.values(providers).map(provider => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}/profile`})}
              className='black_btn'
            >
              Sign In
            </button>
           ))}
          </>
        )}
      </div>
    </nav>
  )
}
export default Nav