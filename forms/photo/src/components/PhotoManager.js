import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Компонент кнопка для загрузки фото
 * 
 * @param {onAddPhoto} onAddPhoto Callback выбора файлов 
 * @returns 
 */
const PhotoInput = ({ onAddPhoto }) => (
  <div className="photo-input">
    <input
      type="file"
      name="files"
      multiple={true}
      accept="image/*"
      onChange={onAddPhoto}
    />
    <div className="btn">Click to select</div>
  </div>
);
PhotoInput.propTypes = {
  onAddPhoto: PropTypes.func.isRequired
};

/**
 * Компонент отображения выбранных фото
 * 
 * @param {items} items список фото
 * @param {onDeleteItem} onDeleteItem Callback удаления записи из списка
 * @returns 
 */
const PhotoList = ({ items = [], onDeleteItem }) => (
  <div className="photo-container">
    {items.map(photo => (
      <div key={photo.id} className="photo-item">
        <img src={photo.data} />
        <span onClick={() => onDeleteItem(photo.id)} className="btn-remove">
          &#10006;
        </span>
      </div>
    ))}
  </div>
);
PhotoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired
  })),
  onDeleteItem: PropTypes.func.isRequired
};

// Заготовка из задания
const fileToDataUrl = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', evt => {
      resolve(evt.currentTarget.result);
    });

    fileReader.addEventListener('error', evt => {
      reject(new Error(evt.currentTarget.error));
    });

    fileReader.readAsDataURL(file);
  });
}

// Заготовка из задания
const handleSelect = async (evt) => {
  const files = [...evt.target.files];
  const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
  // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
  return urls.map(url => ({
    id: crypto.randomUUID(),
    data: url
  }));
}

/**
 * Компонент "Менеджер фото"
 */
const PhotoManager = () => {
  const [photos, setPhotos] = useState([]);

  const handleSelectPhotos = evt =>
    handleSelect(evt).then(newPhotos =>
      setPhotos(prevPhotos => prevPhotos.concat(newPhotos))
    );

  const handleRemovePhoto = photoId =>
    setPhotos(prevPhotos => prevPhotos.filter(photo => photoId !== photo.id));

  return (
    <div className="photo-manager">
      <PhotoInput onAddPhoto={handleSelectPhotos} />
      <PhotoList items={photos} onDeleteItem={handleRemovePhoto} />
    </div>
  );
};

export default PhotoManager;