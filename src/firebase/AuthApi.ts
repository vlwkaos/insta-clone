import { auth } from "./firebase";
import firebase from 'firebase'

export function subscribeToAuth(onLogin: (authUser: firebase.User) => void, onLogout:() => void) {
    return auth.onAuthStateChanged(authUser => {
        if (authUser) onLogin(authUser);
        else onLogout();
    })
}

export function logout() {
    auth.signOut();
}