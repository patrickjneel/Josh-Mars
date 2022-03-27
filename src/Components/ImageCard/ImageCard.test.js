import { render, screen } from "@testing-library/react";

import ImageCard from "./index";

describe("Image Card Tests", () => {
  const imageCardProps = {
    image: "https://wwww.image.rover/spirit",
  };

  test("should have correct props", () => {
    render(<ImageCard {...imageCardProps} />);
    const image = screen.getByAltText("rover");

    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://wwww.image.rover/spirit");
  });
});
