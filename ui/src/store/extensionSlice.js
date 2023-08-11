import { createSlice } from '@reduxjs/toolkit';

export const extensionSlice = createSlice({
	name: 'extension',
	initialState: {
		items: [
			{
				uuid: '12345',
				name: 'Going Merry',
				qty: '2'
			}
		],
		refreshInterval: '200',
		autoCheckout: true,
		checkoutConfirmation: true,
		startLoadingTime: null,
		completeLoadingTime: null,
	},
	reducers: {
		setStartLoadingTime: (state, action) => {
			state.startLoadingTime = action.payload
		},
		setCompleteLoadingTime: (state, action) => {
			state.completeLoadingTime = action.payload
		},
		setRefreshInterval: (state, action) => {
			state.refreshInterval = action.payload
		},
		addItem: (state, action) => {
			state.items.push(action.payload);
		},
		editItem: (state, action) => {
			let uuid = action.payload.item.uuid;

			let editableItemIndex = state.items.findIndex( (item) => item.uuid === uuid );

			state.items[editableItemIndex] = action.payload.item;
		},
		deleteItem: (state, action) => {
			let uuid = action.payload.uuid;

			let filteredItemList = state.items.filter( (item) => item.uuid !== uuid );

			state.items = filteredItemList;
		}
	},
})

export const { addItem, editItem, deleteItem, setStartLoadingTime, setCompleteLoadingTime, setRefreshInterval } = extensionSlice.actions

export const savedItems = (state) => state.extension.items;
export const startLoadingTime = (state) => state.extension.startLoadingTime;
export const completeLoadingTime = (state) => state.extension.completeLoadingTime;
export const refreshInterval = (state) => state.extension.refreshInterval;

export default extensionSlice.reducer
