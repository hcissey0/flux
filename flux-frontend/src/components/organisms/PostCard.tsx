import React from 'react'
import Avatar from '../atoms/Avatar'
import PostHead from '../molecules/PostHead'

const PostCard = () => {
  return (
    <div >
        <div className="w-96 mx-auto">
        <div className='p-4 m-4 mb-1 rounded-tr-3xl w-96 mx-auto bg-base-100 shadow-2xl'>
            <div className=''>
                <PostHead />
            </div>
        </div>

      <div className=" w-96 bg-base-100 shadow-2xl mx-auto">
  <div className="p-10 items-center text-center">
    {/* <h2 className="card-title">Shoes!</h2> */}
    <p>If a dog chews shoes whose shoes does he choose?</p>
  {/* <figure className="px-10 pt-10">
    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
  </figure> */}

  </div>
</div>
<div className='p-2 m-4 mt-1 mb-1 rounded-bl-3xl w-96 mx-auto bg-base-100 shadow-2xl'>
            <div className=''>
            <div className=" flex justify-around">
      <button className="btn btn-sm btn-ghost">Like</button>
      <button className="btn btn-sm btn-ghost">Save</button>
    </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PostCard
