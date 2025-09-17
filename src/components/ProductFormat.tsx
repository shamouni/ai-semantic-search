import type { TSearchItem } from "./SemanticSearch";

function ProductFormat({ results }: { results: TSearchItem[] }) {
  return (
    <div className="dropdown">
      <div className="search-cards">
        {results.map((item) => (
          <div key={item.id} className="dropdown-card">
            <div className="box">
              <img src={item.image} />
              <h5>{item.name}</h5>
              <h6>semantic score match: {item.score.toFixed(4)}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFormat;
