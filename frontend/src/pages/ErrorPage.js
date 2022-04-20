import {Link as RouterLink} from "react-router-dom";
import {Button} from "@material-ui/core";

const ErrorPage = () => {
    return(
    <>
        <h2>Error page...</h2>
        <Button variant="outlined" size="large" color="inherit" component={RouterLink} to="/">Back to home page</Button>
    </>
    )
}
export default ErrorPage