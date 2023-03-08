import { createContext, useEffect, useState } from "react";
import * as userService from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children}) => {

    const [users, setUsers ] = useState([]);

    useEffect(() => {
        userService.getAll()
        .then(users => setUsers(users));
    }, []); 

    const addUser = (user) => {
        setUsers(oldUsers => [user ,...oldUsers])
    };

    const editUser = (user) => {
        setUsers(oldUsers => oldUsers.map(x => x._id === user._id ? user : x ));
    };

    const deleteUser = (userId) => {
        setUsers(oldUsers => oldUsers.filter(x => x._id !== userId));
    }

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    )
}