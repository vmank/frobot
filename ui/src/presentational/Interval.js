import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const Interval = React.forwardRef(({ defaultValue, children, className = '' }, ref) => {
    const [auto, setAuto] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState('');

    const inputRef = useRef();

    useEffect( () => {
        setRefreshInterval('');
    }, [auto]);

    useImperativeHandle(ref, () => ({
        setRefreshInterval: (val) => {
            setRefreshInterval(val);
        },
        getValue: () => {
            return refreshInterval;
        }
    }));

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
            <div className="interval-container" style={{display: 'flex', alignItems: 'center'}}>
                <div id="auto" className={`pointer ${auto ? 'active' : ''}`} onClick={handleClickAuto}>Auto</div>

                <div id="manual" className={`pointer ${!auto ? 'active' : ''}`} onClick={handleClickManual}>
                    <input ref={inputRef} value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)}/>
                </div>
            </div>
        </div>
    )
})

export default Interval;