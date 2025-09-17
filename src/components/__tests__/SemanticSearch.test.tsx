import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SemanticSearch from "../SemanticSearch";

describe("SemanticSearch Component", () => {
  it("renders input and search button", () => {
    render(
      <SemanticSearch apiQuery={vi.fn()} clear={vi.fn()}>
        <div>Child Content</div>
      </SemanticSearch>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("calls apiQuery when search button is clicked", async () => {
    const apiQueryMock = vi.fn();

    render(<SemanticSearch apiQuery={apiQueryMock} clear={vi.fn()} children />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "football");

    const button = screen.getByRole("button", { name: "" });
    await userEvent.click(button);

    expect(apiQueryMock).toHaveBeenCalledWith("football");
  });

  it("calls apiQuery when pressing Enter key", async () => {
    const apiQueryMock = vi.fn();

    render(<SemanticSearch apiQuery={apiQueryMock} clear={vi.fn()} children />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "basketball{enter}");

    expect(apiQueryMock).toHaveBeenCalledWith("basketball");
  });

  it("shows clear button when typing and clears input when clicked", async () => {
    const clearMock = vi.fn();

    render(<SemanticSearch apiQuery={vi.fn()} clear={clearMock} children />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "hello");

    const clearButton = screen.getByRole("button", { name: "×" });
    expect(clearButton).toBeInTheDocument();

    await userEvent.click(clearButton);

    expect(clearMock).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });
});
