import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'

const BackToTop = () => {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <span className='back-to-top' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: `${scrolled ? 'block' : 'none'}` }}>
            <FontAwesomeIcon icon={faArrowCircleUp} />
        </span>
    )
}

export default BackToTop
