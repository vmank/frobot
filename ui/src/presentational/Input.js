import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, savedItems } from "../store/extensionSlice";
import { uuid } from 'uuidv4';

const Input = React.forwardRef(({ label = '', value, children, onChange, className = '' }, ref) => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const savedItemsState = useSelector(savedItems);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus()
    }))

    // let editPayload = {
    //     uuid: '12345',
    //     item: {
    //         uuid: '12345',
    //         name: 'Going Going',
    //         qty: '5'
    //     }
    // }

    // console.log(savedItemsState);

    // useEffect( () => {
    //     dispatch(editItem(editPayload));
    // }, [])

    return(
        <div className={`input ${className}`}>
            {label ? <label for="item-name" className="mb-8">{label}</label> : null}
            <div className="input-container" style={{display: 'flex', alignItems: 'center'}}>
                <input ref={inputRef} id="item-name" value={value} onChange={(e) => onChange(e.target.value)} />
                {children}
            </div>
        </div>
    )
})

export default Input;