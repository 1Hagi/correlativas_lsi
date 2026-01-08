// Sección de cambio de color (temas: claro y oscuro)

// Detectar el tema del sistema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    
    const html = document.documentElement;
    const savedTheme =  localStorage.getItem("theme");

    if(savedTheme){
        //cargar el tema guardado en el local storage
        html.setAttribute("data-theme", savedTheme);
    } else {
        //Si no hay tema guardado se usa el de preferencia por el sistema
        const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        // Establecer el tema inicial basado en la preferencia del sistema
        html.setAttribute("data-theme", userPrefersDark ? "dark" : "light");
    }
});

// Alternar entre temas al hacer clic en el botón
function toggleTheme() { 
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    // Cambiar entre temas y guardar en el local storage
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}




