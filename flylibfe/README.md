# FlyLibFE

FlyLibFE es una aplicación web desarrollada en React para la gestión de usuarios, países, provincias, fotos y registros de visitas.

## Estructura del Proyecto

```
flylibfe/
  ├── public/
  ├── src/
  │   ├── api/           # Lógica de acceso a la API (axios, endpoints)
  │   ├── components/    # Componentes reutilizables
  │   ├── context/       # Contextos globales (ej. Auth)
  │   ├── hooks/         # Custom hooks
  │   ├── pages/         # Páginas principales
  │   ├── styles/        # Archivos de estilos
  │   ├── types/         # Tipos TypeScript
  │   ├── utils/         # Utilidades
  │   └── __tests__/     # Tests unitarios e integración
  ├── README.md
  ├── package.json
  ├── tsconfig.json
  └── ...
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/flylibfe.git
   cd flylibfe
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Scripts Disponibles

- `npm start`: Ejecuta la app en modo desarrollo ([http://localhost:3000](http://localhost:3000)).
- `npm test`: Ejecuta los tests en modo interactivo.
- `npm run build`: Genera el build de producción en la carpeta `build`.
- `npm run eject`: Expone la configuración de Create React App (irreversible).

## Configuración de la API

La configuración de la API se encuentra en [`src/api/axios.ts`](src/api/axios.ts). Modifica la propiedad `baseURL` según la URL de tu backend.

## Testing

Los tests están ubicados en la carpeta [`src/__tests__`](src/__tests__). Se utilizan Jest y React Testing Library para pruebas unitarias e integración.

Ejecuta los tests con:
```sh
npm test
```

## Estructura de Componentes

- **Páginas:** Cada entidad (usuarios, países, provincias, fotos, visitados) tiene su propia página en [`src/pages`](src/pages).
- **Componentes:** Los formularios y listas reutilizables están en [`src/components`](src/components).
- **Hooks:** Custom hooks como [`useFetch`](src/hooks/useFetch.ts) para manejo de datos.

## Autenticación

La autenticación y gestión de tokens se realiza mediante [`src/api/auth.ts`](src/api/auth.ts) y el contexto [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx).

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y agrega tests.
4. Haz un commit (`git commit -am 'Agrega nueva funcionalidad'`).
5. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.

## Licencia

MIT

---

**Documenta tu código**  
- Usa comentarios explicativos en funciones y componentes.
- Agrega JSDoc en funciones complejas.
- Mantén este README actualizado con nuevas instrucciones y dependencias.