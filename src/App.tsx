// App.tsx
import Header from "./components/features/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Footer from "./components/features/Footer";
import LocationDialog from "./components/features/LocationDialog";
// (adjust the import path as needed)

function App() {
  return (
    <Provider store={appStore}>
      <header>
        <Header />
      </header>
      <main style={{ padding: "1rem" }}>
        {/* Here we insert our “Request Location” button + dialog */}
        <LocationDialog />

        {/* This is where your routed pages will render */}
        <Outlet />
      </main>
      <footer className="mt-12 pt-4 pb-1 px-1">
        <Footer />
      </footer>
    </Provider>
  );
}

export default App;
