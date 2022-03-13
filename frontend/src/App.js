import './App.css';
import {useState} from "react";

const App = () => {
  const [content, setContent] = useState("Hello world")

  return(
      <>
        <h2>{content}</h2>
      </>
  )
}

export default App;
