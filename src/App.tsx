import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;
