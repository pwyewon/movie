import React, { useEffect, useState } from 'react'
import ms from '@/styles/Movie.module.css'
import Link from 'next/link';
import { apiConfig, axiosRequest } from '../config';


const Movie = () => {
    
    const [data,setData] = useState();
    useEffect(()=>{ 
        axiosRequest.get('/movie/popular')
        .then(res=>{
            setData(res.data.results);
        })
    }, []);

  function searchFn(e){
    e.preventDefault();
    axiosRequest.get(`/search/movie?query=${e.target.txt.value}`)
        .then(res=>{
            setData(res.data.results);
        })    
  } 

  if(!data) return <>loading....</>;

  return (
    <div className={ms.list}>
        <h2>movie</h2>
        <p>
            <form onSubmit={searchFn}>
                <input type="text" name="txt"/>
                <input type="submit"/>
            </form>
        </p>
        <div>
            {
                data.map(obj=>(
                    <figure key={obj.id}>
                        <Link href={{pathname:'/detail', query:obj}}>
                            <img src={apiConfig.originImg(obj.poster_path)} alt={obj.title} />
                            <figcaption>{obj.title}</figcaption>
                        </Link>
                    </figure>
                ))
            }
        </div>
    </div>
  )
}

export default Movie;