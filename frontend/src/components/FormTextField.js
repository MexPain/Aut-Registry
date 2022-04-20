import {useField} from "formik";
import {TextField} from "@mui/material";

const FormTextField = ({name, ...otherProps}) => {
    const [field, meta] = useField(name)

    const configTextField = {
        ...field,
        ...otherProps,
        color: 'secondary',
        margin: 'normal',
        fullWidth: true,
        variant: 'outlined'
    }

    if(meta && meta.touched && meta.error) {
        configTextField.error = true
        configTextField.helperText = meta.error
    }

    return (
        <TextField {...configTextField} />
    )
}
export default FormTextField