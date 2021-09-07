import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Data from '../../Data';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';
import { updateAccount } from '../user/userAccManage/userAccSlice';

const ImageUploader = ({ purpose, toggleHeaderUploader, toggleProfileUploader }) => {
  const CLOUDINARY_UPLOAD_PRESET = 'x0qt5efx';
  const CLOUDINARY_CLOUD_NAME = 'skoms-cloud';
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/skoms-cloud/image/upload';

  const user = useSelector(selectAuthenticatedUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const data = new Data();

  const [image, setImage] = useState('');

  const onImageSelected = (e) => {
    setImage(e.target.files[0]);
  }
  const uploadImage = async () => {
    const formData = new FormData()

    formData.append("file", image)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME)

    const response = await fetch(CLOUDINARY_UPLOAD_URL, { method:"post", body: formData })
      .then(res => res.json())
      .then(data => data.url)
      .catch(err => console.log(err))

    if (response) {
      const updatedData = {
        [`${purpose}ImgURL`]: response
      }
      await data.updateUser(user.id, updatedData, user)
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
    <div className="upload-popup" onClick={ purpose === 'header' ? toggleHeaderUploader : toggleProfileUploader }>
      <div className='image-uploader-div'>
        <h2>{ purpose === 'header' ? 'Header Image' : 'Profile Image' }</h2>
        <input type="file" name="file-input" id="file-input" multiple={false} onChange={onImageSelected}/>
        <button className='button-primary' onClick={uploadImage}>Upload</button>
      </div>
    </div>
  )
}

export default ImageUploader
