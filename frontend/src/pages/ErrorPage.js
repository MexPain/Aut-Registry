import {Link as RouterLink} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

const ErrorPage = () => {
    return (
        <>
            <Typography variant={"h1"} textAlign={"center"} marginTop={10}>404</Typography>
            <Typography variant={"h2"} textAlign={"center"} fontStyle={"italic"}>Az oldal nem található</Typography>
            <Box display={"flex"} justifyContent={"center"} margin={3}>
                <Button variant="contained" size="large"
                        component={RouterLink} to="/">Vissza a kezdőoldalra</Button>
            </Box>
        </>
    )
}
export default ErrorPage