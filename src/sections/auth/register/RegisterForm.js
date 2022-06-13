import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid, Avatar, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddUsersMutation } from 'src/app/appApi';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchReducer } from 'src/feature/refetchDataSlice';
import React from 'react'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [RegisterIntoAccount, { isSuccess, isError, isLoading, error }] = useAddUsersMutation()
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.number().required('Phone number is required'),
    role: Yup.string().default('moderator').required('Role is required'),
  });
  const dispatch = useDispatch()
  const RefetchData = useSelector(state => state.RefetchData.refetch)
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'moderator',
      image: '',
      imageUrl: '',

    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const formData = new FormData();

      formData.append('uploadImage', formik.values.image)
      formData.append('name', formik.values.name)
      formData.append('username', formik.values.username)
      formData.append('email', formik.values.email)
      formData.append('password', formik.values.password)
      formData.append('phoneNumber', formik.values.phoneNumber)
      formData.append('role', formik.values.role)


      RegisterIntoAccount(formData).unwrap()
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const imgUrl = URL.createObjectURL(e.target.files[0])
    formik.setFieldValue('imageUrl', imgUrl)
    formik.setFieldValue('image', image);

  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setRefetchReducer(!RefetchData))
    }
  }, [isSuccess])
  return (
    <>
      <Grid
        container
        justifyItems="center"
        alignItems="center"
        direction='column'
      >
        <Avatar
          src={formik.values.imageUrl}
          sx={{ width: 100, height: 100, my: 1 }}

        />
        <Button sx={{ position: 'relative', mb: 3 }}>
          add
          <label style={{ position: 'absolute', width: '100%', height: '100%' }} htmlFor="uploadImage">
            <input onChange={handleImageChange} type="file" id="uploadImage" style={{ display: 'none' }} />
          </label>
        </Button>
      </Grid>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                label="username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete="phone"
              name="phoneNumber"
              type="number"
              label="phone number"
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name='password'
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={formik.values.role}
                label="Role *"
                name='role'
                {...getFieldProps('role')}
                error={Boolean(touched.role && errors.role)}
                helpertext={touched.role && errors.role}

              >

                <MenuItem selected value='moderator'>moderator</MenuItem>
                <MenuItem value='admin'>admin</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <p style={{ color: 'darkred', textAlign: 'center' }}>{isError && error?.data?.error}</p>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
              Add
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
