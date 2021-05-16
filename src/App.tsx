import React, { useEffect, useState } from 'react';
import './App.css';
import Post, { PostProps } from './components/Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState<PostProps[]>([]);

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

  return (
    <div className="app">
      {/* Header */}
      <header className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        >
        </img>

      </header>
      {/* Posts */}
      <section className="app_postContainer">
        {posts.map((post, i) =>
          // key로 리액트가 판별
          <Post key={i} imageSrc={post.imageSrc} userName={post.userName} caption={post.caption}></Post>
        )}
      </section>
    </div>
  );
}

export default App;
