import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const CustomScroll = () => {
  const customScroll = useRef();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.clientHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
    const scrollPercentRounded = Math.round(scrollPercent);

    customScroll.current.style.width = `${scrollPercentRounded}%`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <Box ref={customScroll} component="div" className="custom-scroll" />;
};

export default CustomScroll;
