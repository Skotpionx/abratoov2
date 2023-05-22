import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../styles/textBox.css'
import Link from 'next/link'

const BoxText = () => {
    const props = useSpring({
        to: async (next, cancel) => {
            await next({ bottom: '50%', opacity: 1 })
        },
        from: { bottom: '0%', opacity: 0 },
        config: { duration: 1000 },
    })

    const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktopOrTablet(window.innerWidth >= 1450);
        };

        window.addEventListener('resize', handleResize);

        // Call the handleResize function initially to calculate
        // the width on first render
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <React.Fragment>
            {isDesktopOrTablet && (
                <animated.div className="parent-animation">
                    <animated.div className="animation" style={props}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">Poka bananonina tú!</Tooltip>}
                        >
                            {({ ref, ...triggerHandler }) => (
                                <Button
                                    variant="light"
                                    {...triggerHandler}
                                    className="d-inline-flex align-items-center"
                                >
                                    <Link href="/" >
                                        <Image
                                            ref={ref}
                                            roundedCircle
                                            width={50}
                                            height={50}
                                            src="minion.png"
                                        />
                                    </Link>
                                    <span className="ms-1"> El punto de partida para grandes aventuras. ¡Haz clic en el minion para volver!</span>
                                </Button>
                            )}
                        </OverlayTrigger>
                    </animated.div>
                </animated.div>
            )}
        </React.Fragment>
    );
}

export default BoxText;
