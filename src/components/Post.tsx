import { useState, useEffect, ReactElement } from 'react'
import './Post.css';
import { Avatar, Button, Input } from '@material-ui/core';
import firebase from 'firebase'
import { db } from '../firebase/firebase'

export interface IPostProps {
    postId: string;
    imageSrc: string;
    userName: string;
    caption: string;
    timestamp: any;
    currentUserName?: string | null;
}

interface IComment {
    userName: string;
    text: string;
    timestamp: any;
}

function Post({ postId, imageSrc, userName, currentUserName, caption, timestamp }: IPostProps): ReactElement {

    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState('');

    // paging
    // @link https://firebase.google.com/docs/firestore/query-data/query-cursors

    useEffect(() => {
        // componentDidUpdate/Mount 
        // onSnapshot collection변화가 있을 때
        let unsubscribe: any;
        if (postId)
            unsubscribe = db.collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    // doc.id는 firebase 데이터
                    // doc.data() 는 안에 데이터 구조 가져옴
                    setComments(snapshot.docs.map(doc => doc.data() as IComment));
                });
        return () => {
            // componentWillUnmount
            unsubscribe();
        }
    }, [postId]) // 조건, posts 바뀔 때

    const handleCommentPost = () => {
        db.collection('posts').doc(postId).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userName: currentUserName,
            text: comment
        });
        setComment('');
    }

    return (
        <div className='post'>
            {/* header -> avatar + username */}
            <h3 className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Name'
                    src='' />
                {userName}</h3>
            {/* image */}
            <img className='post__image'
                src={imageSrc}
                alt=''
            ></img>
            {/* username + caption */}
            <div className='post__caption'>
                <strong>{userName} </strong> {caption}
            </div>
            {/* comments */}
            {comments.map(comment =>
                <div className='post__comment'>
                    <strong>{comment.userName} </strong> {comment.text}
                </div>)}
            <div className='post__inputComment'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input type='text' placeholder='Type in comments...' value={comment} onChange={(e) => setComment(e.target.value)}></Input>
                    <Button onClick={handleCommentPost}>POST</Button>
                </form>
            </div>
        </div>
    )
}

export default Post;