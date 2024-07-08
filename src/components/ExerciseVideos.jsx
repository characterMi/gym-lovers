import { Box, Typography } from "@mui/material";
import { Error, Loader } from "./";


const ExerciseVideos = ({ exerciseVideos, name, loading }) => {


  return (
    <Box p="20px" sx={{ marginTop: { lg: "200px", xs: "20px" } }}>
      <Typography sx={{ fontSize: { xs: "24px", sm: "28px", md: "32px", lg: "38px" }, fontWeight: "bold" }} mb="33px">
        Watch <span style={{ color: "#ff2625", textTransform: "capitalized" }}>{name || "This"}</span> exercise Videos
      </Typography>
      {loading ? <Loader /> :
        <Box>
          {exerciseVideos.length > 0 ?
            <Box
              className="exercise-video-container"
              component="div"
              sx={{
                WebkitBoxOrient: { sm: "horizontal", },
                WebkitBoxDirection: { sm: "normal", },
                WebkitFlexDirection: { sm: "row", },
                MozBoxOrient: { sm: "horizontal", },
                MozBoxDirection: { sm: "normal", },
                msFlexDirection: { sm: "row", },
                flexDirection: { sm: "row" },
                gap: { lg: "30px", xs: "10px" }
              }}
            >
              {exerciseVideos?.slice(0, 6).map((item, index) => (
                <a key={index} className='exercise-video' target='_blank' rel="noreferrer" href={`https://www.youtube.com/watch?v=${item.video.videoId}`}>
                  <img src={item.video.thumbnails[0].url} alt={`${name} Video`} />
                  <Box>
                    <Typography className="exercise-video__title" sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "22px" } }} color="#000">
                      {item.video.title}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "22px" } }} color="#000">
                      {item.video.channelName}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box> :
            <Error message="No videos found!" />
          }
        </Box>
      }
    </Box>
  )
}

export default ExerciseVideos