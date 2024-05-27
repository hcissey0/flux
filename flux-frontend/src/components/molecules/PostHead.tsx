import React from 'react'
import Avatar from '../atoms/Avatar'
import FollowButton from '../atoms/FollowButton'

const PostHead = () => {
  return (
    <div>
      <div className='flex gap-3'>
        <Avatar />
        <FollowButton />
      </div>
    </div>
  )
}

export default PostHead
