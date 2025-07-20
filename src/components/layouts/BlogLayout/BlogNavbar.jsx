import { useState } from "react"
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi"
import {LuSearch} from "react-icons/lu"
// import {BLOG_NAVBAR_DATA} from "../../../utils/data"
import Logo from '../../../assets/bloglogo.webp'
import { Link } from "react-router-dom"


const BlogNavbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSEarchBar] = useState(false);

  return (
   <div className="bg-white boeder border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 ">
        <div className="container mx-auto flex items-center justify-between gap-5">
            <div className="flex gap-5">
                <button
                    className="black lg:hidden text-black -mt-1"
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu)
                    }}
                >
                    {openSideMenu ? 
                        (<HiOutlineX className="text-2xl" /> ) :( <HiOutlineMenu className="text-2xl" />)}
                </button>
                <Link to='/'>
                    <img src={Logo} alt="logo" className="w-30 h-20" />
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-10">

            </nav>


        </div>
   </div> 
  )
}

export default BlogNavbar
