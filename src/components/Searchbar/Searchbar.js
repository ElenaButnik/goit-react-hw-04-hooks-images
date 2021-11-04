import { useState } from "react";
import { ImSearch } from "react-icons/im";
import s from "./SearchBar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ handleFormSubmit }) {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (imageName.trim() === "") {
      alert("Пожалуйста введите ваш запрос");
      return;
    }
    handleFormSubmit(imageName);
    setImageName("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <ImSearch className={s.reactIcons} />
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func,
};
