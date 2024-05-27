import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBox from '../atoms/SearchBox'

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 rounded-badge mb-5 shadow-2xl">
  <div className="flex-1">
    <Link className="btn btn-ghost rounded-badge text-3xl" href='/'>Flux</Link>
  </div>
  <div className="flex-none gap-2">
  <div>
    <SearchBox />
  </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">

          <Image src={'/user2.png'} height={50} width={50} alt='avatar'/>

        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default NavBar
