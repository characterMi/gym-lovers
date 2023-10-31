import React, { useState } from 'react';
import { Box } from "@mui/material";
import { Exercises, SearchExercises, Banner } from '../components';


const Home = ({ loading, setLoading }) => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  return (
    <Box>
      <Banner />
      <SearchExercises loading={loading} setLoading={setLoading} setExercises={setExercises} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      <Exercises loading={loading} setLoading={setLoading} setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  )
}

export default Home;