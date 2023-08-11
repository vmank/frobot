/*global chrome*/
import './App.css';
import React, { useEffect, useState } from 'react';
import Input from './presentational/Input';
import Interval from './presentational/Interval';
import ItemName from './presentational/ItemName';
import List from './presentational/List/List';
import { createActiveTab, getActiveTab } from './helpers';
import { useDidUpdateEffect } from './hooks';
import InvalidTab from './presentational/InvalidTab';
import { useDispatch } from 'react-redux';
import { setCompleteLoadingTime, setRefreshInterval, setStartLoadingTime } from './store/extensionSlice';

function App() {
	const [activeTab, setActiveTab] = useState(null);
	const [validTab, setValidTab] = useState(false);

	const dispatch = useDispatch();

	useEffect( () => {
		getActiveTab(chrome, setActiveTab);
	}, [] )

	useDidUpdateEffect( () => {
		if(activeTab !== null && activeTab?.url?.includes('funkoeurope.com')) {
			setValidTab(true);

			chrome.storage.local.get(["startLoadingTime", "completeLoadingTime"]).then((result) => {
				dispatch(setStartLoadingTime(result?.startLoadingTime));
				dispatch(setCompleteLoadingTime(result?.completeLoadingTime));

				if(result?.completeLoadingTime - result?.startLoadingTime > 0) {
					dispatch(setRefreshInterval(`${result?.completeLoadingTime - result?.startLoadingTime}`));
				} else {
					dispatch(setRefreshInterval('-'));
				}
			});
		} else {
			setValidTab(false);
		}
	}, [activeTab] )


	const onLinkClick = (url) => {
		createActiveTab(chrome, url);
	}

	return (
		<div className="extension-container">
			<div className='extension-header'>
				<div className='title'>Plugin title</div>
			</div>

			<div className='extension-body'>
				{validTab ?
					<>
						<div className='item-name mb-16'>
							<ItemName />
						</div>

						<List />

						<div className='refresh-interval'>
							<Interval />
						</div>
					</>
					:
					<InvalidTab onLinkClick={onLinkClick} />
				}


				<div>

				</div>
				{/* autocheckout */}
				{/* confirm before checkout? */}
			</div>
		</div>
	);
}

export default App;
