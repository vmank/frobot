import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, deleteItem, savedItems } from "../../store/extensionSlice";
import Quantity from "../Quantity";
import Delete from "../Delete";
import { uuid } from "uuidv4";
import Input from "../Input";
import { useDidUpdate, useDidUpdateEffect } from "../../hooks";


export default function List() {
    const savedItemsState = useSelector(savedItems);

    return(
        <div className="items-list mb-16">
            {
                savedItemsState.map( (item, index) => <Item key={item.uuid} item={item} />)
            }
        </div>
    )
}


function Item({ item = {uuid: '', name: "", quantity: "0"} }) {
    const [name, setName] = useState(item.name);
    const [quantity, setQuantity] = useState(parseInt(item.qty));

    const nameRef = useRef();

    const dispatch = useDispatch();

    useDidUpdateEffect( () => {
        dispatchEditItem(item);
    }, [name, quantity]);

    const dispatchEditItem = (item) => {
        // console.log('=================================================')
        // console.log('dispatchEditItem')
        // console.log('item', item)
        // console.log('name', name)
        // console.log('quantity', quantity)
        // console.log('=================================================')

        let editedItem = {
            uuid: item.uuid,
            name: name,
            qty: `${quantity}`
        }

        dispatch(editItem({ item: editedItem }))
    }

    const onNameClickFocus = () => {
        nameRef.current.focus();
        // nameRef.current.setSelectionRange(name.length, name.length);
    }

    return(
        <div className="item" key={item.uuid}>
            <div className="name" onClick={() => onNameClickFocus(item.name)}>
                {/* <span ref={nameRef} className="field" onChange={} contentEditable>{item.name}</span> */}
                <Input ref={nameRef} className="field" value={name} onChange={setName} >
                    <span className="icon">✎</span>
                </Input>
            </div>
            <div className="quantity">
                <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>
            <Delete onClick={() => dispatch(deleteItem(item))} />
        </div>
    )
}