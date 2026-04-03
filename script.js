// ✅ Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const menuToggle = document.querySelector(".menu-toggle");
    
    // ===== DESKTOP: Toggle sidebar collapse =====
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }
    
    // ===== MOBILE: Toggle menu expansion =====
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = sidebar.classList.toggle("menu-active");
            
            // Update icon: menu ↔ close
            const icon = menuToggle.querySelector("span");
            if (icon) {
                icon.textContent = isExpanded ? "close" : "menu";
            }
        });
    }
    
    // ===== AUTO-RESET on resize =====
    window.addEventListener("resize", () => {
        // If switching to desktop, clean up mobile state
        if (window.innerWidth > 728) {
            sidebar.classList.remove("menu-active");
            const icon = menuToggle?.querySelector("span");
            if (icon) icon.textContent = "menu";
        }
        // If switching to mobile, ensure collapsed state is reset
        else {
            sidebar.classList.remove("collapsed");
        }
    });
});

