import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import MyComponent from "./components/MyComponent";
import HelloPerson from "./components/HelloPerson";
import Rectangle from "./components/Rectangle";
import RandomImage from "./components/RandomImage";
import Counter from "./components/Counter";
import ProfileCard from "./components/exercises/profileCard/ProfileCard";
import Game from "./components/TicTacToe";

function App() {

  return (
    <>
      <Game />

      <HelloPerson firstname="Jesse" lastname="Schollitt" />

      <Rectangle width={100} height={100} colour="red" />
      <Rectangle width={200} height={100} colour="red" />
      <Rectangle width={300} height={100} colour="red" />
      <Rectangle width={400} height={100} colour="red" />

      <RandomImage width={400} height={400} />
      <MyComponent />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World!</h1>
      <Counter />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ProfileCard name="John Doe" job="Software Developer" imgSize={200} />
    </>
  );
}

export default App;