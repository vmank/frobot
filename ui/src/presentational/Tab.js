import React from "react";

export default function Tab({ type, name, state, dispatch }) {
    return(
        <div tab-type={type} tab-active={true}>
            {name}
        </div>
    )
}