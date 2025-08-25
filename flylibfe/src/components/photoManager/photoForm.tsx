import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PhotoFormProps {
  initialValues: { photoId?: number; url: string; description: string; visitedId: number };
  loading?: boolean;
  isUpdate?: boolean;
  onSubmit: (values: { photoId?: number; url: string; description: string; visitedId: number }) => Promise<void>;
  onDelete?: () => void;
}

const validationSchema = Yup.object({
  url: Yup.string().url('URL inválida').required('La URL es obligatoria'),
  description: Yup.string(),
  visitedId: Yup.number().typeError('Debe ser un número').required('El VisitedId es obligatorio'),
  photoId: Yup.number().typeError('Debe ser un número'),
});

const PhotoForm: React.FC<PhotoFormProps> = ({
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
        setStatus({ success: isUpdate ? 'Foto actualizada' : 'Foto creada' });
      } catch {
        setStatus({ error: isUpdate ? 'Error al actualizar foto' : 'Error al crear foto' });
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
            name="photoId"
            value={values.photoId ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            error={touched.photoId && Boolean(errors.photoId)}
            helperText={touched.photoId && errors.photoId}
          />
        )}
        <TextField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.url && Boolean(errors.url)}
          helperText={touched.url && errors.url}
        />
        <TextField
          label="Descripción"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
        <TextField
          label="VisitedId"
          type="number"
          name="visitedId"
          value={values.visitedId}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          fullWidth
          margin="normal"
          error={touched.visitedId && Boolean(errors.visitedId)}
          helperText={touched.visitedId && errors.visitedId}
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

export default PhotoForm;