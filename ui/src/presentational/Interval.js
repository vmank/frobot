import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeLoadingTime, refreshInterval, startLoadingTime, setRefreshInterval } from "../store/extensionSlice";

const Interval = React.forwardRef((props, ref) => {
    const [auto, setAuto] = useState(true);
    const startLoadingTimeState = useSelector(startLoadingTime);
    const completeLoadingTimeState = useSelector(completeLoadingTime);
    const refreshIntervalState = useSelector(refreshInterval);

    const dispatch = useDispatch();

    const inputRef = useRef();

    useEffect( () => {
        if(auto) {
            if(completeLoadingTimeState - startLoadingTimeState > 0) {
                dispatch(setRefreshInterval(`${completeLoadingTimeState - startLoadingTimeState}`));
            } else {
                dispatch(setRefreshInterval('-'));
            }
        } else {
            dispatch(setRefreshInterval(''));
        }
    }, [auto, startLoadingTimeState, completeLoadingTimeState]);

    const handleClickAuto = () => {
        setAuto(true);
    }

    const handleClickManual = () => {
        inputRef.current.focus();
        setAuto(false);
    }

    return(
        <div className="refresh-interval">
            <label className="mb-8">Refresh Interval</label>
            <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <div className="interval-container" style={{display: 'flex', alignItems: 'center'}}>
                    <div id="auto" className={`pointer ${auto ? 'active' : ''}`} onClick={handleClickAuto}>Auto</div>

                    <div id="manual" className={`pointer ${!auto ? 'active' : ''}`} onClick={handleClickManual}>
                        <input ref={inputRef} value={''} onChange={(e) => setRefreshInterval(e.target.value)}/>
                    </div>
                </div>
                <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
                    <span>Loading time:</span>
                    {refreshIntervalState === '-' ? '-' : `${(parseInt(refreshIntervalState)) / 1000}s`}
                </div>
            </div>
        </div>
    )
})

export default Interval;