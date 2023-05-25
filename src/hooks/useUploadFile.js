import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const useUploadFile = (file, path = '') => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, path + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {
          setIsLoading(true);
        },
        (error) => {
          setUploadError(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadUrl(downloadURL);

          setIsLoading(false);
        }
      );
    };

    file && uploadFile();
  }, [file, path]);

  return { isLoading, uploadError, downloadUrl };
};

export default useUploadFile;
