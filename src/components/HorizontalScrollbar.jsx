import { Box, Typography } from "@mui/material";
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { all, back, cardio, chest, lowerarms, lowerlegs, neck, shoulders, upperarms, upperlegs, waist } from "../assets/body-parts";
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import { BodyPart, Error, ExerciseCard, Loader } from './';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts, loading }) => {

  const images = [all, back, cardio, chest, lowerarms, lowerlegs, neck, shoulders, upperarms, upperlegs, waist]

  return (
    <>
      {loading ? <Loader /> :
        <Box>
          {data.length > 0 ?
            <ScrollMenu position="relative" RightArrow={RightArrow} LeftArrow={LeftArrow}>
              {data.map((item, index) =>
                <Box
                  key={item.id || item}
                  itemId={item.id || item}
                  title={item.id || item}
                  sx={{ m: index === 0 ? { xs: "0 10px 0 0", sm: "0 20px 0 0", lg: "0 30px 0 0" } : { xs: "0 10px", sm: "0 20px", lg: "0 30px" } }}
                >
                  {isBodyParts
                    ? <BodyPart image={images[index]} item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
                    : <ExerciseCard loading={loading} exercise={item} />
                  }
                </Box>
              )}
            </ScrollMenu> :
            <Error message="Something went wrong ! Please check your connection" />
          }
        </Box>
      }
    </>
  )
}

export default HorizontalScrollbar