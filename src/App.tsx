import Header from "./components/features/Header";
import { Outlet } from "react-router-dom";
function App() {
  return <>
    <header>
      <Header></Header>
    </header>
    <main>
      <Outlet />
    </main>
  </>
}

export default App;
