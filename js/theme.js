// Sección de cambio de color (temas: claro y oscuro)

// Detectar el tema del sistema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const html = document.documentElement;
  
    // Establecer el tema inicial basado en la preferencia del sistema
    html.setAttribute("data-theme", userPrefersDark ? "dark" : "light");
});
  
// Alternar entre temas al hacer clic en el botón
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
  
    // Cambiar entre temas
    html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
}