/*global chrome*/
import './App.css';
import React, { useState } from 'react';
import Input from './presentational/Input';
import Interval from './presentational/Interval';

let state = {
    items: [
        {
            name: 'Going Merry',
            qty: '2'
        }
    ],
    refreshInterval: {
        auto: true,
        interval: '200'
    },
    autoCheckout: true,
    checkoutConfirmation: true
}

function App() {
	const [items, setItems] = useState([]);

	const onClick = () => {
		// chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		// 	var activeTab = tabs[0];
		// 	chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
		// });

		chrome.runtime.sendMessage({reload: true});
	}

	return (
		<div className="extension-container">
			<div className='extension-header'>
				<div className='title'>Plugin title</div>
			</div>

			<div className='extension-body'>
				<div className='item-name mb-16'>
					<Input className="item-name" label={'Item name'} >
						<button id='add'>Add</button>
					</Input>
				</div>

				<div className='refresh-interval'>
					<Interval />
				</div>

				<div>

				</div>
				{/* confirm before checkout? */}
				{/* <button onClick={onClick}>Click me</button> */}
			</div>
		</div>
	);
}

export default App;
