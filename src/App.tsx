import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Post, { IPostProps } from './components/Post';
import firebase from 'firebase';
import { auth, db } from './firebase/firebase';
import ImageUpload from './components/ImageUpload';
import SignUp from './components/SignUp';

function App() {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [posts, setPosts] = useState<{ id: string, post: IPostProps }[]>([]);
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
  }, [user])
  // 
  useEffect(() => {
    // componentDidUpdate/Mount 
    // onSnapshot collection변화가 있을 때
    const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // doc.id는 firebase 데이터
      // doc.data() 는 안에 데이터 구조 가져옴
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data() as IPostProps
      })));

    });

    return () => {
      // componentWillUnmount
      unsubscribe();
    }
  }, [posts]) // 조건, posts 바뀔 때

  return (
    <div className="app">
      <SignUp open={openSignUpModal} setOpen={setOpenSignUpModal} />
      {/* Header */}
      <header className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        >
        </img>
        {user ? (<>
          <ImageUpload userName={user.displayName} ></ImageUpload>
          <Button onClick={() => auth.signOut()} >Logout</Button></>)
          : (<Button onClick={() => setOpenSignUpModal(true)} >Sign Up</Button>)}
      </header>
      {/* Posts */}
      <section className="app__postContainer">
        {posts.map(({ id, post }) =>
          // key로 리액트가 판별
          <Post key={id} postId={id} currentUserName={user?.displayName} imageSrc={post.imageSrc} userName={post.userName} caption={post.caption} timestamp={post.timestamp}></Post>
        )}
      </section>
    </div>
  );
}

export default App;
