import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-5'>
      <div className="logo flex font-bold text-white  text-3xl mx-5 ">
      <img className=' ' width={40} src="/favicon.png" alt="" />
        <span className='text-green-500 text-3xl'>&lt;</span>
        Pass
        <span className='text-green-500 text-3xl'>OP/&gt;</span></div>
        <ul>
          <li className='flex gap-5 text-white mx-5'>
            <a className='hover:font-bold py-2' href='/'>Home</a>
            <a className='hover:font-bold py-2' href='#'>About</a>
            <a className='hover:font-bold py-2' href='#'>Contact</a>
            <img className='invert ' width={40} src="icons/github.svg" alt="" />
          </li>
        </ul>
        
          
        
      </div>
    </nav>
  )
}

export default Navbar
