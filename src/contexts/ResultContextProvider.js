import React, {createContext, useContext, useState} from "react"

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = async (type) => {
        setLoading(true);

        const res = await fetch(`${baseUrl}${type}`,{
            method : 'GET',
            headers : {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '0a40d75be4mshbb49a1df2e94494p100a23jsne774e70228c8'
            }
        });
        const data = await res.json();
        if(type.includes('/news')){
             setResults(data.entries)
        }else if(type.includes('/images')){
             setResults(data.image_results)
        }else{
             setResults(data.results)
        }
        setLoading(false)
    }

    return(
        <ResultContext.Provider value = {{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultsContext = () => useContext(ResultContext)