"use client";
import PinList from "@/components/PinList";
import app from "@/firebase/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,

} from "firebase/firestore";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const db = getFirestore(app);
  const [pins, setPins] = useState<any>([]);
  const { data: session } = useSession();
  const getAllPins = async () => {
    setPins([]);
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPins((pins: any) => [...pins, doc.data()]);
    });
  };
  useEffect(() => {
    getAllPins();
  }, []);
  return (
    <>
     <div className='p-3'>
      <PinList pinList={pins} />
      </div>
    </>
  );
}
