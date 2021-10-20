import React, { useState } from 'react'
import styles from './ImageUploader.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Data from '../../utils/helpers/Data';
import TypedButton from '../typedButton/TypedButton';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';
import { updateAccount } from '../user/userAccManage/userAccSlice';
const crypto = require('crypto');
const dictionary = require('../../.secret/dictionary.json');


const ImageUploader = ({ purpose, toggleHeaderUploader, toggleProfileUploader }) => {
  const user = useSelector(selectAuthenticatedUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const data = new Data();

  const [image, setImage] = useState('');

  const onImageSelected = (e) => {
    setImage(e.target.files[0]);
  }
  const uploadImage = async () => {
    const formData = new FormData();

    const upload_preset = purpose === 'header' ? 'header' : 'profile';
    const publicId = `${user.id}_${purpose === 'header' ? 'header' : 'profile'}`;
    const timestamp = Math.floor(Date.now() / 1000);

    formData.append('file', image)
    formData.append('api_key', dictionary.API_KEY)
    formData.append('cloud_name', dictionary.CLOUD_NAME)
    formData.append('public_id', publicId)
    formData.append('timestamp', timestamp)
    formData.append('upload_preset', upload_preset)

    // generate shaSignature for cloudinary
    const shaSignature = crypto.createHash('sha1');
    shaSignature.update(`public_id=${publicId}&timestamp=${timestamp}&upload_preset=${upload_preset}${dictionary.SECRET}`);

    formData.append('signature', shaSignature.digest('hex'))

    const response = await fetch(dictionary.UPLOAD_URL, { method:"post", body: formData })
      .then(res => res.json())
      .then(data => data.url)
      .catch(err => console.log(err))

    if (response) {
      const updatedData = {
        [`${purpose}ImgURL`]: response
      }

      await data.updateUser( `img/${purpose}`, user.id, updatedData, user)
        .then(res => {
          if (res.status === 204) {
            dispatch(updateAccount({ ...user, ...updatedData }));
            purpose === 'header' && toggleHeaderUploader();
            purpose === 'profile' && toggleProfileUploader();
          } else {
            history.push('/forbidden');
          }
        })
        .catch((err) => {
          console.log(err);
          history.push('/error');
        });
    }
  }
  return (
    <div
      className={styles.container}
      data-value='upload-popup'
      onClick={ 
        purpose === 'header' ? 
          toggleHeaderUploader 
        : 
          toggleProfileUploader 
      }
    >
      <div className={styles.uploader}>
        <h2 className={styles.title}>
          { purpose === 'header' ?
              'Header Image'
            : 
              'Profile Image' 
          }
        </h2>
        <input
          type="file"
          name="file-input"
          id="file-input"
          multiple={false}
          onChange={onImageSelected}
        />
        <TypedButton 
          buttontype='primary'
          className={styles.button}
          onClick={uploadImage}
          content='Upload'
        />
      </div>
    </div>
  )
}

export default ImageUploader
