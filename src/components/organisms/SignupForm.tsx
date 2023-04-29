import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import TextInput from '../atoms/TextInput';
import PasswordInput from '../atoms/PasswordInput';
import { LoadingButton } from '@mui/lab';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Campo requerido').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: Yup.string().required('La contraseña es requerida').min(8, 'Mínimo 8 caracteres'),
})

const SignupForm = () => {
  const { signup } = useFirebaseAuth();
  
  const navigate = useNavigate();

  const onSubmit = async (values: SignupFormValues) => {
    await signup(values.email, values.password);
    navigate('/');
  }

  return (
    <div
      className='mt-20% flex flex-col w-4/5 sm:w-1/2 lg:w-1/3 p-8 space-y-5 shadow-xl'
      style={{margin: '200px auto'}}
    >
      <Formik<SignupFormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
        validateOnBlur
        validateOnChange
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          isValidating
        }) => (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-5'
          >
            <Typography>
              Por favor crea un usuario.
            </Typography>
            <TextInput
              id='email'
              className='w-80'
              type='email'
              label="Correo Electrónico"
              placeholder='correo.ejemplo@correo.com'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              required
            />
            <PasswordInput
              id='password'
              className='w-80'
              label="contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              required
            />
            <LoadingButton
              type='submit'
              loading={isSubmitting || isValidating}
              disabled={!isValid || isValidating}
              variant='contained'
              color='primary'
            >
              Iniciar sesión
            </LoadingButton>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default SignupForm