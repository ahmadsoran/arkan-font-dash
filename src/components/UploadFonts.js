import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, Grid, Button, Container, Alert, Typography, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react'
import { useUploadFontMutation } from 'src/app/appApi';
import Page from './Page';
import { Link } from 'react-router-dom';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

export default function UploadFonts() {

    const [FontStyles, setFontStyles] = useState([]);
    const [ShowAlert, setShowAlert] = useState(false);
    const [EditSample, setEditSample] = useState(false)
    const RegisterSchema = Yup.object().shape({
        KUname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('kurdish font name required'),
        ENname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('english font name required'),
        testText: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
    });
    const [UploadFont, { isError, isLoading, error, data, isSuccess }] = useUploadFontMutation()

    const formik = useFormik({
        initialValues: {
            KUname: '',
            ENname: '',
            testText: '',
            regularPath: '',
            regularName: '',


        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            const formData = new FormData();
            formData.append('KUname', formik.values.KUname);
            formData.append('ENname', formik.values.ENname);
            formik.values.testText && formData.append('testText', formik.values.testText);
            formData.append('regular', formik.values.regularPath);
            FontStyles?.forEach(font => {
                formData.append('styles', font.file);
            })

            UploadFont(formData).unwrap()

        },
    });
    const { errors, touched, handleSubmit, getFieldProps } = formik;
    const handleRegularFileChange = (e) => {
        const regualr = e.target.files[0];
        formik.setFieldValue('regularPath', regualr ? regualr : '');
        formik.setFieldValue('regularName', regualr?.name);

    };
    const handleStylesFileChange = (e) => {
        const styles = e.target.files[0];
        setFontStyles([...FontStyles, {
            name: styles?.name,
            file: styles,
        }])

    };

    React.useEffect(() => {
        if (isSuccess) {
            setFontStyles([])
            formik.resetForm()
            setShowAlert(true)
        }
        if (data?.message) {
            var timeOutAlert = setTimeout(() => {
                setShowAlert(false)
            }, 6000);
        }
        return () => {
            clearTimeout(timeOutAlert)
        }
    }, [isSuccess, data]) // eslint-disable-line 

    return (
        <>
            <Page title="Font Upload">
                <Container sx={{ px: 5 }}>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <Button sx={{ position: 'relative', width: '100%', py: 4, backgroundColor: '#3a96ff3b' }}>
                                    {formik.values.regularName || 'Add Regualr Font '}

                                    <label style={{ position: 'absolute', width: '100%', height: '100%' }} htmlFor="uploadImage">
                                        <input onChange={handleRegularFileChange} type="file" id="uploadImage" style={{ display: 'none' }} />
                                    </label>

                                </Button>
                                <hr style={{ opacity: .5 }} />
                                <Typography variant="h6" align='center' fontWeight={300}>
                                    Font Styles ( <span style={{ fontSize: 15 }}>
                                        Bold , Italic , Bold Italic , 900 ,800 ...etc
                                    </span>
                                    )
                                </Typography>
                                <Grid container display={'flex'} >

                                    {
                                        FontStyles?.map((item, index) => {
                                            return (
                                                <Button key={index} sx={{ m: 1, position: 'relative', width: 'fit-content', py: 4, backgroundColor: '#3a96ff3b' }}>
                                                    {item.name}
                                                </Button>
                                            )
                                        })


                                    }
                                    <Button sx={{ position: 'relative', width: 'fit-content', py: 4, backgroundColor: '#f5f9003b' }} color='warning'>
                                        +

                                        <label style={{ position: 'absolute', width: '100%', height: '100%' }} htmlFor="styleFiles">
                                            <input onChange={handleStylesFileChange} type="file" id="styleFiles" style={{ display: 'none' }} />
                                        </label>

                                    </Button>
                                </Grid>
                                <hr style={{ opacity: .5 }} />

                                <TextField
                                    fullWidth
                                    label="KU Font Name"
                                    {...getFieldProps('KUname')}
                                    error={Boolean(touched.KUname && errors.KUname)}
                                    helperText={touched.KUname && errors.KUname}
                                />
                                <TextField
                                    fullWidth
                                    label="EN Font Name"
                                    {...getFieldProps('ENname')}
                                    error={Boolean(touched.ENname && errors.ENname)}
                                    helperText={touched.ENname && errors.ENname}
                                />

                                <TextField
                                    fullWidth
                                    label="Sample Text OPTIONAL"
                                    rows={5}
                                    {...getFieldProps('testText')}
                                    error={Boolean(touched.testText && errors.testText)}
                                    helperText={touched.testText && errors.testText}
                                    icon={<i className="fas fa-font" />}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => setEditSample((prev) => !prev)}>
                                                    <Iconify icon={!EditSample ? 'clarity:edit-line' : 'carbon:edit-off'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    disabled={!EditSample}
                                    value={EditSample ? formik.values.testText : 'لە ژیانماندا ماری زۆر ھەن لە شێوەی مرۆڤ خودایە بمانپارێزە لە خراپی ژەھریان'}
                                />

                                <p style={{ color: 'darkred', textAlign: 'center' }}>{isError && error?.data?.error}</p>
                                {
                                    ShowAlert && <Alert severity="success" color='success'>{data?.message} check it out <Link to='../fonts'>Here</Link></Alert>
                                }

                                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                                    Upload
                                </LoadingButton>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Container>
            </Page>
        </>
    );
}
