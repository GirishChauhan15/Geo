import { createContext, useContext } from "react";

export const user = createContext({
    users:[{
        id:1,
        name:'lorem',
        image:"lorem",
        description:"lorem ipsum",
        address:{
            longitude:"12",
            latitude:"21",
            city:"ipsum",
            country:"lorem"
        },
    }],
    addUser : (user)=>{},
    updateUser: (id,user)=>{},
    deleteUser: (id)=>{}
})

export const useUser = () => {
    return useContext(user)
} 

export const UserProvider = user.Provider