import {Grid, LinearProgress, linearProgressClasses, Typography} from "@mui/material";
import {UploadError} from "./UploadError";
import {SingleFileSelectionWithProgress} from "./SingleFileSelectionWithProgress";
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useField} from "formik";
import {styled, useTheme} from "@mui/material/styles";
import { grey } from '@mui/material/colors';


const DropZoneStyled = styled('div', {
    shouldForwardProp: (prop) => prop !== 'disabled',
})(({ theme, disabled }) => ({
    ...(disabled && {
        border: `2px dashed ${grey[200]}`,
        color: grey[400],
    }),
    ...(!disabled && {
        border: `2px dashed ${theme.palette.secondary.main}`,
    }),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
}));

let currentId = 0;

function getNewId() {
    return ++currentId;
}

export function FileUploader({name}) {

    const theme = useTheme()

    const [files, setFiles] = useState([])
    const [acceptedFiles, setAcceptedFiles] = useState([])
    const [disabled, setDisabled] = useState(false)

    const [inputs, meta, helpers] = useField(name)

    const onDrop = useCallback((accFiles, rejFiles) => {
        if(accFiles.length > 0) {
            setDisabled(true)
        }
        const mappedAcc = accFiles.map(file => ({file, errors: [], id: getNewId()}))
        const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles(curr => [...curr, ...mappedAcc, ...mappedRej])
        setAcceptedFiles(curr => [...curr, ...mappedAcc])
    }, [])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        disabled: disabled,
        accept: 'image/*',
        maxSize: 1024*1024, //1MB
    })

    useEffect(() => {
        helpers.setValue(acceptedFiles, true) //ez a formik images arrayt állítja be
        console.log("Accepted files: " + acceptedFiles.length)
        if(acceptedFiles.length === 0) {
            setDisabled(false)
        }
    }, [acceptedFiles]);

    function onDelete(file) {
        setFiles(curr => curr.filter(fw => fw.file !== file))
        setAcceptedFiles(curr => curr.filter(fw => fw.file !== file))
    }

    return (
        <Grid item xs={12}>
            <DropZoneStyled {...getRootProps({disabled: disabled})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>

            </DropZoneStyled>

            {files.map((fileWrapper, idx) => (
                <Grid container item key={idx} marginTop={2}>
                    {fileWrapper.errors.length ? (
                        <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDelete={onDelete}/>
                    ) : (
                        <SingleFileSelectionWithProgress
                            file={fileWrapper.file}
                            onDelete={onDelete}
                        />
                    )}
                </Grid>
            ))}
            <Typography variant="body2" marginLeft={2} marginTop={3}
                        sx={{color: theme.palette.error.main}}
            >{meta && meta.error}</Typography>

        </Grid>
    )
}