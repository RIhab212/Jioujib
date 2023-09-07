import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./usert.css"
import { Scrollbars } from 'react-custom-scrollbars';

const Usertable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://jiujib.onrender.com/api/users");
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("An error occurred while fetching users", error);
        }
    };

    return (
        <div className="table-container">
        <div className='sidebar-admin'>
            <Navbar/>
            <div className="table">
            <div className="table-wrapper">
                <h1 className="H">Users List</h1>
                <Scrollbars className="scrollbars-custom" style={{ width: '100%', height: 'calc(100vh - 150px)' }}>                    <table>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Scrollbars>
            </div>
        </div>
        </div>
        </div>
    );
};

export default Usertable;
