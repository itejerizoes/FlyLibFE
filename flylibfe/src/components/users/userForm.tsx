import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface UserFormProps {
  initialValues: { id?: string; displayName: string; authProvider: string };
  loading?: boolean;
  isUpdate?: boolean;
  onSubmit: (values: { id?: string; displayName: string; authProvider: string; isUpdate: boolean }) => Promise<void>;
  onDelete?: () => void;
}

const validationSchema = Yup.object({
  id: Yup.string().when('isUpdate', {
    is: true,
    then: schema => schema.required('El ID es obligatorio'),
    otherwise: schema => schema.notRequired(),
  }),
  displayName: Yup.string().required('El nombre es obligatorio'),
  authProvider: Yup.string().required('El proveedor es obligatorio'),
  isUpdate: Yup.boolean(),
});

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  loading = false,
  isUpdate = false,
  onSubmit,
  onDelete,
}) => (
  <Formik
    initialValues={{ ...initialValues, isUpdate }}
    validationSchema={validationSchema}
    enableReinitialize
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await onSubmit(values);
        setStatus({ success: isUpdate ? 'Usuario actualizado' : 'Usuario creado' });
      } catch {
        setStatus({ error: isUpdate ? 'Error al actualizar usuario' : 'Error al crear usuario' });
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
        {values.isUpdate && (
          <TextField
            label="ID"
            name="id"
            value={values.id ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            error={touched.id && Boolean(errors.id)}
            helperText={touched.id && errors.id}
          />
        )}
        <TextField
          label="Display Name"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.displayName && Boolean(errors.displayName)}
          helperText={touched.displayName && errors.displayName}
        />
        <TextField
          label="Auth Provider"
          name="authProvider"
          value={values.authProvider}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.authProvider && Boolean(errors.authProvider)}
          helperText={touched.authProvider && errors.authProvider}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading || isSubmitting}>
            {isUpdate ? 'Actualizar' : 'Crear'}
          </Button>
          {isUpdate && onDelete && (
            <Button type="button" variant="outlined" color="error" onClick={onDelete}>
              Eliminar
            </Button>
          )}
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

export default UserForm;