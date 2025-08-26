import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CountryFormProps {
  initialValues: { countryId?: number; name: string; isoCode: string };
  loading?: boolean;
  isUpdate?: boolean;
  onSubmit: (values: { countryId?: number; name: string; isoCode: string; isUpdate: boolean }) => Promise<void>;
  onDelete?: () => void;
}

const validationSchema = Yup.object({
  countryId: Yup.number().when('isUpdate', {
    is: true,
    then: schema => schema.required('El ID es obligatorio').typeError('Debe ser un número'),
    otherwise: schema => schema.notRequired(),
  }),
  name: Yup.string().required('El nombre es obligatorio'),
  isoCode: Yup.string().required('El código ISO es obligatorio'),
  isUpdate: Yup.boolean(),
});

const CountryForm: React.FC<CountryFormProps> = ({
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
        setStatus({ success: isUpdate ? 'País actualizado' : 'País creado' });
      } catch {
        setStatus({ error: isUpdate ? 'Error al actualizar país' : 'Error al crear país' });
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
            type="number"
            name="countryId"
            value={values.countryId ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            error={touched.countryId && Boolean(errors.countryId)}
            helperText={touched.countryId && errors.countryId}
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
          label="ISO Code"
          name="isoCode"
          value={values.isoCode}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.isoCode && Boolean(errors.isoCode)}
          helperText={touched.isoCode && errors.isoCode}
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

export default CountryForm;