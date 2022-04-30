import {useTheme} from "@mui/material/styles";
import * as Yup from "yup";
import {Button, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import FormTextField from "../components/FormTextField";
import SelectField from "../components/SelectField";
import {useEffect, useState} from "react";
import ItemService from "../services/item.service";

const AddCategoriesForm = () => {

    const theme = useTheme()

    const [parentCategories, setParentCategories] = useState([])

    useEffect(() => {
        ItemService.getCategories()
            .then( (response) => {
                setParentCategories([...response.data])
            })
    }, []);


    const categoriesInitialValues = {
        name: ""
    }

    const subCategoriesInitialValues = {
        name: "",
        parentName: ""
    }

    const categoriesValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name the new category")
    })

    const subCategoriesValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name the new subcategory"),
        parentName: Yup.string()
            .required("Choose a parent category"),
    })

    return (
        <Container maxWidth="md" sx={{marginTop: theme.spacing(5)}}>
            <Paper elevation={2} sx={{
                padding: theme.spacing(3),
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    Add new categories
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Paper elevation={2} sx={{
                            padding: theme.spacing(3),
                            margin: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Typography component="h1" variant="h6">
                                Category
                            </Typography>
                            <Formik
                                initialValues={{...categoriesInitialValues}}
                                validationSchema={categoriesValidationSchema}
                                validateOnBlur={true}
                                validateOnChange={true}
                                onSubmit={(values, {setSubmitting}) => {
                                    ItemService.addNewCategory(
                                        values.name
                                    ).then((success) => {
                                        //TODO success alert
                                        console.log("Success")
                                        setSubmitting(false)
                                    }, (error) => {
                                        console.log(error)
                                        setSubmitting(false)
                                    })
                                }}
                            >{({values, errors, isValid, isSubmitting}) => (
                                <Form>
                                    <FormTextField
                                        label="Name*"
                                        name="name"
                                        size="small"
                                        sx={{marginBottom: 2}}
                                    />

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                        sx={{marginBottom: 2}}
                                        disabled={!isValid || isSubmitting}
                                    >
                                        {isSubmitting ? <CircularProgress size={24}/> : 'Create category'}
                                    </Button>

                                </Form>
                            )}
                            </Formik>
                        </Paper>
                    </Grid>


                    <Grid item xs={6}>
                        <Paper elevation={2} sx={{
                            padding: theme.spacing(3),
                            margin: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Typography component="h1" variant="h6">
                                Subcategory
                            </Typography>
                            <Formik
                                initialValues={{...subCategoriesInitialValues}}
                                validationSchema={subCategoriesValidationSchema}
                                validateOnBlur={true}
                                validateOnChange={true}
                                onSubmit={(values, {setSubmitting}) => {
                                    ItemService.addNewSubCategory(
                                        values.name,
                                        values.parentName
                                    ).then((success) => {
                                        //TODO success alert
                                        console.log("Success")
                                        setSubmitting(false)
                                    }, (error) => {
                                        console.log(error)
                                        setSubmitting(false)
                                    })
                                }}
                            >{({values, errors, isValid, isSubmitting}) => (
                                <Form>
                                    <FormTextField
                                        label="Name*"
                                        name="name"
                                        size="small"
                                        sx={{marginBottom: 2}}
                                    />

                                    <SelectField
                                        name="parentName"
                                        options={[...parentCategories]}
                                        label={"Parent name*"}
                                        size="small"
                                        sx={{marginBottom: 2}}
                                    />

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        sx={{marginBottom: 2}}
                                    >
                                        {isSubmitting ? <CircularProgress size={24}/> : 'Add subcategory'}
                                    </Button>
                                </Form>
                            )}
                            </Formik>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
export default AddCategoriesForm