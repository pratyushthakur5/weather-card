import React from 'react'
import { NAVBAR_CONFIG } from './constants'
import Link from 'next/link'
import './index.scss'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      {NAVBAR_CONFIG.map((item) => {
        return (
          <Link className='nc__item' href={item.href} key={item.href}>
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export default Navbar
