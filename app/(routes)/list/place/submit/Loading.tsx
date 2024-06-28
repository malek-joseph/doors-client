import React from 'react'
import LoadingDoor from '@/app/components/loaders/door/LoadingDoor';


const loading = () => {
  return (
    <div className="bg-transparent flexCenter net_height">
    <LoadingDoor size={50}/>
    </div>
  )
}

export default loading