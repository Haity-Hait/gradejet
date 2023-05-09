import { useEffect } from "react";

function App() {
  let isMounted = true
  fetch("http://localhost:1520/landingpage").then((res) => res.json())
  .then((data) => console.log(data.courses))
  return (
    <div className="App">
      <h1>Testing mode</h1>
    </div>
  );
}

export default App;
