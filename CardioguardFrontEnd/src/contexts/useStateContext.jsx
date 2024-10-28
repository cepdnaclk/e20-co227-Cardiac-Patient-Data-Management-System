// useStateContext.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useStateContext = () => useContext(AuthContext);

export default useStateContext;
