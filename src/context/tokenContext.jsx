import { createContext,useState } from "react";
export const TokenContext = createContext();


const TokenProvider = ({children})=>{
    const [token ,setToken ] =useState(false)
    return (

        <TokenContext.Provider value={{token,setToken}}>
            {children}

        </TokenContext.Provider>
    )
}
export default TokenProvider