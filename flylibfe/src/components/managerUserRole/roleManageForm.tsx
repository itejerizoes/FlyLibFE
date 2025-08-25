import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RoleManageFormProps {
  loading?: boolean;
  onCreate: (values: { roleName: string }) => Promise<void>;
  onDelete: (values: { roleName: string }) => Promise<void>;
}

const validationSchema = Yup.object({
  roleName: Yup.string().required('El nombre del rol es obligatorio'),
});

const RoleManageForm: React.FC<RoleManageFormProps> = ({
  loading = false,
  onCreate,
  onDelete,
}) => (
  <Formik
    initialValues={{ roleName: '' }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await onCreate(values);
        setStatus({ success: 'Rol creado correctamente' });
      } catch {
        setStatus({ error: 'Error al crear rol' });
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
          label="Nombre del rol"
          name="roleName"
          value={values.roleName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.roleName && Boolean(errors.roleName)}
          helperText={touched.roleName && errors.roleName}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || isSubmitting}
          >
            Crear rol
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={loading || isSubmitting}
            onClick={async () => {
              setSubmitting(true);
              try {
                await onDelete(values);
                setStatus({ success: 'Rol eliminado correctamente' });
              } catch {
                setStatus({ error: 'Error al eliminar rol' });
              }
              setSubmitting(false);
            }}
          >
            Eliminar rol
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

export default RoleManageForm;