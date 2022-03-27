import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App Tests", () => {
  test("should render rover page by default", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const roverPage = screen.getByText("Mars Rovers");
    expect(roverPage).toBeInTheDocument();
  });
});
