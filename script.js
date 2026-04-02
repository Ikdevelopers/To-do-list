// Fixed variables to target correctly spelled classes
const sidebar = document.querySelector(".sidebar");
const toggler = document.querySelector(".sidebar-toggle");
const menuToggleBtn = document.querySelector(".menu-toggle"); // Renamed to avoid clashing with function

const collapsedSidebarHeight = "56px";

toggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// Fixed template literal formatting (using ` instead of ')
const toggleMenu = (isMenuActive) => {
    sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
    menuToggleBtn.querySelector("span").innerText = isMenuActive ? "close" : "menu";
}

menuToggleBtn.addEventListener("click", () => {
    // Pass the boolean result of toggling the class into the toggleMenu function
    toggleMenu(sidebar.classList.toggle("menu-active"));
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 728) {
        // Clear inline style so CSS takes over on desktop sizes
        sidebar.style.height = ""; 
        sidebar.classList.remove("menu-active");
        menuToggleBtn.querySelector("span").innerText = "menu";
    } else {
        sidebar.classList.remove("collapsed");
        // Re-evaluate height based on whether the mobile menu is currently open
        sidebar.style.height = sidebar.classList.contains("menu-active") ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
    }
});