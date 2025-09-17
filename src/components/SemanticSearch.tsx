import { useState, type KeyboardEvent } from "react";
import "../assets/style.css";
import SearchIcon from "../assets/icon-search.svg";
import enterIcon from "../assets/enter-icon.png";

export type TSearchItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  score: number;
};

interface ISemanticSearchProps {
  children: React.ReactNode | false;
  apiQuery: (value: string) => void;
  clear: () => void;
}

const SemanticSearch = (props: ISemanticSearchProps) => {
  const { children, clear, apiQuery } = props;
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  const clearInput = () => {
    setQuery("");
    clear();
  };

  const onSearchClick = () => apiQuery(query);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyDown={onEnterPress}
          className="search-input"
        />
        {query && (
          <button className="clear-button" onClick={clearInput}>
            ×
          </button>
        )}
        <button onClick={onSearchClick} className="button-search">
          <img src={enterIcon} width={20} height={20} />
        </button>
      </div>

      {children}
    </div>
  );
};

export default SemanticSearch;
