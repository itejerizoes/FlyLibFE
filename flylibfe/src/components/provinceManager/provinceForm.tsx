import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ProvinceFormProps {
  initialValues: { provinceId?: number; name: string; countryId: number };
  loading?: boolean;
  isUpdate?: boolean;
  onSubmit: (values: { provinceId?: number; name: string; countryId: number }) => Promise<void>;
  onDelete?: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  countryId: Yup.number().typeError('Debe ser un número').required('El CountryId es obligatorio'),
  provinceId: Yup.number().typeError('Debe ser un número'),
});

const ProvinceForm: React.FC<ProvinceFormProps> = ({
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
        setStatus({ success: isUpdate ? 'Provincia actualizada' : 'Provincia creada' });
      } catch {
        setStatus({ error: isUpdate ? 'Error al actualizar provincia' : 'Error al crear provincia' });
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
            name="provinceId"
            value={values.provinceId ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            error={touched.provinceId && Boolean(errors.provinceId)}
            helperText={touched.provinceId && errors.provinceId}
          />
        )}
        <TextField
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          label="CountryId"
          type="number"
          name="countryId"
          value={values.countryId}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.countryId && Boolean(errors.countryId)}
          helperText={touched.countryId && errors.countryId}
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

export default ProvinceForm;