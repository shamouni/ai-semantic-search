import { render, screen } from "@testing-library/react";
import TextFormat from "../TextFormat";
import type { TSearchItem } from "../SemanticSearch";

describe("TextFormat component", () => {
  const mockResults: TSearchItem[] = [
    {
      id: "1",
      name: "Item One",
      description: "Desc 1",
      image: "/img1.jpg",
      score: 0.9,
    },
    {
      id: "2",
      name: "Item Two",
      description: "Desc 2",
      image: "/img2.jpg",
      score: 0.8,
    },
  ];

  it("renders all items correctly", () => {
    render(<TextFormat results={mockResults} />);

    const items = screen.getAllByText(/Item/);
    expect(items).toHaveLength(mockResults.length);

    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });
});
