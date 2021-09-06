import React, { useState } from 'react'

const ImageUploader = () => {
  const CLOUDINARY_UPLOAD_PRESET = 'x0qt5efx';
  const CLOUDINARY_CLOUD_NAME = 'skoms-cloud';
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/skoms-cloud/image/upload';
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const onImageSelected = (e) => {
    setImage(e.target.files[0]);
  }
  const uploadImage = async () => {
    const data = new FormData()

    data.append("file", image)
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME)

    fetch(CLOUDINARY_UPLOAD_URL, { method:"post", body: data })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => console.log(err))
    }
  return (
    <div className='image-uploader-div'>
      <input type="file" name="file-input" id="file-input" multiple={false} onChange={onImageSelected}/>
      <button onClick={uploadImage}>Upload</button>
      <p>Click to select an image to upload.</p>
    </div>
  )
}

export default ImageUploader
