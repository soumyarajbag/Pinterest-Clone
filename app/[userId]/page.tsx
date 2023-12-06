"use client";
import app from '@/firebase/firebase';
import { getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import UserInfo from '@/components/UserInfo';


const Profile = ({params}:{params:any}) => {
    const [userInfo, setUserInfo] = useState<any>(null);
     const db = getFirestore(app);
    useEffect(() => {
        console.log(params?.userId.replace('%40','@'))
        if(params?.userId){
            getUserInfo(params?.userId.replace('%40','@'))
        
        }
        
    } , [params])
    const getUserInfo = async (email:string) => {  
        const docRef = doc(db, "user", email );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
         
          setUserInfo(docSnap.data())
        } else {
          console.log("No such document!");
        }
     }
  return (
    <div>
        { userInfo ? <UserInfo userInfo = {userInfo} /> : null}
    </div>
  )
}

export default Profile