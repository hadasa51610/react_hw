import { array, object, string } from "yup"
import { useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { addRecipe, Recipe } from "../store/recipesSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "./UserReducer";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { RecipeDispatch } from "../store/store";

const schema = object().shape({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    ingredients: array().required(),
    instructions: string().required("Instructions are required")
}).required()

const AddRecipe = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<RecipeDispatch>();
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<Recipe> = (recipe) => {
        recipe.authorId = user.id;
        dispatch(addRecipe(recipe));
        reset()
        setOpen(false);
    }
    
    return (<>
        <Button sx={{ color: "black", borderColor: "black", margin:'10px' }} variant="outlined" onClick={() => setOpen(true)} startIcon={<AddIcon />}>Add Recipe</Button>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '8%',
                }}>
                <Typography variant="h6" align="center" gutterBottom>Add New Recipe</Typography>
                <TextField
                    {...register("title")}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <TextField
                    {...register("description")}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <TextField
                    {...register("ingredients")}
                    label="Ingredients (comma-separated)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.ingredients}
                    helperText={errors.ingredients?.message}
                />
                <TextField
                    {...register("instructions")}
                    label="Instructions"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.instructions}
                    helperText={errors.instructions?.message}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#ae7a6f' }}>Send</Button>
            </Box>
        </Modal>
    </>)
}
export default AddRecipe;