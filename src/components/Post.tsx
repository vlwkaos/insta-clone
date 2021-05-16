import { useState, useEffect, ReactElement, FormEvent } from 'react'
import './Post.css';
import { Avatar, Button, Input } from '@material-ui/core';
import { listenPostCommentChange, createComment } from '../firebase/ContentApi';

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
        let unsubscribe: any;
        if (postId)
            unsubscribe = listenPostCommentChange(postId, snapshot => {
                setComments(snapshot.docs.map(doc => doc.data() as IComment));
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
            ></img>
            {/* username + caption */}
            <div className='post__caption'>
                <strong>{userName} </strong> {caption}
            </div>
            {/* comments */}
            <div className="post_commentContainer">
            {comments.map(comment =>
                <div className='post__comment'>
                    <strong>{comment.userName} </strong> {comment.text}
                </div>)}
            </div>
            {currentUserName &&
                <div className='post__inputComment'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input type='text' placeholder='Type in comments...' value={comment} onChange={(e) => setComment(e.target.value)}></Input>
                    <Button type='submit' onClick={handleCommentPost} disabled={!comment}>Post</Button>
                </form>
            </div>}
        </div>
    )
}

export default Post;