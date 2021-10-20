import { useEffect } from "react"
import {useLocation } from 'react-router-dom'
import ReactPlayer from "react-player"
import Loading from "./Loading"
import {useResultsContext} from "../contexts/ResultContextProvider"
import NoResults from "./NoResults"
import Error from "./Error"

const Results = () => {
    const {results, isLoading, getResults, searchTerm}  = useResultsContext()
    const location = useLocation();
    useEffect(()=>{
        if(searchTerm){
            if(location.pathname === '/videos'){
                getResults(`/search/q=${searchTerm} videos`)
            }else{
                getResults(`${location.pathname}/q=${searchTerm}&num=40`)
            }
        }
    },[searchTerm, location.pathname])
    if(isLoading) return <Loading/>
    if(searchTerm==='') return(
        <NoResults title="Search Something First"/>
    )
    switch (location.pathname) {
        case '/search':
            return(
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 mb-10">
                    {results.length===0 ? <NoResults title = "No Results Found"/> : <>
                    <p className="w-full text-lg">{results.length} results found</p>
                    {results?.map(({link, title}, index)=>{
                        return <div key = {index} className="md:w-2/5 w-full border-b-2 rounded-lg p-2">
                            <a href = {link} target = "_blank" rel = "noreferrer" >
                                <p className="text-sm">
                                    {link.length > 30 ? link.substring(0,30) + "..." : link}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    })}
                    </>
                    }
                </div>
            )
        case '/images':
            return(
                <div className="flex flex-wrap justify-center items-center mb-10">
                    {results.length===0 ? <NoResults title = "No Results Found"/> : <>
                    <p className="w-full text-lg">{results.length} images found</p>
                    {results?.map(({image, link : {href, title}}, index)=>(
                        <a className="sm:p-3 p-5" href = {href} key={index} target="_blank" rel = "noreferrer">
                            <img src = {image?.src} alt = {title} loading = "lazy"/>
                            <p className="w-36 break-words text-sm mt-2">
                                {title}
                            </p>
                        </a>
                    ))}
                     </>
                    }
                </div>
            )
        case '/news':
            return(
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center mb-10">
                    {results.length===0 ? <NoResults title = "No Results Found"/> : <>
                    <p className="w-full text-lg">{results.length} news found</p>
                    {results?.map(({links, id, source, title})=>{
                        return <div key = {id} className="md:w-2/5 w-full border-b-2 rounded-lg p-2">
                            <a href = {links?.[0].href} target = "_blank" rel = "noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                                <div className="flex gap-4">
                                    <a href={source?.href} target = "_blank" rel = "noreferrer">
                                        {source?.href}
                                    </a>
                                </div>
                        </div>
                    })}
                    </>}
                </div>
            )
        case '/videos':
            return (
                <div className="flex flex-wrap">
                    {results.length===0 ? <NoResults title = "No Results Found"/> : <>
                    <p className="w-full text-lg">{results.length} videos found</p>
                    {results?.map((video, index)=>(
                        <div key = {index} className="p-2">
                            {video?.additional_links?.[0]?.href && <ReactPlayer url = {video.additional_links?.[0].href} controls width = "355px" height = "200px"/>}
                            <a href={video?.link} target = "_blank" rel = "noreferrer">
                                <p className="w-half text-sm mt-2">
                                    {video.title}
                                </p>
                            </a>
                        </div>
                        
                    ))}
                    </>}
                </div>
            )
        default:
            return(<Error/>)
    }
}

export default Results
