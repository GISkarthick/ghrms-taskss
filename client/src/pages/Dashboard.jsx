import React from 'react';

export const Dashboard = () => {

    return (
        <div className="container-fluid">
            <h1>Home</h1>
            <p>You're logged in with React & JWT!!</p>
            {/* <p>Your role is: <strong>{currentUser.role}</strong>.</p> */}
            <p>This page can be accessed by all authenticated users.</p>
            <p> Logout</p>
            {/* <div>
                Current user from secure api end point:
                {userFromApi &&
                    <ul>
                        <li>{userFromApi.firstName} {userFromApi.lastName}</li>
                    </ul>
                }
            </div> */}
        </div>
    );
}
