import React, { useState } from 'react';
import styled from 'styled-components';

export const SwitchContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 45px;
    height: 26px;
`;

export const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: #2196F3;
    }

    &:focus + span {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked + span:before {
        transform: translateX(20px);
    }
`;

export const SwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #12862b;
    transition: 0.4s;
    border-radius: 30px; /* Increase the border-radius to make the toggle bigger */

    &:before {
        position: absolute;
        content: "";
        height: 26px; /* Increase the height to make the toggle bigger */
        width: 26px; /* Increase the width to make the toggle bigger */
        left: 0px; /* Increase the left position to center the toggle */
        bottom: 0px; /* Increase the bottom position to center the toggle */
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

// TODO: Make it generic with arguments
// const Toggle = () => {
//     const [checked, setChecked] = useState(false);

//     const handleToggle = () => {    
//         setChecked(!checked);
//     }

//     return (
//         <SwitchContainer>
//             <SwitchInput type="checkbox" checked={checked} onChange={handleToggle} />
//             <SwitchSlider />
//         </SwitchContainer>

//     );
// };

// export default Toggle;