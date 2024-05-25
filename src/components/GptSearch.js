import { BG_URL } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className=" w-screen  h-screen">
      <div className="absolute -z-30">
        <img
          className="brightness-80 scale-y-150  md:fixed h-screen object-cover  md:h-auto  "
          src={BG_URL}
          alt="netflix bg"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
