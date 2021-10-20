import {Links} from "./Links"
import {useEffect, useState} from 'react';
import { useDebounce } from "use-debounce";
import { useResultsContext } from "../contexts/ResultContextProvider";
import Lottie from "react-lottie";
import cross from "../assets/cross"
const Search = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cross,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    const {setSearchTerm, searchTerm} = useResultsContext();
    const [text, setText] = useState(searchTerm)
    const [debouncedValue] = useDebounce(text, 300)
    useEffect(()=>{
        if(debouncedValue) setSearchTerm(debouncedValue)
    },[debouncedValue])
    return (
        <div className="flex justify-between items-center flex-col sm:ml-48 md:ml-72 sm:-mt-10 mt-3 ">
            <div className="relative flex justify-between items-center sm:w-100 w-90 h-10">
            <input
                value = {text}
                type = 'text'
                className = " sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                placeholder = "Search for need!"
                onChange = {e=>setText(e.target.value)}
            />
            {text && (
                <button type="button" className="absolute top-0 right-2 text-2xl text-gray-500" onClick={()=>setText('')}>
                        <Lottie options={defaultOptions} height= {50} width = {50}/>
                </button>
            )}
            </div>
            <Links/>
        </div>
    )
}

export default Search
