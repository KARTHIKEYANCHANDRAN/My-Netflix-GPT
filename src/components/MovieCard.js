import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'


const MovieCard = ({poster_path}) => {
  if(!poster_path)return null;
  return (
    <div className='w-40 m-1 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300'>
      <img src={IMG_CDN_URL + poster_path} alt="Movie card"  />
    </div>
  )
}

export default MovieCard
