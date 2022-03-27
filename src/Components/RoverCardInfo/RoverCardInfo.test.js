import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RoverCardInfo from "./index";

const mockNavigateToDetails = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigateToDetails,
}));

describe("Rover Card Info Tests", () => {
  const roverCardProps = {
    name: "spirit",
    launchDate: "2003-12-03",
    landingDate: "2004-12-11",
    totalPhotos: 10000,
    cameras: [
      { full_name: "Front Hazard Avoidance Camera" },
      { full_name: "Mast Camera" },
    ],
  };

  test("should render correct rover info", () => {
    render(
      <Router>
        <RoverCardInfo {...roverCardProps} />
      </Router>
    );
    const name = screen.getByText("spirit");
    const launchDate = screen.getByText("Tue Dec 02 2003");
    const landingDate = screen.getByText("Fri Dec 10 2004");
    const totalPhotos = screen.getByText("10,000");
    const camera1 = screen.getByText("Front Hazard Avoidance Camera");
    const camera2 = screen.getByText("Mast Camera");
    const linkButton = screen.getByText("Link to Rover Images");

    expect(name).toBeInTheDocument();
    expect(launchDate).toBeInTheDocument();
    expect(landingDate).toBeInTheDocument();
    expect(totalPhotos).toBeInTheDocument();
    expect(camera1).toBeInTheDocument();
    expect(camera2).toBeInTheDocument();
    expect(linkButton).toBeInTheDocument();
  });

  test("should call navigate with correct rover name", () => {
    render(
      <Router>
        <RoverCardInfo {...roverCardProps} />
      </Router>
    );

    const linkButton = screen.getByText("Link to Rover Images");
    fireEvent.click(linkButton);
    expect(mockNavigateToDetails).toBeCalled();
    expect(mockNavigateToDetails).toHaveBeenCalledWith("/rover/spirit");
  });

  test("should navigate to rover images page when clicked", () => {
    render(
      <Router>
        <RoverCardInfo {...roverCardProps} />
      </Router>
    );

    const linkButton = screen.getByText("Link to Rover Images");
    expect(screen.queryByText("SPIRIT Rover")).toBeFalsy();
    fireEvent.click(linkButton);
    waitFor(() => {
      expect(screen.getByText("SPIRIT Rover")).toBeInTheDocument();
    });
  });
});
