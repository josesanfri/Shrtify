import { defineNuxtRouteMiddleware, navigateTo, useSupabaseUser } from '#imports';

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser().value;

  // Si el usuario está autenticado, permitir el acceso
  if (user) return;

  // Detectar si la ruta es un enlace acortado (alfanumérico)
  const isShortLink = /^[a-zA-Z0-9]+$/.test(to.params.id as string);
  if (isShortLink) return;

  // Si no es un enlace acortado y el usuario no está autenticado, redirigir a login
  return navigateTo('/login');
});
