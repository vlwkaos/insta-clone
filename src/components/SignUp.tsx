import { Button, Input, Modal } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { auth } from '../firebase/firebase';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function SignUp({ open, setOpen }: Props): ReactElement {
    // signup
    const [signUpEmail, setEmail] = useState('');
    const [signUpUserName, setUserName] = useState('');
    const [signUpPassword, setPassword] = useState('');

    const signUp = (e: React.FormEvent) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
            .then((authUser) => authUser.user?.updateProfile({ displayName: signUpUserName }))
            .catch((error: Error) => alert(error.message));

        setOpen(false);
    }


    const signIn = (e: React.FormEvent) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(signUpEmail, signUpPassword)
            .catch((error: Error) => alert(error.message));

        setOpen(false);
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)} >
            <form className='app__modalSignUp'>
                Sign Up
          <Input placeholder='userName' type='text' value={signUpUserName} onChange={(e) => setUserName(e.target.value)}></Input>
                <Input placeholder='email' type='text' value={signUpEmail} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input placeholder='password' type='password' value={signUpPassword} onChange={(e) => setPassword(e.target.value)}></Input>
                <Button type='submit' onClick={signUp}> Sign Up</Button>
                <Button type='submit' onClick={signIn}> Sign In</Button>
            </form>

        </Modal>
    )
}

export default SignUp
