import {useEffect, useState} from "react";
import {Grid, LinearProgress, linearProgressClasses} from "@mui/material";
import {FileHeader} from "./FileHeader";
import { green } from '@mui/material/colors';
import {styled} from "@mui/material/styles";
import fileUpoladService from "../../services/FileService";

export function SingleFileSelectionWithProgress({file, onDelete, onUpload}) {
    const [progress, setProgress] = useState(0)

    const SuccessLinearProgress = styled(LinearProgress)(({ theme }) => ({
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: green[600],
        },
    }));

    useEffect(() => {
        async function upload() {   //TODO handle errors
            const fileResp = await fileUpoladService.upload(file, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            })
            onUpload(file, fileResp.data.url)
            //console.log('resp: ' + JSON.stringify(fileResp.data.url))
        }

        upload()

    }, [])
    return (
        <Grid item xs={12}>
            <FileHeader file={file} onDelete={onDelete}/>
            <SuccessLinearProgress variant="determinate" value={progress}/>
        </Grid>
    )
}
