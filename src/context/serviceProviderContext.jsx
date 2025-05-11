import { createContext,useState } from "react";
export const ServiceProviderContext = createContext();


const ServiceProvider = ({children})=>{
    const [serviceP ,setserviceP ] =useState(false)
    return (

        <ServiceProviderContext.Provider value={{serviceP,setserviceP}}>
            {children}

        </ServiceProviderContext.Provider>
    )
}
export default ServiceProvider