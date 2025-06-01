import Header from "./components/features/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {
  return <>
    <Provider store={appStore}>
      <header>
        <Header></Header>
      </header>
      <main>
        <Outlet />
      </main>
    </Provider>
  </>
}

export default App;
