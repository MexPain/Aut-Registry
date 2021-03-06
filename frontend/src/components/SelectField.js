import React from "react";
import {MenuItem, TextField} from "@mui/material";
import { useField, useFormikContext} from 'formik'

const SelectField = ({
    name,
    options,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const handleChange= event => {
        const { value } = event.target
        setFieldValue(name, value)
    }

    const configSelect = {
        ...field,
        ...otherProps,
        color: 'secondary',
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange,
    }

    if(meta && meta.touched && meta.error) {
        configSelect.error = true
        configSelect.helperText = meta.error
    }

    return (
        <TextField {...configSelect}>
            {options.map(item => {
                return (
                    <MenuItem key={item.id} value={item.name}>
                        {item.name}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}
export default SelectField