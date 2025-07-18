import { Box } from "@mui/material";
import React, { useState } from "react";
import { Banner, Exercises, SearchExercises } from "../components";
import { useSearchParams } from "../hooks/useSearchParams";

const Home = () => {
  const { param } = useSearchParams("bodyPart");
  const [bodyPart, setBodyPart] = useState(param ?? "all");
  const [exercises, setExercises] = useState([]);
  const [bodyPartsLoading, setBodyPartsLoading] = useState(false);

  return (
    <Box>
      <Banner />
      <SearchExercises
        setLoading={setBodyPartsLoading}
        setExercises={setExercises}
        setBodyPart={setBodyPart}
        bodyPart={bodyPart}
      />
      <Exercises
        loading={bodyPartsLoading}
        setLoading={setBodyPartsLoading}
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
