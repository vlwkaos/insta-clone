import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './ContentPage.css';
import Post, { IPostProps } from '../components/Post';
import firebase from 'firebase';
import { listenPostChange } from '../firebase/ContentApi';
import ImageUpload from '../components/ImageUpload';
import { listenAuth, logout } from '../firebase/AuthApi';
import { Link } from 'react-router-dom';

function ContentPage() {
    const [posts, setPosts] = useState<{ id: string, post: IPostProps }[]>([]);
    // auth
    const [user, setUser] = useState<firebase.User | null>(null);

    // 유저 상태 갱신
    useEffect(() => {
        // user바뀔 때
        const unsubscribe = listenAuth((authUser) => setUser(authUser), () => setUser(null));
        return () => {
            unsubscribe(); // detach backend listener 
        }
    }, [])

    // 게시글 갱신
    useEffect(() => {
        const unsubscribe = listenPostChange(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, // doc.id는 firebase 데이터
                post: doc.data() as IPostProps // doc.data() 는 안에 데이터 구조 가져옴
            })));
        });

        return () => {
            unsubscribe();
        }
    }, []) // 조건, posts 바뀔 때

    return (
        <div className="contentPage">
            {/* Header */}
            <header className="contentPage__header">
                <img
                    className="contentPage__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                    alt=""
                >
                </img>
                {user ? (<>
                    <button className='contentPage__buttonLogout' onClick={logout} >Logout</button></>)
                    : (<div className='contentPage__buttons'>
                        <Link className='contentPage__buttonLogin' to='/login' >Login</Link>
                        <Link className='contentPage__buttonSignUp' to='/signup' >Sign Up</Link>
                    </div>)}
            </header>
            {/* Posts */}
            <section className="contentPage__postContainer">
                {posts.map(({ id, post }) =>
                    // key로 리액트가 판별
                    <Post key={id} postId={id} currentUserName={user?.displayName} imageSrc={post.imageSrc} userName={post.userName} caption={post.caption} timestamp={post.timestamp}></Post>
                )}
            </section>

            {user ? <ImageUpload userName={user.displayName} />
                : <div className='imageUpload__loginRequired'>Login to upload a photo</div>}
        </div>
    );
}

export default ContentPage;
