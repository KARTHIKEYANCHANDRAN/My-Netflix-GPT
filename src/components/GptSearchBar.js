import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

  const dispatch = useDispatch();
  
  const lang_key = useSelector(store => store.config.lang);
  const searchText = useRef(null)

  const searchMovieTMDB = async (movie) =>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'include_adult=false&language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    return json.results;
  }
  
  const handleGptSearchClick = async () =>{
       // console.log(searchText.current.value);
       const gptQuery = "Act as a movie suggestion system and suggest some movies for the query :" + searchText.current.value + "with comma separated";
       const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      console.log(gptResults?.choices?.[0]?.message?.content);
      const gptMovies = gptResults?.choices?.[0]?.message?.content.split(",") ;
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovies , movieResults : tmdbResults}));
  }

  return (
    <div >
        <form onSubmit={(e) => e.preventDefault()} >
            <input ref={searchText} className='md:w-1/2 w-[90%] p-3 rounded-md mt-14 md:ml-60  ml-6 '  type="text" placeholder={lang[lang_key].gptSearchPlaceholder} />
            <button onClick={handleGptSearchClick}  className='p-3 m-2 ml-40 bg-green-600 text-white rounded-lg '>{lang[lang_key].Search}</button>
        </form>
      
    </div>
  )
}

export default GptSearchBar
