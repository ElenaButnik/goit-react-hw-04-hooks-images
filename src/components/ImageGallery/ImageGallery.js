import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImageAPI from "../services/pixabay";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import Title from "../Title/SolidTitle";
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default function ImageGallery({ pageScroll }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [imageArray, setImageArray] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [imageName, setimageName] = useState("");

  useEffect(() => {
    if (!imageName) {
      return;
    }

    ImageAPI.fetchImage(imageName, page, perPage)
      .then((data) => {
        if (data.hits.length > 0) {
          setImageArray((prev) => [...prev, ...data.hits]);
          setStatus("resolved");
          pageScroll();
        } else {
          setStatus("rejected");
        }
      })
      .catch((error) => {
        setStatus("rejected");
      });
  }, [imageName, page, perPage, pageScroll]);

  const handleClickBtn = () => {
    setPage((page) => page + 1);
    setStatus("pending");
  };

  const handleFormSubmit = (imageName) => {
    setimageName(imageName);
    setImageArray([]);
    setPage(1);
  };

  const toggleModal = () => setShowModal(!showModal);

  const onImageClick = (e) => {
    e.preventDefault();
    let src = e.target.src;
    setLargeImg(imageArray.find((el) => el.webformatURL === src));
    toggleModal();
  };

  const activeBtn = imageArray.length > 0 && imageArray.length / page === 12;

  return (
    <div>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {status === "idle" && <Title titleText="Please enter your query!" />}
      {status === "pending" && (
        <Loader
          className={s.Loader}
          type="Circles"
          color="#d5e215"
          height={100}
          width={100}
        />
      )}
      {status === "rejected" && (
        <h1>
          <Title titleText="Something was wrong please try again!" />
        </h1>
      )}
      <ul className={s.ImageGallery}>
        <ImageGalleryItem imageArray={imageArray} onImageClick={onImageClick} />
      </ul>
      {activeBtn && <Button handleClickBtn={handleClickBtn} />}
      {showModal && (
        <Modal toggleModal={toggleModal} largeImg={largeImg}></Modal>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.object,
  pageScroll: PropTypes.func,
};

// export default class ImageGallery extends Component {
//   state = {
//     page: 1,
//     perPage: 12,
//     imageArray: [],
//     error: null,
//     status: "idle",
//     showModal: false,
//     largeImg: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, perPage } = this.state;
//     const { imageName } = this.props;

//     if (prevProps.imageName !== imageName) {
//       this.setState({ imageArray: [], page: 1, status: "pending" });

//       ImageAPI.fetchImage(imageName, page, perPage)
//         .then((data) => {
//           if (data.hits.length > 0) {
//             this.setState({
//               imageArray: data.hits,
//               status: "resolved",
//             });
//             this.props.pageScroll();
//           } else {
//             this.setState({ status: "rejected" });
//           }
//         })

//         .catch((error) => {
//           this.setState({ status: "rejected" });
//         });
//     } else if  (prevState.page !== page && page !== 1) {
//       this.setState({ status: "pending" });
//       ImageAPI.fetchImage(imageName, page, perPage)
//         .then((data) => {
//           this.setState((prev) => ({
//             imageArray: [...prev.imageArray, ...data.hits],
//             status: "resolved",
//           }));
//           this.props.pageScroll();
//         })
//         .catch((error) => this.setState({ status: "rejected" }));
//     }
//   }

//   handleClickBtn = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//         status: "pending",
//       };
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   onImageClick = (e) => {
//     e.preventDefault();
//     let src = e.target.src;
//     this.setState({
//       largeImg: this.state.imageArray.find((el) => el.webformatURL === src),
//     });
//     this.toggleModal();
//   };

//   render() {
//     const { status, imageArray, showModal, largeImg, page } = this.state;
//     const activeBtn = imageArray.length > 0 && imageArray.length / page === 12;

//     return (
//       <div>
//         {status === "idle" && (
//           <div className={s.Query}>Please enter your query!</div>
//         )}
//         {status === "pending" && (
//           <Loader
//             className={s.Loader}
//             type="Circles"
//             color="#d5e215"
//             height={100}
//             width={100}
//           />
//         )}
//         {status === "rejected" && (
//           <h1 className={s.Query}>Something was wrong please try again!</h1>
//         )}
//         <ul className={s.ImageGallery}>
//           <ImageGalleryItem
//             imageArray={imageArray}
//             onImageClick={this.onImageClick}
//           />
//         </ul>
//         {activeBtn && <Button handleClickBtn={this.handleClickBtn} />}
//         {showModal && (
//           <Modal onClose={this.toggleModal} largeImg={largeImg}></Modal>
//         )}
//       </div>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   imageName: PropTypes.string,
//   pageScroll: PropTypes.func,
// };
