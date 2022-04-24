import {useEffect, useState} from "react";
import {Grid, LinearProgress, linearProgressClasses} from "@mui/material";
import {FileHeader} from "./FileHeader";
import { green } from '@mui/material/colors';
import {styled} from "@mui/material/styles";

export function SingleFileSelectionWithProgress({file, onDelete}) {
    const [progress, setProgress] = useState(0)

    const SuccessLinearProgress = styled(LinearProgress)(({ theme }) => ({
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: green[600],
        },
    }));

    useEffect(() => {
        setProgress(100)

    }, [])
    return (
        <Grid item xs={12}>
            <FileHeader file={file} onDelete={onDelete}/>
            <SuccessLinearProgress variant="determinate" value={progress}/>
        </Grid>
    )
}
