import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export type Recipe = {
    id?: number,
    title: string,
    description: string,
    ingredients: string[],
    instructions: string,
    authorId?: number
}
export const fetchData = createAsyncThunk<Recipe[], void>('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Recipe[]>('http://localhost:3000/api/recipes')
            return response.data
        }
        catch (e: AxiosError | any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/recipes', {
                title: recipe.title,
                description: recipe.description,
                ingredients: [...recipe.ingredients],
                instructions: recipe.instructions
            }, { headers: { 'user-id': '' + recipe.authorId } })
            return response.data.recipe
        }
        catch (e: AxiosError | any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { list: [] as Recipe[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled,
            (state, action) => {
                console.log('fulfilled');
                state.list = [...action.payload];
            }
        ).addCase(fetchData.rejected, () => {
            console.log('failed get');
        }
        ).addCase(addRecipe.fulfilled,
            (state, action) => {
                console.log('fulfilled');
                state.list = [...state.list, action.payload]
            }
        ).addCase(addRecipe.rejected, () => {
            console.log('failed add');
        }
        )
    },
})
export default recipesSlice;