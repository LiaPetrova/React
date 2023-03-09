import { createContext, useEffect, useState } from "react";
import * as userService from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children}) => {

    const [users, setUsers ] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);


    const [filters, setFilters] = useState({
        text: '',
        criteria: 'all'
    });
    useEffect(() => {
        userService.getAll()
        .then(users => {
            setUsers(users);
            setFilteredUsers(users);
        });
    }, []); 

    const addUser = (user) => {
        setUsers(oldUsers => [user ,...oldUsers])
    };

    const editUser = (user) => {
        setUsers(oldUsers => oldUsers.map(x => x._id === user._id ? user : x ));
    };

    const deleteUser = (userId) => {
        setUsers(oldUsers => oldUsers.filter(x => x._id !== userId));
    };

    const filterUsers = (text, criteria = 'all') => {
        if(criteria === 'all') {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(x => x[criteria].toLowerCase().includes(text.toLowerCase())));
        }
    };

    return (
        <UserContext.Provider value={{ users: filteredUsers, addUser, editUser, deleteUser, filterUsers }}>
            {children}
        </UserContext.Provider>
    )
}