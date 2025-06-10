import "./App.css";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
import MovieDialog from "./components/MovieDialog";
function App() {
  return (
    <>
      <Body />
      <Toaster />
      <MovieDialog />
    </>
  );
}

export default App;
