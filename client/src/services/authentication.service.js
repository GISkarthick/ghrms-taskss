
import {baseUrl} from '../config';
import { httpServices } from "./httpServices";


export const authenticationService = {
    login,
    logout
};

function login (data){
    let Email = data.Email;
    let Password =  data.Password;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email, Password })
    };

    let params = JSON.stringify({ Email, Password });
    return httpServices.post(`${baseUrl}users/login`, data).then(resp => {
        console.log(resp);
        setUserSession(resp.token, resp.user, resp.key);
        return resp;
    });

}

function logout() {
    localStorage.removeItem('currentUser');
}

const setUserSession = (token, user, key) => {
    
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('key', key);
  }