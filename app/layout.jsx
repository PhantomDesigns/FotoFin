import '@styles/globals.css';

import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Provider from '@components/Provider';

export const metadata = {
    title: "FotoFin",
    description: 'A wonderful world of fishing photos.'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient"></div>
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>  
            <div className='mb-20'></div>
            </Provider>
            <Footer></Footer>
        </body>
        
    </html>
  )
}

export default RootLayout