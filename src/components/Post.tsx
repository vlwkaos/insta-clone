import { useState, useEffect, ReactElement, FormEvent } from 'react'
import { Avatar, Button, Input } from '@material-ui/core';
import { subscribeToPostCommentChange, createComment } from '../firebase/ContentApi';
import Comment, { CommentProps } from './Comment';
import './Post.css';
import StyledInput from './StyledInput';

export interface PostProps {
    postId: string;
    imageSrc: string;
    userName: string;
    caption: string;
    timestamp: any;
    currentUserName: string | null | undefined;
}

function Post({ postId, imageSrc, userName, currentUserName, caption, timestamp }: PostProps): ReactElement {

    const [comments, setComments] = useState<CommentProps[]>([]);
    const [comment, setComment] = useState('');

    // paging
    // @link https://firebase.google.com/docs/firestore/query-data/query-cursors

    useEffect(() => {
        let unsubscribe = subscribeToPostCommentChange(postId, snapshot => {
            setComments(snapshot.docs.map(doc => doc.data() as CommentProps));
            });
        return () => {
            unsubscribe();
        }
    }, [postId]) // 조건, posts 바뀔 때

    const handleCommentPost = (e: FormEvent) => {
        e.preventDefault();
        if (currentUserName) createComment(postId, currentUserName, comment);
        setComment('');
    }

    return (
        <div className='post'>
            {/* header -> avatar + username */}
            <h3 className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt={userName}
                    src='' />
                {userName}</h3>
            {/* image */}
            <img className='post__image'
                src={imageSrc}
                alt=''
                width='540'
                height='540'
            ></img>
            {/* username + caption */}
            <div className='post__caption'>
                <Comment userName={userName} text={caption} timestamp={timestamp} />
            </div>
            {/* comments */}
            <div className='post__commentContainer'>
                {comments.map(({ userName, text, timestamp }, i) => <Comment key={i} userName={userName} text={text} timestamp={timestamp} />)}
            </div>
            {currentUserName &&
                <div className='post__inputComment'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <StyledInput type='text' placeholder='Type in comments...' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type='submit' onClick={handleCommentPost} disabled={!comment}>Post</button>
                </form>
            </div>}
        </div>
    )
}

export default Post;