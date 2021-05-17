import { Button, Input } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { listenUploadProgress } from '../firebase/ContentApi';
import './ImageUpload.css';

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
        if (userName != null && image != null)
            listenUploadProgress(userName, image, caption, (snapshot) => {
            // 업로드 상태를 계속 listening함
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setProgress(progress);
            }, () => {
                setProgress(0);
                setCaption('');
                setImage(null);
            })
    };


    return (
        <div className='imageUpload'>
            <Input placeholder='Enter a caption' type='text' onChange={(e => setCaption(e.target.value))}></Input>
            <Input type='file' onChange={handleChange}></Input>
            <progress value={progress} max='100'></progress>
            <Button onClick={handleUpload} >post</Button>
        </div>
    )
}

export default ImageUpload
