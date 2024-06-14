import React from 'react'
import LoadingDoor from '@/app/components/loaders/door/LoadingDoor';
import NextBackBtns from '@/app/components/buttons/NextBackBtns';


const Loading = () => {
  return (
    <>
        <div
      className="bg-transparent flexCenter border"
     >
      <LoadingDoor size={50} />
    </div>
      <NextBackBtns/>
    </>


  );
}

export default Loading