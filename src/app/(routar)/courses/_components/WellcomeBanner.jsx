import React from 'react'


function WellcomeBanner() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5 '>
      <img src='/Tiger.png' alt='Tiger'
      width={100}
      height={100}/>
      <div>
        <h2 className='font-bold text-[29px]'>
            Wellcome to <span className='text-primary'>Clever</span> Academy </h2>
        <h2 className='text-gray-500'>Explore, Learn and Build All Real Life Projects</h2> 
      </div>
    </div>
  )
}

export default WellcomeBanner
