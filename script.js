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


// Add this after your existing toggle listeners
// Add this function to update margins dynamically
function updateMainContentMargins() {
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;
  
  const isCollapsed = sidebar.classList.contains('collapsed');
  const isMobile = window.innerWidth <= 728;
  
  if (isMobile) {
    mainContent.style.marginLeft = '16px';
    mainContent.style.marginRight = '16px';
    mainContent.style.marginTop = '72px';
  } else {
    // Left margin: adjust based on sidebar state
    mainContent.style.marginLeft = isCollapsed ? '127px' : '302px';
    // Right margin: INCREASE when collapsed (your request!)
    mainContent.style.marginRight = isCollapsed ? '40px' : '16px';
    mainContent.style.marginTop = '16px';
  }
}

// Hook into existing events + initial load
toggler.addEventListener("click", updateMainContentMargins);
menuToggleBtn.addEventListener("click", updateMainContentMargins);
window.addEventListener("resize", updateMainContentMargins);
document.addEventListener("DOMContentLoaded", updateMainContentMargins);