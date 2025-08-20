import React from 'react'
import { RxDropdownMenu } from 'react-icons/rx'

const Navbar = ({setTheme}) => {
  return (
    <nav className='navbar flex justify-between bg-indigo-900 text-white py-4 px-8 shadow-md'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
       <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:text-slate-50 transition-all'>Home</li>
        <li className='cursor-pointer  hover:text-slate-50 transition-all'>Your Tasks</li>

{/* 🔻 Dropdown for Theme Switching */}
        <li className="relative group cursor-pointer">
          <span className=' hover:text-slate-50 transition-all'>Theme Changer </span>
          <ul className="absolute hidden group-hover:block box shadow-md mt-2 rounded-lg overflow-hidden">
            <li 
              onClick={() => setTheme("bluepink")} 
              className="px-4 py-2 hover:bg-gradient-to-r from-pink-400 to-blue-400 text-black">Blue Pink</li>
            <li 
              onClick={() => setTheme("coffee")} 
              className="px-4 py-2 hover:bg-gradient-to-r from-orange-950 to-orange-200 text-black">Coffee Cream</li>
            <li 
              onClick={() => setTheme("forest")} 
              className="px-4 py-2 hover:bg-gradient-to-r from-green-900 to-green-200 text-black">Forest Mint</li>
          </ul>
        </li>
        </ul>
    </nav>
  )
}

export default Navbar
