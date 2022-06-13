import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useLoginUserMutation } from 'src/app/appApi';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { setToken } from 'src/feature/tokenSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [LoginIntoAccount, { isSuccess, isError, isLoading, data }] = useLoginUserMutation()
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('username must be a valid username ').required('username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      LoginIntoAccount({

        username: formik.values.username,
        password: formik.values.password,

      }).unwrap()

    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  useEffect(() => {
    if (data) {
      console.log(data)
      dispatch(setToken(data))

      if (isSuccess) {
        window.location.href = '/dashboard/app';
      }
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username) || isError}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password) || isError}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton fullWidth sx={{ mt: 5 }} size="large" type="submit" variant="contained" loading={isLoading}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider >
  );
}
