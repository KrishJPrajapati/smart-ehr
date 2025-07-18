import React from 'react'

function Navbar({pos}) {
  return (
    <div className={`bg-black/20 px-6 py-3 ${pos} left-0 w-full z-50 text-white backdrop-blur-sm top-0 flex justify-between`}>
        <div>
            <img src='/logo.svg' alt='logo'/>
        </div>
        <div className='font-convergence text-[25px] items-center flex'>
            <p>
            EHR Platform
            </p>
        </div>
    </div>
  )
}

export default Navbar