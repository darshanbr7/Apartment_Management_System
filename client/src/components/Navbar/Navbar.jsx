import React from 'react'
import{BiLogInCircle} from "react-icons/bi"
import {RiAccountCircleLine} from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div>
   
      <nav className='navbar navbar-expand-lg bg-info'>
        <div className=' navbar navbar-brand text-gray-700 font-bold tracking-widest cursor-pointer' onClick={()=>{navigate("/")}}>APM</div>
        <div className="ml-auto">
          <ul className='navbar-nav'>            
            {
              localStorage.getItem("token")  ?   <li className='nav-item'><Link  className='nav-link text-white mr-2'  to={"/account"}><RiAccountCircleLine size={26} color={"white"}/></Link>   </li>     : <li className='nav-item'><Link  className='nav-link text-white mr-2'  to={"/login"}><BiLogInCircle size={26} color={"white"}/></Link>   </li>   
            }
           
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar