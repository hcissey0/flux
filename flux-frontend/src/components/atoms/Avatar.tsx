import Image from 'next/image'
import React from 'react'

interface Props {
    firstName?: string;
    lastName?: string;
    username?: string;
    src?: string;
    alt?: string;
    height?: number;
    width?: number;
}

const Avatar = ({
    firstName = 'None',
    lastName = 'None',
    username = 'username',
    src = '/user2.png',
    alt = 'avatar',
    height = 50,
    width = 50
}: Props) => {
  return (
    <div className='w-full'>
      <div className='flex gap-2'>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">

          <Image src={src} height={height} width={width} alt={alt}/>

        </div>
        </div>
        <div>
            <div className='font-bold text-start p-0 m-0 text-xl'>
                {firstName + " " + lastName}
            </div>
            <div role='btn' className='btn btn-xs btn-link p-0  text-start text-sm text-neutral-400'>
                @{username}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Avatar

