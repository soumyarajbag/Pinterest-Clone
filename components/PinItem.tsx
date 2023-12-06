import Image from 'next/image'
import React from 'react'
import UserTag from './UserTag'
import { useRouter } from 'next/navigation';


const PinItem = ({pin}:{pin:any}) => {
    const router=useRouter();
    
    const user={
        name:pin?.userName,
        image:pin?.userImage,
        email:pin?.email
    }
  return (
    <div className='flex flex-col items-start'>
       <div className="relative before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer" onClick={()=>router.push("/pin/"+pin.id)}>
        <Image src={pin.image}
        alt={pin.title}
        width={500}
        height={500}
        className='rounded-3xl 
        cursor-pointer'
        />
       </div>
        <h2 className='font-bold text-[18px] '>{pin.title}</h2>
        <UserTag user={user} />
    </div>
  )
}

export default PinItem