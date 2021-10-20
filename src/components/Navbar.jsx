import {Link} from 'react-router-dom'
import Search from './Search'
import {useLocation } from 'react-router-dom'

const Navbar = ({darkTheme, setDarkTheme}) => {
    const location = useLocation();
    return (
        <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
            <div className="flex justify-between items-center space-x-5 w-screen">
                <Link to = "/">
                    <p className="text-2xl font-bold py-1 px-2 dark:text-gray-50 mb-3">
                        🔍 ModXearch
                    </p>
                </Link>
                <button type = "button" onClick = {()=>setDarkTheme(!darkTheme)} className="text-2xl dark:bg-gray-800 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg mb-3 ">
                    {darkTheme ? '🔆' : '🌙'}
                </button>
            </div>
            {location.pathname === "/" ? null : <Search/>}       
        </div>
    )
}

export default Navbar
