import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RegisterFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (values: { email: string; displayName: string; password: string }) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  displayName: Yup.string().required('El nombre es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

const RegisterForm: React.FC<RegisterFormProps> = ({
  loading,
  error,
  onSubmit,
}) => (
  <Formik
    initialValues={{ email: '', displayName: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await onSubmit(values);
        setStatus({ success: '¡Registro exitoso!' });
      } catch (e) {
        setStatus({ error: error || 'Error al registrar usuario' });
      }
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting,
      status,
    }) => (
      <Form>
        <TextField
          label="Correo"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          placeholder="Correo electrónico"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="Nombre"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          placeholder="Nombre completo"
          error={touched.displayName && Boolean(errors.displayName)}
          helperText={touched.displayName && errors.displayName}
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          placeholder="Contraseña"
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading || isSubmitting} fullWidth>
            Registrarse
          </Button>
        </Box>
        {status?.error && (
          <Typography align="center" color="error" sx={{ mt: 2 }}>
            {status.error}
          </Typography>
        )}
        {status?.success && (
          <Typography align="center" color="primary" sx={{ mt: 2 }}>
            {status.success}
          </Typography>
        )}
      </Form>
    )}
  </Formik>
);

export default RegisterForm;