
import app from '@/firebase/firebase'
import { getFirestore } from 'firebase/firestore'
import PinItem from './PinItem'


const PinList = ({pinList}:{pinList:any}) => {
    console.log(pinList)
  return (
    <div className='flex justify-center max-md:px-5 pt-10 flex-row flex-wrap gap-5 md:gap-10'>
      {
        pinList?.map((pin:any , index:number)=>(
          <div key={index}>
            <PinItem pin={pin} />
          </div>
        ))
      }
    </div>
  )
}

export default PinList