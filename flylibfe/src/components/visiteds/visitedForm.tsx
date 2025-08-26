import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface VisitedFormProps {
  initialValues: { id?: number; userId: string; provinceId: number };
  loading?: boolean;
  isUpdate?: boolean;
  onSubmit: (values: { id?: number; userId: string; provinceId: number }) => Promise<void>;
  onDelete?: () => void;
}

const validationSchema = Yup.object({
  userId: Yup.string().required('El UserId es obligatorio'),
  provinceId: Yup.number().typeError('Debe ser un número').required('El ProvinceId es obligatorio'),
  id: Yup.number().typeError('Debe ser un número'),
});

const VisitedForm: React.FC<VisitedFormProps> = ({
  initialValues,
  loading = false,
  isUpdate = false,
  onSubmit,
  onDelete,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    enableReinitialize
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await onSubmit(values);
        setStatus({ success: isUpdate ? 'Registro actualizado' : 'Registro creado' });
      } catch {
        setStatus({ error: isUpdate ? 'Error al actualizar registro' : 'Error al crear registro' });
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
        {isUpdate && (
          <TextField
            label="ID"
            type="number"
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
          label="UserId"
          name="userId"
          value={values.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.userId && Boolean(errors.userId)}
          helperText={touched.userId && errors.userId}
        />
        <TextField
          label="ProvinceId"
          type="number"
          name="provinceId"
          value={values.provinceId}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.provinceId && Boolean(errors.provinceId)}
          helperText={touched.provinceId && errors.provinceId}
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

export default VisitedForm;