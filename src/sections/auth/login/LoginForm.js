import * as Yup from 'yup';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios,{instance3} from '../../../axios';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState()
  const [result, setResult] = useState("")
  let result2;

  const LoginSchema = Yup.object().shape({

  });



  const defaultValues = {
    mobile: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    console.warn(mobile, password)
      const data = {
        'mobile': mobile,
        'password': password
      }
      const formData = new FormData()
      formData.append("mobile", mobile)
      formData.append("password", password)

      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      await instance3.post('user/login_web', formData)
      .then(response => {
        result2 = response.data;
      })
      .catch(error => {});

      // result = await result.json();
      // console.log(result)
      if (result2.data) {
        localStorage.setItem('user', JSON.stringify(result2.data))
        localStorage.setItem('token', JSON.stringify(result2.token))
        navigate('/maindashboard/apps')
      } else {
        setError('Mobile or Password did not match.')
      }

  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}> {error}</p>
      <Stack spacing={3}>
        <RHFTextField type="number" name="mobile" label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} 
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 10)
              }}/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password} onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>


      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
