import {FileHeader} from "./FileHeader";
import {styled} from "@mui/material/styles";
import {Grid, LinearProgress, linearProgressClasses, Typography} from "@mui/material";

export function UploadError({file, onDelete, errors}) {

    const ErrorLinearProgress = styled(LinearProgress)(({ theme }) => ({
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: theme.palette.error.main,
        },
    }));

    return (
    <Grid item xs={12}>
        <FileHeader file={file} onDelete={onDelete}/>
        <ErrorLinearProgress variant="determinate" value={100}/>
        {errors.map((error) => (
            <div key={error.code}>
                <Typography color="text.primary" variant="caption">{error.message}</Typography>
            </div>
        ))}
    </Grid>
    )
}