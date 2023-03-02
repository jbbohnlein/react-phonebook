import { useEffect, useState } from 'react'
import { server_calls } from '../api/server'

export const useGetData = () => {
    const [ contactData, setData ] = useState<[]>([])  // the last array in the parentheses means that the initial state will
    // just be set to an empty array

    // data processiong:
    // eventually we want to return contact data

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    // useEffect on mount
    useEffect( () => {
        handleDataFetch();
    }, [])  // 

  return { contactData, getData: handleDataFetch }

}