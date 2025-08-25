import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface RoleAssignFormProps {
  loading?: boolean;
  roles: string[];
  onSubmit: (values: { userEmail: string; role: string }) => Promise<void>;
  onRemove: (values: { userEmail: string; role: string }) => Promise<void>;
}

const validationSchema = Yup.object({
  userEmail: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  role: Yup.string().required('El rol es obligatorio'),
});

const RoleAssignForm: React.FC<RoleAssignFormProps> = ({
  loading = false,
  roles,
  onSubmit,
  onRemove,
}) => (
  <Formik
    initialValues={{ userEmail: '', role: '' }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await onSubmit(values);
        setStatus({ success: 'Rol asignado correctamente' });
      } catch {
        setStatus({ error: 'Error al asignar rol' });
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
      setSubmitting,
      setStatus,
    }) => (
      <Form>
        <TextField
          label="Email de usuario"
          name="userEmail"
          value={values.userEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.userEmail && Boolean(errors.userEmail)}
          helperText={touched.userEmail && errors.userEmail}
        />
        <TextField
          select
          label="Rol"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.role && Boolean(errors.role)}
          helperText={touched.role && errors.role}
        >
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || isSubmitting}
          >
            Asignar rol
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={loading || isSubmitting}
            onClick={async () => {
              setSubmitting(true);
              try {
                await onRemove(values);
                setStatus({ success: 'Rol removido correctamente' });
              } catch {
                setStatus({ error: 'Error al remover rol' });
              }
              setSubmitting(false);
            }}
          >
            Remover rol
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

export default RoleAssignForm;