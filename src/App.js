import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { CustomScroll, Error, Footer, Loader, Navbar } from "./components";
import { ErrorBoundary } from "./components/ErrorBoundary";

import "./App.css";
import DataStoreProvider from "./providers/DataStoreContext";

const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));
const Home = lazy(() => import("./pages/Home"));

const RouteWithinSuspense = ({ child }) => (
  <ErrorBoundary
    fallback={
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Error
          message={"Something went wrong, reload the page to try again."}
        />
      </div>
    }
  >
    <Suspense fallback={<Loader />}>{child}</Suspense>
  </ErrorBoundary>
);

const App = () => (
  <DataStoreProvider>
    <HelmetProvider>
      <CustomScroll />
      <Box width="400px" sx={{ width: { xl: "1488px" }, m: "auto" }}>
        <Helmet>
          <title>Gym Lovers | Home</title>
        </Helmet>
        <Navbar />
        <Routes>
          <Route path="/" element={<RouteWithinSuspense child={<Home />} />} />
          <Route
            path="/exercise/:id"
            element={<RouteWithinSuspense child={<ExerciseDetail />} />}
          />
        </Routes>
        <Footer />
      </Box>
    </HelmetProvider>
  </DataStoreProvider>
);

export default App;
