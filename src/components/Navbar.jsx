import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900/70 backdrop-blur-lg text-white sticky top-0 z-20 border-b border-slate-800'>
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3 h-16">

        <div className="logo font-bold text-2xl">
            <span className='text-indigo-400'>&lt;</span>
            <span>Pass</span><span className='text-indigo-400'>OP/&gt;</span>
            </div>
        
        <a href="https://github.com/deepti-07/passop" target="_blank" rel="noopener noreferrer" className='text-white bg-indigo-500 hover:bg-indigo-600 rounded-full flex justify-between items-center ring-white ring-1 transition-all duration-300 ease-in-out transform hover:scale-105'>
            <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
            <span className='font-bold px-2'>GitHub</span>
        </a>
        </div>
    </nav>
  )
}

export default Navbar