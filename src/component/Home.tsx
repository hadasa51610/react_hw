import { Container, Typography, Box } from "@mui/material";

const Home = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
            <Box sx={{ bgcolor: '#fdf4f2', p: 4, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" component="h1">
                    Home
                </Typography>
            </Box>
        </Container>
    )
}
export default Home;