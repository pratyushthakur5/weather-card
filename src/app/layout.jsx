import Navbar from '@/components/navbar'
import './page.scss'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div id='root'>
          <Navbar></Navbar>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
