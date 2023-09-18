import React from 'react'
import { FadeLoader } from 'react-spinners'

const Spinner:React.FC = () => {
  return (
    <div className='w-full mx-auto  flex justify-center items-center my-16'>
        <FadeLoader color="#52bfd9" height={15} radius={2}/> 
    </div>
  )
}

export default Spinner