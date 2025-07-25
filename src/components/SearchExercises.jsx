import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "../hooks/useSearchParams";
import { useDataStore } from "../providers/DataStoreContext";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { HorizontalScrollbar } from "./";

const BodyPartsList = ({ bodyPart, setBodyPart, getDataByUrl, setNewData }) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPartsLoading, setBodyPartsLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=3000";
    const cachedData = getDataByUrl(url);

    (async () => {
      if (cachedData) setBodyParts(cachedData);

      setBodyPartsLoading(true);
      const bodyPartsData = await fetchData(url, exerciseOptions);

      if (bodyPartsData) {
        const allBodyParts = ["all", ...bodyPartsData];

        setBodyParts(allBodyParts);
        setNewData(url, allBodyParts);
      } else {
        setBodyParts([]);
      }
      setBodyPartsLoading(false);
    })();
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
      <HorizontalScrollbar
        loading={bodyPartsLoading}
        isBodyParts
        data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </Box>
  );
};

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
  setLoading,
}) => {
  const { param: searchFromSearchParams, handleChangeSearchParam } =
    useSearchParams("search", (newValue) => setSearch(newValue ?? ""));
  const [search, setSearch] = useState(searchFromSearchParams ?? "");
  const { getDataByUrl, setNewData } = useDataStore();

  useEffect(() => {
    handleSearch();
  }, []);

  async function handleSearch() {
    const trimmedSearch = search.trim();
    const url = "https://exercisedb.p.rapidapi.com/exercises?limit=3000";

    async function getData() {
      const cachedData = getDataByUrl(url);

      if (cachedData) return cachedData;

      setLoading(true);

      const exercisesData = await fetchData(url, exerciseOptions);
      if (!exercisesData) {
        setLoading(false);
        return [];
      }

      setNewData(url, exercisesData);
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name?.toLowerCase().includes(search) ||
          exercise.target?.toLowerCase().includes(search) ||
          exercise.equipment?.toLowerCase().includes(search) ||
          exercise.bodyPart?.toLowerCase().includes(search)
      );

      setLoading(false);

      return searchedExercises;
    }

    if (trimmedSearch) {
      handleChangeSearchParam(trimmedSearch);

      const searchedExercises = await getData();

      setExercises(searchedExercises);

      setSearch("");
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        textAlign="center"
        mb="50px"
        fontWeight={700}
        sx={{ fontSize: { md: "44px", xs: "30px" } }}
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
              MozBorderRadius: "4px",
              WebkitBorderRadius: "4px",
            },
            width: { md: "800px", xs: "250px", sm: "500px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
            MozBorderRadius: "40px",
            WebkitBorderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: {
              lg: "175px",
              xs: "80px",
            },
            fontSize: {
              lg: "20px",
              xs: "12px",
            },
            height: "56px",
            position: "absolute",
            right: 0,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <BodyPartsList
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        getDataByUrl={getDataByUrl}
        setNewData={setNewData}
      />
    </Stack>
  );
};

export default SearchExercises;
