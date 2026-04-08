// ✅ Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    
    // ===== SIDEBAR SETUP (same as index.html) =====
    const sidebar       = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const menuToggle    = document.querySelector(".menu-toggle");

    // DESKTOP: Toggle sidebar collapse
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    // MOBILE: Toggle menu expansion
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = sidebar.classList.toggle("menu-active");
            const icon = menuToggle.querySelector("span");
            if (icon) {
                icon.textContent = isExpanded ? "close" : "menu";
            }
        });
    }

    // AUTO-RESET on resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 728) {
            sidebar.classList.remove("menu-active");
            const icon = menuToggle?.querySelector("span");
            if (icon) icon.textContent = "menu";
        } else {
            sidebar.classList.remove("collapsed");
        }
    });

    // ===== CALENDAR SETUP =====
    let currentDate = new Date();
    const todayDate = new Date();

    // Format date as "Day, Month Date, Year"
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Display today's date in info box
    document.getElementById('todayDate').textContent = formatDate(todayDate);

    // ── Render Calendar ────────────────────────────
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update header with current month and year
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;

        // Get first day of month (0 = Sunday, 1 = Monday, etc.)
        const firstDay = new Date(year, month, 1).getDay();
        
        // Get number of days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get number of days in previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const calendarDatesContainer = document.getElementById('calendarDates');
        calendarDatesContainer.innerHTML = ''; // Clear previous dates

        // Add dates from previous month (grayed out)
        for (let i = firstDay - 1; i >= 0; i--) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date other-month';
            dateElement.textContent = daysInPrevMonth - i;
            calendarDatesContainer.appendChild(dateElement);
        }

        // Add dates of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = day;

            // Check if this is today
            if (
                day === todayDate.getDate() &&
                month === todayDate.getMonth() &&
                year === todayDate.getFullYear()
            ) {
                dateElement.classList.add('today');
            }

            // Click handler to select date
            dateElement.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.calendar-date.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                // Add selection to clicked date (unless it's today, which has its own style)
                if (!dateElement.classList.contains('today')) {
                    dateElement.classList.add('selected');
                }

                // Update selected date display
                const selectedFullDate = new Date(year, month, day);
                document.getElementById('selectedDate').textContent = formatDate(selectedFullDate);
            });

            calendarDatesContainer.appendChild(dateElement);
        }

        // Add dates from next month (grayed out)
        const totalCells = calendarDatesContainer.children.length;
        const remainingCells = 42 - totalCells; // 6 rows × 7 columns = 42 cells
        for (let day = 1; day <= remainingCells; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date other-month';
            dateElement.textContent = day;
            calendarDatesContainer.appendChild(dateElement);
        }
    }

    // ── Navigation Buttons ──────────────────────────
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // "Today" button - jump to current date
    document.getElementById('todayBtn').addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
        
        // Auto-select today's date
        const todayElement = document.querySelector('.calendar-date.today');
        if (todayElement) {
            document.querySelectorAll('.calendar-date.selected').forEach(el => {
                el.classList.remove('selected');
            });
            document.getElementById('selectedDate').textContent = formatDate(todayDate);
        }
    });

    // Initial render
    renderCalendar();

}); // ← end of DOMContentLoaded
