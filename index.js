import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardMedia, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as yup from 'yup';
import Imgmain from '../../../../assets/images/auth/appLogo.svg';
import Picture from '../customRightComponent';
import { loginUser } from '../redux/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
  // password: yup.string().required('Password is required')
});
export default function SignIn() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.userAuth?.userLogin?.sent);
  const navigate = useNavigate();
console.log(userStatus)
  useEffect(()=>{
if(userStatus){
  navigate("/otp")
}
  },[userStatus])

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    dispatch(loginUser({ ...data }));
    console.log(data);
  };
  return (
    <Grid container component="main" sx={{ height: '100vh', width: '100%', backgroundColor: '#E3F7FF' }}>
      <Grid
        style={{ backgroundColor: '#FFFFFF' }}
        sx={{
          borderTopRightRadius: '60px',
          borderBottomRightRadius: '60px',
          width: { xs: '100%', sm: '100%', md: '50%' }
        }}
        item
        xs={12}
        sm={12}
        md={6}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF'
          }}
        >
          <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={6} sx={{ width: '80%' }}>
            <CardMedia component="img" src={Imgmain} alt="Certlane Logo" style={{ width: '100px', height: 'auto' }} />
            <Typography variant="h1" fontSize={33} fontWeight={600}>
              Login
            </Typography>
          </Stack>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} alignContent={'center'} style={{ width: '80%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} display={'flex'} alignContent={'center'} flexDirection={'column'} flexWrap="wrap" mt={5}>
                <Typography fontWeight={600} variant="h3" fontSize={16}>
                  Email *
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{
                        width: '100%'
                      }}
                      required
                      size="small"
                      placeholder="example@123"
                      error={!!formState.errors.email}
                      helperText={formState.errors.email?.message}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} display={'flex'} alignContent={'center'} flexDirection={'column'} flexWrap="wrap" mt={3}>
                <Typography fontWeight={600} variant="h3" fontSize={16}>
                  otp *
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{
                        width: '100%'
                      }}
                      required
                      size="small"
                      type="password"
                      placeholder="********"
                      error={!!formState.errors.password}
                      helperText={formState.errors.password?.message}
                    />
                  )}
                />
              </Grid> */}
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                style={{
                  background: '#EC8222',
                  borderRadius: '82px',
                  boxShadow: '0px 4px 4px 0 #00000025',
                  textTransform: 'none'
                }}
                sx={{ mt: 3 }}
                fontSize={16}
              >
                Login
              </Button>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography fontSize={16} fontFamily={'Popins,sans-serif'}>
                  Have no account?{' '}
                  <Link href="/sign-up" variant="body2" style={{ color: '#EC8222', textDecoration: 'none' }} fontSize={15}>
                    Register Here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Picture />
    </Grid>
  );
}
