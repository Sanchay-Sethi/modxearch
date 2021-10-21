import Lottie from "react-lottie";
import search from "../assets/search"
import search2 from "../assets/search2"
import {useState} from 'react';
import {Link} from 'react-router-dom'
import { useEffect } from "react"
import { useResultsContext } from "../contexts/ResultContextProvider";
import cross from "../assets/cross"
import { useDebounce } from "use-debounce";
const Home = ({darkTheme}) => {
   
  const {setSearchTerm, results, getResults, searchTerm} = useResultsContext();
  const [text, setText] = useState(searchTerm)
  const [debouncedValue] = useDebounce(text, 200)

    useEffect(()=>{
      if(debouncedValue) setSearchTerm(debouncedValue)
      else setSearchTerm('')

      if(searchTerm!==''){ 
          getResults(`/search/q=${searchTerm}&num=5`)
      }
    },[searchTerm, debouncedValue])
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: search,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: cross,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const defaultOptions3 = {
        loop: true,
        autoplay: true,
        animationData: search2,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
     
    const handleClick = (e) => {
        setSearchTerm(text);
    }
    return (
        <div className="Homediv" style = {{position: "relative", display : "flex", justifyContent : "center", alignItems: "center", flexDirection: "column", width: "100%", height: "80vh"}}>
            <div className="sm:text-2xl" style = {{display : "flex", justifyContent : "center", alignItems: "center"}}>
                <h1 className="font-bold text-6xl sm:text-9xl">M</h1>
                <Lottie options={!darkTheme ? defaultOptions3 : defaultOptions} height= {100} width = {100} />
                <h1 className="font-bold text-5xl sm:text-9xl">dXearch</h1>
            </div>

            <div className="flex justify-between items-center flex-col my-7">
            <div className="relative flex justify-between items-center sm:w-100 w-90 h-10">
            <input
                value = {text}
                type = 'text'
                className = " sm:w-100 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                placeholder = "Search for need!"
                onChange = {e=>setText(e.target.value)}
            />
            
            {text && (
                <button type="button" className="absolute top-0 right-2 text-2xl text-gray-500" onClick={()=>{setText(''); setSearchTerm('');}}>
                        <Lottie options={defaultOptions2} height= {50} width = {50}/>
                </button>
            )}
            </div>
            {
              searchTerm !=='' ? <div className = "w-100 bg-white dark:bg-gray-900 rounded-xl border-2 border-t-0">
                 {results.slice(0, 5)?.map(({link, title}, index)=>{
                        return <div key = {index} className="w-full border-b-2 rounded-lg p-2">
                            <a href = {link} target = "_blank" rel = "noreferrer" >
                                <p className="text-sm hover:underline dark:text-blue-500 text-blue-900">
                                    {title}
                                </p>
                            </a>
                        </div>
                    })}
              </div> : null
            }
            </div> 

            <Link to="/search"><button onClick={handleClick} type="button" className=" text-1xl dark:bg-gray-800  bg-white border rounded-full px-10 py-2 hover:shadow-lg ">Search</button></Link>
        </div>
    )
}

export default Home
