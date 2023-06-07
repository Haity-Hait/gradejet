import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const UseAxios = (url) => {
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true)

    useEffect(() => {
      try {
        axios.get(url)
        .then((res)=>{
            setdata(res.data)
            setloading(false)
        }).catch((err)=>{
            console.log(err);
        })
      } catch (error) {
        console.log(error);
      }
    }, [url])
    return {data, loading}
  
}

export default UseAxios