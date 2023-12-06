"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import UserTag from "./UserTag";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "@/firebase/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
interface UploadType {
  title: string;
  description: string;
  link: string;
}

const Form = () => {
  const { data: session } = useSession();
  const intialData: UploadType = {
    title: "",
    description: "",
    link: "",
  };
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [formValues, setFormValues] = useState<UploadType>(intialData);
  const [file , setFile] = useState<File | null>(null) 
  const [loading, setLoading] = useState(false);
  const postId = Date.now().toString();
  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const onSave = ()=>{
    console.log(formValues)
    console.log(file)
    uploadFile()
  }

  const uploadFile = ()=>{
    const storageRef = ref(storage , 'pinterest/'+file?.name);
    uploadBytes(storageRef, file!).then((snapshot) => {
        console.log('File Uploaded!');
      }).then(res=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log('Download URl :', downloadURL);
            const uploadData = {
                title:formValues?.title,
                description:formValues?.description,
                link:formValues?.link,
                image:downloadURL,
                username:session?.user?.name,
                email:session?.user?.email,
                userImage:session?.user?.image,
            }
            await setDoc(doc(db, "posts", postId), {
                ...uploadData
              }).then(res=>{
                console.log('Document posted : ', res);
              }).catch(err=>{
                console.log('Error : ', err);
              });

          });
      })
  }
  return (
    <div className=" bg-white p-16 rounded-2xl ">
      <div className="flex justify-end mb-6">
        <button
        onClick={()=>onSave()}
          className="bg-red-500 p-2
        text-white font-semibold px-3 
        rounded-lg"
        >
          {loading ? (
            <Image
              src="/loading-indicator.png"
              width={30}
              height={30}
              alt="loading"
              className="animate-spin"
            />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={(file:any)=>setFile(file)} />

        <div className="col-span-2">
          <div className="w-[100%]">
            <input
            name="title"
              onChange={handleChange}
              type="text"
              placeholder="Add your title"
              className="text-[35px] outline-none font-bold w-full
    border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <h2 className="text-[12px] mb-8 w-full  text-gray-400">
              The first 40 Charaters are what usually show up in feeds
            </h2>
            <UserTag user={session?.user} />
            <textarea
              onChange={handleChange}
                name="description"
              placeholder="Tell everyone what your pin is about"
              className=" outline-none  w-full mt-8 pb-4 text-[14px]
    border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Add a Destination Link"
              name="link"
              className=" outline-none  w-full  pb-4 mt-[90px]
    border-b-[2px] border-gray-400 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
