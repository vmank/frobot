import React, { useContext, useEffect, useImperativeHandle, useState } from "react";

const Input = React.forwardRef(({ label, defaultValue, children, className = '' }, ref) => {
    const [value, setValue] = useState(defaultValue);

    useImperativeHandle(ref, () => ({
        setValue: (val) => {
            setValue(val);
        },
        getValue: () => {
            return value;
        }
    }));

    return(
        <div className={`input ${className}`}>
            <label for="item-name" className="mb-8">{label}</label>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input id="item-name" value={value} onChange={(e) => setValue(e.target.value)} />
                {children}
            </div>
        </div>
    )
})

export default Input;