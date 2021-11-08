import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";

export default function App(imageName) {
  const pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <ImageGallery imageName={imageName} pageScroll={pageScroll} />
    </div>
  );
}
