import { Inter } from 'next/font/google'
import HomepageBg from '@/assets/coverBg.png'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={`${inter.className}`} id='main-container'>
        <img src={HomepageBg.src} className='mc__bg'></img>
        <div className='mc__text'>
          <h3>Discover the weather around the world</h3>
          <Link className='mc__search' href='/current-weather'>
            <button className='button-1' role='button'>
              Go
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
