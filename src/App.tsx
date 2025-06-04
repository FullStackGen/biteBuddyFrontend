import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./components/features/Header";
import Footer from "./components/features/Footer";
import LocationDialog from "./components/features/LocationDialog";
import appStore from "./utils/appStore";
import { CircularProgress, Snackbar } from "@mui/material";

import {
  registerLoadingHandler,
  registerErrorHandler,
} from "./services/services";

function App() {

  const [loading, setLoading] = useState(false);


  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);


  useEffect(() => {
    registerLoadingHandler((isLoading: boolean) => {
      setLoading(isLoading);
    });

    registerErrorHandler((errorMsg: string) => {
      setErrorMessage(errorMsg);
    });
  }, []);


  useEffect(() => {
    if (!loading && errorMessage) {
      setSnackBarOpen(true);
    }
  }, [loading, errorMessage]);

  const closeSnackbar = () => {
    setSnackBarOpen(false);
    setErrorMessage("");
  };

  return (
    <Provider store={appStore}>
      {loading && (
        <div
          className="
            fixed inset-0 
             bg-opacity-30 
            flex items-center justify-center 
            z-[2000]
          "
        >
          <CircularProgress
            sx={{
              color: "blueviolet",
              width: "5rem",
              height: "5rem",
            }}
          />
        </div>
      )}

      <header>
        <Header />
      </header>

      <main style={{ padding: "1rem" }}>
        <LocationDialog />
        <Outlet />
      </main>

      <footer className="mt-12 pt-4 pb-1 px-1">
        <Footer />
      </footer>


      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        onClose={closeSnackbar}
        message={errorMessage}
        autoHideDuration={4000}
      />
    </Provider>
  );
}

export default App;
