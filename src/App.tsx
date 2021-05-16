import { Button, Input, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import Post, { PostProps } from './components/Post';
import firebase from 'firebase';
import { auth, db } from './firebase';

function App() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [open, setSignUpOpen] = useState(false);
  // signup
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // auth
  const [user, setUser] = useState<firebase.User | null>(null);

  // user/userName바뀔 때
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        setUser(authUser);

      } else {
        // user has logged out
        setUser(null);
      }
    })
    return () => {
      unsubscribe(); // detach backend listener
    }
  }, [user, userName])
  // 
  useEffect(() => {
    // componentDidUpdate/Mount 
    // onSnapshot collection변화가 있을 때
    db.collection('posts').onSnapshot(snapshot => {
      // doc.id는 firebase 데이터
      // doc.data() 는 안에 데이터 구조 가져옴
      setPosts(snapshot.docs.map(doc => doc.data() as PostProps))

    });

    return () => {
      // componentWillUnmount
    }
  }, [posts]) // 조건, posts 바뀔 때

  const signUp = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: validation/sanitize...
    // 이렇게 하면 유저 생성됨
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => authUser.user?.updateProfile({ displayName: userName }))
      .catch((error: Error) => alert(error.message));

    setSignUpOpen(false);
  }

  const signIn = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: validation/sanitize...
    // 이렇게 하면 유저 생성됨
    auth.signInWithEmailAndPassword(email, password)
      .catch((error: Error) => alert(error.message));

    setSignUpOpen(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setSignUpOpen(false)}
      >
        <form className='app__modalSignUp'>
          Sign Up
          <Input placeholder='userName' type='text' value={userName} onChange={(e) => setUserName(e.target.value)}></Input>
          <Input placeholder='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
          <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
          <Button onClick={signUp}> Sign Up</Button>
          <Button onClick={signIn}> Sign In</Button>
        </form>

      </Modal>
      {/* Header */}
      <header className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        >
        </img>
        {user ? (
          <Button onClick={() => auth.signOut()} >Logout</Button>)
          : (<Button onClick={() => setSignUpOpen(true)} >Sign Up</Button>)}
      </header>
      {/* Posts */}
      <section className="app__postContainer">
        {posts.map((post, i) =>
          // key로 리액트가 판별
          <Post key={i} imageSrc={post.imageSrc} userName={post.userName} caption={post.caption}></Post>
        )}
      </section>
    </div>
  );
}

export default App;
