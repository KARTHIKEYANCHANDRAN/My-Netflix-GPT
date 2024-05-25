import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="  flex flex-col md:flex-row justify-between relative z-10">
        {user && (
          <img
            className=" brightness-150 mx-auto md:mx-0  bg-black bg-opacity-70 contrast-200 w-40  h-16 "
            src={LOGO_URL}
            alt="netflix logo"
          />
        )}
        {user && (
          <div className="flex justify-between"> 
           {showGptSearch && <select onChange={handleLanguageChange} className="p-2 bg-blue-800 rounded-md hover:bg-blue-600 cursor-pointer text-white m-2">
              {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option> )}
              
            </select>
        }
            <button
              onClick={handleGptSearch}
              className="p-2 bg-blue-800 rounded-md hover:bg-blue-600 text-white m-2"
            >
              { showGptSearch ? "Go to Home" : "GPT Search"} 
            </button>

            <button
              onClick={handleSignOut}
              className="bg-black bg-opacity-70 rounded-md m-2 cursor-pointer hover:bg-opacity-100 hover:underline contrast-200 w-32  text-xl font-bold text-red-700 h-14"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
