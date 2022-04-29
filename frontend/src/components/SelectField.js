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
            {options.map(category => {
                return (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}
export default SelectField