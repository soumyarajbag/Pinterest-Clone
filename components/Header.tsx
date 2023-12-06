"use client";
import Image from 'next/image'
import { useEffect } from 'react'
import { HiSearch, HiBell, HiChat } from "react-icons/hi"
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import app from '../firebase/firebase'
import { useRouter } from 'next/navigation';
const Header = () => {
  const { data: session } = useSession()
  
  const db = getFirestore(app);
  const router = useRouter();

  const saveUserInfo = async () => {
    await setDoc(doc(db, "user", session?.user?.email!), {
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      userImage: session?.user?.image,
    });
  }

  useEffect(() => {
   if(session){
    saveUserInfo()
   } 
  }, [session])

  return (
    <div className='flex flex-row  gap-3 md:gap-2 items-center p-6 '>
      <Image src="/logo.png" alt='Pinterest' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
      <button className='bg-black text-white p-2 rounded-full px-4'>Home</button>
      <button onClick={()=>router.push('/pin-builder')} className=' text-black font-semibold p-2 rounded-full px-4'>Create</button>
      <div className='hidden md:flex flex-row w-full items-center bg-[#e9e9e9]  p-3 gap-3 rounded-full'>
        <HiSearch className="text-[25px] text-gray-500" />
        <input type="text" placeholder="Search" className='bg-transparent outline-none' />

      </div>
      <HiBell className="text-[25px] md:text-[40px]  text-gray-500 " />
      <HiChat className="text-[25px] md:text-[40px] text-gray-500 " />
      {session?.user ? <Image onClick={()=>router.push('/'+session?.user?.email)} src={session?.user?.image!} alt='user-image' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' /> :
        <button onClick={() => signIn()} className=' text-black font-semibold p-2 rounded-full px-4'>Login</button>
      }

    </div>
  )
}

export default Header