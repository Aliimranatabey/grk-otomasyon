# Vue 3 Apple-Style Liquid Starter

A modern single-page application built with Vue 3, featuring an Apple-inspired "liquid" visual design with soft gradients, flowing shapes, and glassmorphism.

## Tech Stack

- **Vue 3**: Composition API
- **Vite**: Next Generation Frontend Tooling
- **Vuetify 3**: Material Design Component Framework
- **Pinia**: The intuitive store for Vue.js
- **Vue Router 4**: The official router for Vue.js
- **Axios**: Promise based HTTP client
- **Sass**: CSS with superpowers

## Project Setup

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Architecture Overview

### Key Files & Directories

- **`src/main.js`**: Entry point. Sets up Vue, Vuetify, Pinia, and Router.
- **`src/App.vue`**: Root component. Uses `MainLayout`.
- **`src/components/layout/MainLayout.vue`**: Main layout with navigation bar and content area.
- **`src/components/ui/LiquidBackground.vue`**: The animated liquid background component.
- **`src/views/`**: Page components (`HomeView.vue`, `DashboardView.vue`).
- **`src/store/`**: Pinia stores (`appStore.js` for theme and sample data).
- **`src/services/api.js`**: Axios instance for API requests.
- **`src/assets/styles/main.scss`**: Global styles and glassmorphism utilities.

## Customization

### Theme

The theme colors are defined in `src/main.js` under the `vuetify` configuration. You can adjust the `primary`, `secondary`, and `accent` colors to change the overall look.

### Liquid Background

The animated background is defined in `src/components/ui/LiquidBackground.vue`. You can adjust the gradient colors, animation duration, and blob shapes in the `<style>` section.

### API

The Axios instance is configured in `src/services/api.js`. Change the `baseURL` to connect to your own API.
