import { render, screen } from "@testing-library/react";
import ProductFormat from "../ProductFormat";
import type { TSearchItem } from "../SemanticSearch";

describe("ProductFormat component", () => {
  const mockResults: TSearchItem[] = [
    {
      id: "1",
      name: "Product One",
      description: "Description 1",
      image: "/image1.jpg",
      score: 0.9123,
    },
    {
      id: "2",
      name: "Product Two",
      description: "Description 2",
      image: "/image2.jpg",
      score: 0.8456,
    },
  ];

  it("renders all items correctly", () => {
    render(<ProductFormat results={mockResults} />);

    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(mockResults.length);

    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(
      screen.getByText("semantic score match: 0.9123")
    ).toBeInTheDocument();

    expect(screen.getByText("Product Two")).toBeInTheDocument();
    expect(
      screen.getByText("semantic score match: 0.8456")
    ).toBeInTheDocument();
  });
});
