import * as Yup from "yup";
import {Button, FormControlLabel, Grid, Switch, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import FormTextField from "../../components/FormTextField";
import SelectField from "../../components/SelectField";
import {useState} from "react";

export default function SearchForm({categories, onSubmitForm}) {

    const [filterName, setFilterName] = useState(false)
    const [filterCategory, setFilterCategory] = useState(false)

    const initialValues = {
        showText: false,
        searchText: "",
        showCategories: false,
        categorySelect: ""
    }

    const searchValidationSchema = Yup.object().shape({
        searchText: Yup.string()
            .when("showText", {
                is: true,
                then: Yup.string().required("Add meg a tárgy nevét")
            }),
        categorySelect: Yup.string()
            .when("showCategories", {
                is: true,
                then: Yup.string().required("Válassz kategóriát")
            })
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={searchValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, {setSubmitting}) => {
                onSubmitForm(values)
            }}
        >{({values, setFieldValue}) => (
            <Form>
                <Grid container>
                    <Grid item xs={9}>
                        <Typography variant={"subtitle1"} sx={{marginBottom: 2, fontWeight: 'bold'}}>Keresés</Typography>

                        <Grid container spacing={2} marginBottom={1}>
                            <Grid item xs={4}>
                                <FormControlLabel label="Szűrés név szerint" control={
                                    <Switch name="showText" onChange={(event) => {
                                        setFilterName(event.target.checked)
                                        setFieldValue(event.target.name, event.target.checked)
                                        setFieldValue("searchText", "")
                                    }}/>
                                }/>
                            </Grid>
                            <Grid item xs={8} md={7} lg={6}>
                                {filterName && <FormTextField
                                    size="small"
                                    label="A tárgy neve..."
                                    name="searchText"/>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginBottom={1}>
                            <Grid item xs={4}>
                                <FormControlLabel label="Szűrés kategória szerint" control={
                                    <Switch name="showCategories"
                                            onChange={(event) => {
                                                setFilterCategory(event.target.checked)
                                                setFieldValue(event.target.name, event.target.checked)
                                                setFieldValue("categorySelect", "")
                                            }}/>
                                }/>
                            </Grid>
                            <Grid item xs={8} md={7} lg={6}>
                                {filterCategory && <SelectField
                                    name="categorySelect"
                                    options={[...categories]}
                                    label="Válassz kategóriát..."
                                    size="small"/>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justifyContent={"end"} paddingX={3}>
                            <Button
                                sx={{margin: 'normal'}}
                                variant="contained"
                                type="submit"
                            >Search
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        )}
        </Formik>
    )
}