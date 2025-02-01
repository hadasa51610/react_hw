import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RecipeDispatch, StoreType } from "../store/store";
import { useEffect } from "react";
import { fetchData } from "../store/recipesSlice";
import { Container, Typography, Card, CardContent } from "@mui/material";

const ShowRecipe = () => {
    const { id } = useParams();
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<RecipeDispatch>();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    const recipe = recipesList.find(r => r.id === Number(id))
    return (<>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {recipe?.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {recipe?.description}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Ingredients
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {recipe?.ingredients}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Instructions
                    </Typography>
                    <Typography variant="body1">
                        {recipe?.instructions}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    </>)
}
export default ShowRecipe;