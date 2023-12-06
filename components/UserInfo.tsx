import Image from 'next/image'
import React from 'react'

const UserInfo = ({userInfo}:{userInfo:any}) => {
    console.log(userInfo)
  return (
    <div className='flex flex-col items-center'>
        <Image src={userInfo?.userImage} alt='user-image' width={100} height={100} className='rounded-full ' />
        <h2 className='text-xl 2xl:text-2xl font-semibold'>{userInfo?.userName}</h2>
        <h2 className='text-gray-400 text-md'>{userInfo?.userEmail}</h2>
        <button className='bg-gray-300 p-2 px-3 rounded-full font-semibold mt-5'>Share</button>
    </div>
  )
}

export default UserInfo