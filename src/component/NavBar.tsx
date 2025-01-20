import { Link, matchPath, useLocation } from "react-router";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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
    const routeMatch = useRouteMatch(['/', '/about']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Tabs value={currentTab} TabIndicatorProps={{ sx: { background: 'deeppink' } }} textColor="primary">
            <Tab label="Home" value="/" to="/" component={Link} style={{ color: currentTab === '/' ? 'deeppink' : 'black' }} />
            <Tab label="About" value="/about" to="/about" component={Link} style={{ color: currentTab === '/about' ? 'deeppink' : 'black' }} />
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