import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Header from "./Header";
import { BG_URL, LOGO_URL } from "../utils/constant";

const Login = () => {
  const [change_sign_in_value, setchange_sign_in_value] = useState(true);  // true for sign_in ; false for sign_up

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handlefunction = () => {
    setchange_sign_in_value(!change_sign_in_value);
  };

  const handleButtonClick = () => {
    
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message) return;   //stop proceeding further if error message from validate.js

    if (!change_sign_in_value) {         //if(!false) for sign_up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.errorMessage);
            });
        })
        .catch((error) => {
          setErrorMessage(error.errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage("New User ? Please Sign Up first.");
        });
    }
  };

  return (
    <div>
      <Header  />

      <img
        className="brightness-80 h-screen object-cover md:h-auto fixed "
        src={BG_URL}    alt="netflix bg"
      />
       <img
        className="absolute brightness-150  bg-black bg-opacity-70 contrast-200 w-40 top-1 left-28 md:left-32 h-16 "
        src={LOGO_URL}   alt="netflix logo"
      /> 
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute px-10 h-[100%] py-8 bg-black bg-opacity-80 rounded-lg w-full md:w-4/12 top-24 md:left-1/3 "
      >
        <label className="text-white text-4xl mx-2  font-bold px-1 py-14 my-10">
          {change_sign_in_value ? "Sign In" : "Sign Up" }
        </label>

        {!change_sign_in_value && (
          <input
            ref={name}
            className="p-3 mt-6 mb-2 w-[90%] mx-4 border border-red-700 rounded-md placeholder-gray-300  focus:font-light focus:outline-white  bg-gray-800 text-white"
            type="text"
            placeholder="Name"
          />
        )}

        <input
          ref={email}
          className="p-3 mt-6 mb-2 w-[90%] mx-4 border border-red-700 rounded-md placeholder-gray-300  focus:font-light focus:outline-white  bg-gray-800 text-white"
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          className="p-3 mt-6 mb-2 w-[90%] mx-4 rounded-md border border-red-700 placeholder-gray-300 focus:outline-white border bg-gray-800 text-white"
          type="password"
          placeholder="Password"
        />

        <p className="text-red-500 px-4 text-xl">{errorMessage}</p>

        <button
          className="bg-red-600 contrast-150 hover:bg-red-800 w-[90%] mx-4 text-center text-white p-1 rounded-md my-2"
          onClick={handleButtonClick}
        >
          {change_sign_in_value === true ? "Sign In" : "Sign Up"}
        </button>

        <p
          className=" px-3 m-1 cursor-pointer text-blue-300 hover:text-blue-600"
          onClick={handlefunction}
        >
          {" "}
          {change_sign_in_value
            ? "New to Netflix ? Sign up now."
            : "Existing User ? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
