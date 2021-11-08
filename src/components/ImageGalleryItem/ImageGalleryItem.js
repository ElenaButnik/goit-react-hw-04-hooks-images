import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ imageArray, onImageClick }) {
  return imageArray.map((image) => (
    <li className={s.ImageGalleryItem} key={image.id}>
      <img
        src={image.webformatURL}
        alt={image.tag}
        className={s.ImageGalleryItemImage}
        onClick={onImageClick}
      />
    </li>
  ));
}

ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func,
  imageArray: PropTypes.array,
};
