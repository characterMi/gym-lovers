import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { HorizontalScrollbar } from './';


const SearchExercises = ({ setExercises, bodyPart, setBodyPart, setLoading, loading }) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);
    const [bodyPartLoading, setBodyPartLoading] = useState(false)

    useEffect(() => {
        const fetchExercisesData = async () => {
            setBodyPartLoading(true)
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=3000', exerciseOptions)
            setBodyPartLoading(false)
            if (bodyPartsData) {
                setBodyParts(['all', ...bodyPartsData])
            } else {
                setBodyParts([])
            }
        }
        fetchExercisesData()
    }, [])

    const handleSearch = async () => {
        if (search) {
            setLoading(true)
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=3000', exerciseOptions);
            setLoading(false)
            if (exercisesData) {
                const searchedExercises = exercisesData.filter(
                    (exercise) => exercise.name.toLowerCase().includes(search)
                        || exercise.target.toLowerCase().includes(search)
                        || exercise.equipment.toLowerCase().includes(search)
                        || exercise.bodyPart.toLowerCase().includes(search)
                );
                setExercises(searchedExercises);
            } else {
                setExercises([])
            }
            setSearch('');
        }
    }
    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            <Typography textAlign="center" mb="50px" fontWeight={700} sx={{ fontSize: { md: "44px", xs: "30px" } }}>
                Awesome Exercises You <br /> Should Know
            </Typography>
            <Box position="relative" mb="72px">
                <TextField sx={{ input: { fontWeight: '700', border: "none", borderRadius: "4px" }, width: { md: "800px", xs: '250px', sm: "500px" }, backgroundColor: "#fff", borderRadius: "40px" }} height="76px" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search Exercises' type="text" />
                <Button className="search-btn" sx={{
                    bgcolor: "#ff2625",
                    color: "#fff",
                    textTransform: "none",
                    width: {
                        lg: "175px", xs: "80px"
                    },
                    fontSize: {
                        lg: "20px",
                        xs: "12px"
                    },
                    height: "56px",
                    position: "absolute",
                    right: 0
                }}
                    onClick={handleSearch}
                >Search</Button>
            </Box>
            <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
                <HorizontalScrollbar loading={bodyPartLoading} isBodyParts data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
            </Box>
        </Stack>
    )
}

export default SearchExercises;