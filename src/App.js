import "./App.css";
import { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

export default function App() {
  const [imageName, setimageName] = useState("");

  const handleFormSubmit = (imageName) => {
    setimageName(imageName);
  };

  const pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} pageScroll={pageScroll} />
    </div>
  );
}
