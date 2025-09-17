import type { TSearchItem } from "./SemanticSearch";

function TextFormat({ results }: { results: TSearchItem[] }) {
  return (
    <div className="dropdown simple-dropdown">
      {results.map((item) => (
        <div key={item.id} className="dropdown-item">
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default TextFormat;
