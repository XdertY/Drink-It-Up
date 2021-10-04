import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {names: [], category: {}};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            const newName = action.payload;
            const names = [...state.names];
            state.names = names.map((el, index) => {
                return {key: index, name: el.name}
            });
            state.names.push({key: names.length, name: newName });
        },
        removePlayer: (state, action) => {
            const playerKey = action.payload;
            const tempNames = state.names.reduce((acc, elem, index) => {
                if (elem.key !== playerKey) return [...acc, { key: index, name: elem.name }];
                return acc
            }, [])
            state.names = tempNames;
        },
        selectCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

const store = configureStore({
    reducer: gameSlice.reducer
});

export const actions = gameSlice.actions;

export default store;