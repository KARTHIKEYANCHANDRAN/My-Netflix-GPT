import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  addTopRatedMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constant';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const nowTopRatedMovies = useSelector(
      (store) => store.movies.nowTopRatedMovies
    );

    const getTopRatedMovies = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
      const json = await data.json();
      //console.log(json.results);
      dispatch(addTopRatedMovies(json.results));
    };
  
    useEffect(()=>{
      !nowTopRatedMovies &&  getTopRatedMovies();
    },[]);
}

export default useTopRatedMovies ;