import { useState } from "react";
import SemanticSearch, { type TSearchItem } from "./components/SemanticSearch";
import ProductFormat from "./components/ProductFormat";
// import TextFormat from "./components/TextFormat";

const App: React.FC = () => {
  const [results, setResults] = useState<TSearchItem[]>([]);

  const handleSearch = async (query: string) => {
    const res = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data: TSearchItem[] = await res.json();
    const filtered =
      data.constructor === Array ? data.filter((f) => f.score > 0.2) : [];
    setResults(filtered);
  };

  const clear = () => setResults([]);

  return (
    <div className="search-wrapper">
      <div className="bg-cover" />
      <SemanticSearch apiQuery={handleSearch} clear={clear}>
        <ProductFormat results={results} />
        {/* <TextFormat results={results} /> */}
      </SemanticSearch>
    </div>
  );
};

export default App;
