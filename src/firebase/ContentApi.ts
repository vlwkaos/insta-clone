import { db, storage } from "./firebase";
import firebase from 'firebase'

export function subscribeToPostChange(onChangePost: (snapshot: firebase.firestore.QuerySnapshot) => void) {
    return db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        onChangePost(snapshot);
    })
}

function createPost(userName: string, caption: string, imageUrl: string) {
    // db post 생성
    db.collection('posts').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userName: userName,
        imageSrc: imageUrl,
        caption: caption
    });
}

export function subscribeToUploadProgress(userName: string, image: any, caption: string, onChangeProgress: (snapshot: firebase.storage.UploadTaskSnapshot) => void, onCompleteUpload: () => void) {
    
        // storage에서 해당 위치에 image 파일 저장
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',  
            // 업로드 상태를 계속 listening함
            onChangeProgress,
            // error
            (err) => console.log(err), 
            // complete fire store
            () => {
                // complete
                // 방금 저장된 곳 images/이미지이름 url 가져옴
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        createPost(userName, caption, url);
                        onCompleteUpload();
                    })
            }
        )
}

export function subscribeToPostCommentChange(postId: string, onChangeComments: (snapshot: firebase.firestore.QuerySnapshot) => void) {
           return db.collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(onChangeComments);
}

export function createComment(postId: string, currentUserName: string, comment: string) {
    db.collection('posts').doc(postId).collection('comments').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userName: currentUserName,
        text: comment
    });
}