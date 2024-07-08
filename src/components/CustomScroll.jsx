import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

const CustomScroll = () => {
    const customScroll = useRef();
    const handleScroll = () => {
        let scrollY = window.scrollY;
        let documentHeight = document.body.clientHeight;
        let windowHeight = window.innerHeight;
        let scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
        let scrollPercentRounded = Math.round(scrollPercent);
        customScroll.current.style.width = `${scrollPercentRounded}%`
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <Box ref={customScroll} component="div" className="custom-scroll" />
    )
}

export default CustomScroll