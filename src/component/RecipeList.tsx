import { useDispatch, useSelector } from 'react-redux'
import { fetchData, Recipe } from '../store/recipesSlice';
import { RecipeDispatch, StoreType } from '../store/store';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';


const RecipesList = () => {
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<RecipeDispatch>();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Recipes
                </Typography>
                <Paper elevation={3}>
                    <List>
                        {recipesList.map((recipe: Recipe) => (
                            <ListItem component={Link} to={`/recipe/recipe/${recipe.id}`} key={recipe.id}>
                                <ListItemText primary={recipe.title} secondary={recipe.description} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Outlet />
            </Container>
        </>
    );
};
export default RecipesList;