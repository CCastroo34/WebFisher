# 🎣 WebFisher

Landing page + autenticación de WebFisher. Vite + JS puro + Supabase. Deploy continuo en Vercel vía GitHub.

## Requisitos
- Node.js 18+ y npm
- Cuenta de [Supabase](https://supabase.com) (proyecto con Auth por email/password habilitado)
- Cuenta de [Vercel](https://vercel.com) conectada al repo de GitHub

## Dependencias del proyecto
- `@supabase/supabase-js` — cliente de autenticación/DB
- `vite` (dev) — bundler y dev server

## Instalación
```bash
npm install
cp .env.example .env
# completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env
npm run dev
```

## Build de producción
```bash
npm run build
npm run preview
```

## Variables de entorno (Vercel → Settings → Environment Variables)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`

## Estructura
```
index.html / privacy.html / terms.html / 404.html
public/            assets estáticos (imágenes, video, robots.txt, sitemap.xml)
src/
  main.js          entrypoint
  supabaseClient.js
  styles/main.css
  i18n/i18n.js
  utils/sanitize.js
  auth/
    authService.js
    authModal.js
  components/
    authHeader.js
    downloadModal.js
    liveCounters.js
vercel.json        headers de seguridad + cache
```

## Deploy
1. Push a GitHub.
2. Importa el repo en Vercel (framework: Vite, detectado automáticamente).
3. Configura las variables de entorno en Vercel.
4. Cada push a `main` despliega automáticamente.
