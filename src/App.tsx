import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([
    {
      userName: 'UserName01',
      caption: 'first ever post',
      imageSrc: ''
    }
  ]);

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
          <Post key={i} imageSrc={post.imageSrc} userName={post.userName} caption={post.caption}></Post>
        )}
      </section>
    </div>
  );
}

export default App;
