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

// Adding tasks using dom concepts
const input = document.getElementById('taskInput');
  const list  = document.getElementById('taskList');

  function addTask() {
    const text = input.value.trim();
    if (!text) return; // stop if input is empty

    // 1. Create a new <li> element
    const li = document.createElement('li');

    // 2. Set its text content
    li.textContent = text;

    // 3. Append it to the <ul> list
    list.appendChild(li);

    // 4. Clear the input field
    input.value = '';
  }

  // Also trigger on Enter key press
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
  });