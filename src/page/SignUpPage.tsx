import React, { ReactElement, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import StyledInput from '../components/StyledInput';
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
                {isSignUp && <StyledInput placeholder='Name' type='text' value={signUpUserName} onChange={(e) => setUserName(e.target.value)} />}
                <StyledInput placeholder='Email' type='text' value={signUpEmail} onChange={(e) => setEmail(e.target.value)} />
                <StyledInput placeholder='Password' type='password' value={signUpPassword} onChange={(e) => setPassword(e.target.value)} />
                {isSignUp
                    ? <button type='submit' onClick={signUp} disabled={signUpEmail.length === 0 || signUpUserName.length === 0 || signUpPassword.length === 0}> Sign Up</button>
                    : <button type='submit' onClick={signIn} disabled={signUpEmail.length === 0 || signUpPassword.length === 0}> Sign In</button>}
            </form>
                <div className='signUpPage__signUpContainer'>
                {isSignUp ? `Already have an account?` : `Don't have an account?`} <Link className='signUpPage__signUpText' to={isSignUp ? '/login' : '/signup'}>{isSignUp ? 'Sign In' : 'Sign Up'}</Link>
            </div>
        </div>
    )
}

export default SignUpPage
