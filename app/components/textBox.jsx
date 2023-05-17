import React, { useState  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../styles/textBox.css'
import Link from 'next/link'

const BoxText = () => {


    return (
    <div className="parent-animation"> 
        <div className="animation">
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
        </div>
    </div> 
    );
}

export default BoxText;