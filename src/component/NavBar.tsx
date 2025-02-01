import { Link, matchPath, useLocation } from "react-router";
import { Box, Tabs, Tab } from '@mui/material';

function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }
    return null;
}

function MyTabs() {
    const routeMatch = useRouteMatch(['/', '/recipe']);
    const currentTab = routeMatch?.pattern?.path;
    const styleHome = currentTab === '/' ? 'deeppink' : 'black';
    const styleRecipe = currentTab != '/' ? 'deeppink' : 'black';
    return (
        <Tabs value={currentTab} TabIndicatorProps={{ sx: { background: 'deeppink' } }} textColor="primary">
            <Tab label="Home" value="/" to="/" component={Link} style={{ color: styleHome }} />
            <Tab label="recipes" value="/recipe" to="recipe?:id" component={Link} style={{ color: styleRecipe }} />
        </Tabs>
    );
}

const NavBar = () => {
    return (<>
        <Box sx={{ width: '100%' }}>
            <MyTabs />
        </Box>
    </>)
}

export default NavBar;