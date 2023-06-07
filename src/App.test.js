import React, { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios"); // This overwrites axios methods with jest Mock

test.skip("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
