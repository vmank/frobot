import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, savedItems } from "../store/extensionSlice";
import { v4 as uuid } from 'uuid';

const ItemName = React.forwardRef(({ ...props }, ref) => {
    const [itemName, setItemName] = useState('');
    const dispatch = useDispatch();
    const savedItemsState = useSelector(savedItems);



    // let editPayload = {
    //     uuid: '12345',
    //     item: {
    //         uuid: '12345',
    //         name: 'Going Going',
    //         qty: '5'
    //     }
    // }

    console.log(savedItemsState);

    // useEffect( () => {
    //     dispatch(editItem(editPayload));
    // }, [])

    const dispatchAddItem = () => {
        let item = {
            uuid: uuid(),
            name: itemName,
            qty: '1'
        }

        dispatch(addItem(item))
        setItemName('');
    }

    const onClick = () => {
        dispatchAddItem();
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            dispatchAddItem();
        }
    }
    return(
        <div className="input item-name">
            <label for="item-name" className="mb-8">Item name</label>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input id="item-name" value={itemName} onChange={(e) => setItemName(e.target.value)} onKeyDown={onKeyDown}/>
                <button id='add' onClick={onClick}>Add</button>
            </div>
        </div>
    )
})

export default ItemName;