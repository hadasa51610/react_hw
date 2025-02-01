import { combineReducers, configureStore } from '@reduxjs/toolkit';
import recipesSlice from './recipesSlice';

const store = configureStore({
    reducer: combineReducers({
        recipes: recipesSlice.reducer
    })
});
export type StoreType = ReturnType<typeof store.getState>
export type RecipeDispatch=typeof store.dispatch
export default store;