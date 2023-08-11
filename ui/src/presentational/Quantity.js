import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import Input from "./Input";

const Quantity = React.forwardRef(({ quantity, setQuantity }, ref) => {

    const onDecreaseClick = () => {
        if(quantity > 0) setQuantity(quantity - 1);
    }

    const onIncreaseClick = () => {
        setQuantity(quantity + 1);
    }

    const toggleMax = () => {
        if(quantity === 'MAX') setQuantity('1');
        else setQuantity('MAX');
    }

    return(
        <div className="quantity">
            <div className="inner-container">
                <button className="decrease pointer" onClick={onDecreaseClick}>-</button>
                <Input value={quantity} onChange={setQuantity}>
                    <span className={`max pointer ${quantity === 'MAX' ? 'active' : ''}`} onClick={toggleMax}>MAX</span>
                </Input>
                <button className="increase pointer" onClick={onIncreaseClick}>+</button>
            </div>
        </div>
    )
})

export default Quantity;