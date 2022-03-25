import "./App.css";
import Header from "./Components/Header";
import RoverContainer from "./Components/RoverContainer";

const App = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <RoverContainer />
      </div>
    </div>
  );
};

export default App;
