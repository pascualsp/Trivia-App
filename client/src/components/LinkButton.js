import React, { useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

const LinkButton = ({ qsetID }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const copyLink = () => {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', window.location.href);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 2000);
    };

    if (qsetID !== null) {
        return (
            <div className="row justify-content-center">
                <Button outline id="linkButton" onClick={copyLink} className="wButton m-2">Copy link to board</Button>
                <UncontrolledTooltip placement="right" target="linkButton" isOpen={tooltipOpen} trigger="click">
                    Copied!
                </UncontrolledTooltip>
            </div>
        );
    }

    return null;
};

export default LinkButton;