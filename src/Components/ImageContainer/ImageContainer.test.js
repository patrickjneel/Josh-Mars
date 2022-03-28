import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";

import ImageContainer from "./index";

describe("Image Container Tests", () => {
  test("Should render basic elements", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/rover/spirit" }]}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ImageContainer />
        </LocalizationProvider>
      </MemoryRouter>
    );
    const roverName = screen.getByText("SPIRIT Rover");
    const datePicker = screen.getByLabelText("Select Date");
    const submitBtn = screen.getByText("Submit");
    const currentDate = screen.getByText(format(new Date(), "MM-dd-yyyy"));

    expect(roverName).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(currentDate).toBeInTheDocument();
  });

  test("should show error when selected date is after current date", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/rover/spirit" }]}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ImageContainer />
        </LocalizationProvider>
      </MemoryRouter>
    );
    const datePicker = screen.getByLabelText("Select Date");
    fireEvent.change(datePicker, { target: { value: "2025-01-01" } });
    waitFor(() => {
      expect(
        screen.getByText(
          `Please Select a Date Earlier Than ${format(
            new Date(),
            "MM-dd-yyyy"
          )}`
        )
      ).toBeInTheDocument();
    });
  });

  test("should show error when selected date is before landing date", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/rover/spirit" }]}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ImageContainer />
        </LocalizationProvider>
      </MemoryRouter>
    );
    const datePicker = screen.getByLabelText("Select Date");
    fireEvent.change(datePicker, { target: { value: "1999-01-01" } });
    waitFor(() => {
      expect(
        screen.getByText("Please Select a Date Earlier Than 03-28-2022")
      ).toBeInTheDocument();
    });
  });
});
