import { Avatar, Tooltip, Typography } from "@mui/material";

const MyAvatar = ({ nameString }: { nameString: string }) => {
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const ShowDetails = (nameString: string) => {
        return (
            <div>
                <Tooltip title={nameString}>
                    <Avatar sx={{ bgcolor: stringToColor(nameString) }}> {nameString.split(' ').map(name => name[0]).join('')} </Avatar>
                </Tooltip>
                <Typography variant='inherit'
                    color="black">Hello {nameString}</Typography>
            </div>
        )
    }

    return (<>
        {nameString != '' ? ShowDetails(nameString) : <Avatar src="/broken-image.jpg" />}
    </>)
}
export default MyAvatar;