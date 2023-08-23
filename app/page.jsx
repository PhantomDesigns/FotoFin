import Feed from '@components/Feed';
import { Suspense } from 'react';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share 
            <br />
            <span className="blue_gradient text-center">Fish Around The World</span>
        </h1>
        <p className="desc text-center">
            FotoFin is a new fishing social media platform to share all your wonderful catches
        </p>
        <Suspense fallback="Loading...">
        <Feed />
        </Suspense>
    </section>
  )
}

export default Home