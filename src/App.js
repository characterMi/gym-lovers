import { Box } from "@mui/material";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CustomScroll, Footer, Navbar } from "./components";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <HelmetProvider>
        <CustomScroll />
        <Box width="400px" sx={{ width: { xl: "1488px" }, m: "auto" }}>
          <Helmet>
            <title>Gym Lovers | Home</title>
          </Helmet>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/exercise/:id"
              element={
                <ExerciseDetail loading={loading} setLoading={setLoading} />
              }
            />
          </Routes>
          <Footer />
        </Box>
      </HelmetProvider>
    </>
  );
};

export default App;
