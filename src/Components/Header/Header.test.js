import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "./index";

const mockNavigateToMain = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigateToMain,
}));

describe("Header Tests", () => {
  test("should navigate back to main page when clicked", () => {
    render(
      <Router initialEntries={[{ pathname: "/rover/spirit" }]}>
        <Header />
      </Router>
    );
    const logoBtn = screen.getByTestId("josh-logo");
    expect(screen.queryByText("Mars Rovers")).toBeFalsy();
    fireEvent.click(logoBtn);
    waitFor(() => {
      expect(screen.getByText("Mars Rovers")).toBeInTheDocument();
    });
  });
});
