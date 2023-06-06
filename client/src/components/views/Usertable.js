import React, { Component } from "react";

class UserTable extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            this.setState({ users: data.users });
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des utilisateurs", error);
        }
    };

    render() {
        const { users } = this.state;

        return (
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>last Name</th>
                    <th>Email</th>

                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default UserTable;
