import './bootstrap';
import * as React from 'react';
import "./index.css";
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import RootLayout from './layouts/RootLayout';
import { ThemeProvider } from './lib/theme-provider'

createInertiaApp({

  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then((module) => {
    const page = module.default

    page.layout = page.layout || ((page) => <RootLayout>{page}</RootLayout>)
    
    return page
  }),
  setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(
        <React.StrictMode>
          <ThemeProvider defaultTheme="system" storageKey="map-app-theme">
            <App {...props} />
          </ThemeProvider>
        </React.StrictMode>
        );
  },

})
