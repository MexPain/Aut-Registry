import * as Yup from "yup";
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Formik, Form} from "formik";
import FormTextField from "../components/FormTextField";
import {useEffect, useState} from "react";
import ItemService from "../services/item.service";
import SelectField from "../components/SelectField";
import {FileUploader} from "../components/fileUpload/FileUploader";

const NewItemForm = () => {

    const theme = useTheme()

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect( () => {
        ItemService.getCategories()
            .then( (response) => {
                setCategories([...response.data])
            })
        ItemService.getSubCategories()
            .then( (response) => {
                setSubCategories([...response.data])
            })
    }, [])

    const initialValues = {
        name: "",
        category: "",
        subCategory: "",
        images: [],
        description: "",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("The item must have a name"),
        category: Yup.string()
            .required("Please select a category"),
        subCategory: Yup.string()
            .required("Please select a subcategory"),

    })

    return(
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
                    Add new Item to database
                </Typography>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={(values, {setSubmitting}) => {
                        ItemService.addNewItem(
                            values.name,
                            values.category,
                            values.subCategory,
                            values.images.length > 0 ? values.images[0].url : null,
                            values.description
                        ).then((success) => {
                            //TODO success alert
                            setSubmitting(false)
                        }, (error) => {
                            console.log(error)
                            setSubmitting(false)
                        })
                    }}
                >{({ values, errors, isValid, isSubmitting }) =>(
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormTextField
                                    label="Name*"
                                    name="name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="category"
                                    label="Category*"
                                    options={[...categories]}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="subCategory"
                                    label="Subcategory*"
                                    options={[...subCategories]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormTextField
                                    multiline={true}
                                    rows={4}
                                    name="description"
                                    label="Description"
                                    placeholder="Some useful info about the item..."
                                />
                            </Grid>

                            <Typography marginLeft={2} marginTop={2} variant="subtitle1">Upload image pictures</Typography>
                            <Grid container item>
                                <FileUploader name="images"/>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginTop: theme.spacing(2),
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24}/> : 'Create item'}
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="caption">Fields marked with * are mandatory</Typography>
                            </Grid>
                        </Grid>
                    </Form>
                )}
                </Formik>
            </Paper>
        </Container>
    )
}
export default NewItemForm