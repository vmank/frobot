import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const Quantity = React.forwardRef(({ defaultValue, children, className = '' }, ref) => {
    const [max, setMax] = useState(true);
    const [quantity, setQuantity] = useState('');

    const inputRef = useRef();

    useEffect( () => {
        setQuantity('');
    }, [max]);

    useImperativeHandle(ref, () => ({
        setQuantity: (val) => {
            setQuantity(val);
        },
        getValue: () => {
            return quantity;
        }
    }));

    const handleClickMax = () => {
        setMax(true);
    }

    const handleClickManual = () => {
        inputRef.current.focus();
        setMax(false);
    }

    return(
        <div className="quantity">
            <label className="mb-8">Qty</label>
            <div className="quantity-container" style={{display: 'flex', alignItems: 'center'}}>
                <div id="max" className={`pointer ${max ? 'active' : ''}`} onClick={handleClickMax}>Max</div>

                <div id="manual" className={`pointer ${!max ? 'active' : ''}`} onClick={handleClickManual}>
                    <input ref={inputRef} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>
            </div>
        </div>
    )
})

export default Quantity;