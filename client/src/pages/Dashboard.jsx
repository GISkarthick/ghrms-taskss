import React from 'react';
import {LeftLayout} from '../components'
import { authenticationService } from "../services";

export const Dashboard = () => {

    const LogoutPage = () => {
        authenticationService.logout();
    }

    return (
            <div className="row login_block dashboard_page">

                <LeftLayout />
                <div className="login_right col-md-7">
                    <h1>Home</h1>
                    <p>You're logged in with React & JWT!!</p>
                    {/* <p>Your role is: <strong>{currentUser.role}</strong>.</p> */}
                    <p>This page can be accessed by all authenticated users.</p>
                    <button className="btn btn-default float-right" onClick={LogoutPage}>Signout</button>
                </div>
            </div>
    );
}
