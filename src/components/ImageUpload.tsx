import { Button, Input } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { storage, db } from '../firebase/firebase';
import firebase from 'firebase';

interface Props {
    userName: string | null
}

function ImageUpload({ userName }: Props): ReactElement {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState<any>(null);

    // 파일 업로드 캐싱
    const handleChange = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        // storage에서 해당 위치에 image 파일 저장
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            // 업로드 상태를 계속 listening함
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setProgress(progress);
        },
            // error
            (err) => console.log(err)
            , () => {
                // complete
                // 방금 저장된 곳 images/이미지이름 url 가져옴
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // db imageSrc에 저장해줘야지
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            userName: userName,
                            imageSrc: url,
                            caption: caption
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className='imageUpload'>
            <progress value={progress} max='100'></progress>
            <Input placeholder='Enter a caption' type='text' onChange={(e => setCaption(e.target.value))}></Input>
            <Input type='file' onChange={handleChange}></Input>
            <Button onClick={handleUpload} >Upload</Button>
        </div>
    )
}

export default ImageUpload
