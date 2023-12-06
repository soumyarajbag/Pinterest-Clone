"use client";
import app from "@/firebase/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import UserInfo from "@/components/UserInfo";
import PinList from "@/components/PinList";

const Profile = ({ params }: { params: any }) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [pins, setPins] = useState<any>([]);
  const db = getFirestore(app);
  useEffect(() => {
    if (params?.userId) {
      getUserInfo(params?.userId.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email: string) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const getUserPins = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        where("email", "==", userInfo?.userEmail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPins((pins: any) => [...pins, doc.data()]);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    
      getUserPins();
    
  }, [userInfo]);

  return (
    <div>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList pinList={pins} />
        </div>
      ) : null}
     
    </div>
  );
};

export default Profile;
