import Grid from '@mui/material/Grid2';
import ShowRecipe from './ShowRecipe';
import RecipesList from './RecipeList';
import { useParams } from 'react-router-dom';

const RecipeContainer = () => {
    const { id } = useParams();
    return (
        <Grid container direction="row" spacing={2} sx={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <Grid size={4}> 
                <RecipesList />
            </Grid>
            <Grid size={8}>
            {id && <ShowRecipe />} 
            </Grid>
        </Grid>
    );
};

export default RecipeContainer;