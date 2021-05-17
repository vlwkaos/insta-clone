import React, { ReactElement, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import './SignUpPage.css';
interface Props {
    isSignUp?: boolean
}

function SignUpPage({ isSignUp }: Props): ReactElement {
    const history = useHistory();
    // signup
    const [signUpEmail, setEmail] = useState('');
    const [signUpUserName, setUserName] = useState('');
    const [signUpPassword, setPassword] = useState('');

    const signUp = (e: React.FormEvent) => {
        e.preventDefault()
        if (signUpEmail.length === 0 || signUpPassword.length === 0) return;
        auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
            .then((authUser) => authUser.user?.updateProfile({ displayName: signUpUserName }))
            .catch((error: Error) => alert(error.message));
        //
        history.push('/');
    }


    const signIn = (e: React.FormEvent) => {
        e.preventDefault()
        if (signUpEmail.length === 0 || signUpPassword.length === 0) return;
        auth.signInWithEmailAndPassword(signUpEmail, signUpPassword)
            .catch((error: Error) => alert(error.message));

        history.push('/');
    }

    return (
        <div className='signUpPage'>
            <form className='signUpPage__form'>
                <img
                    className="signUpPage__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                    alt=""
                />
                {isSignUp && <input placeholder='Name' type='text' value={signUpUserName} onChange={(e) => setUserName(e.target.value)}></input>}
                <input placeholder='Email' type='text' value={signUpEmail} onChange={(e) => setEmail(e.target.value)}></input>
                <input placeholder='Password' type='password' value={signUpPassword} onChange={(e) => setPassword(e.target.value)}></input>
                {isSignUp
                    ? <button type='submit' onClick={signUp}> Sign Up</button>
                    : <button type='submit' onClick={signIn}> Sign In</button>}
            </form>
            {!isSignUp &&
                <div className='signUpPage__signUpContainer'>
                    Don't have an account? <Link className='signUpPage__signUpText' to='/signup'>Sign Up</Link>
                </div>}
        </div>
    )
}

export default SignUpPage
