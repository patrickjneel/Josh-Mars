import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import RoverContainer from "./Components/RoverContainer";
import ImageContainer from "./Components/ImageContainer";

const App = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<RoverContainer />} />
          <Route path="/rover/:name" element={<ImageContainer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
