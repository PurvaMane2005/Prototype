// List of festivals mapped to dates
const festivals = {
    "2024-09-18": ["Ganesh Chaturthi", "Vishwakarma Puja"],
    "2024-09-19": ["Onam", "Navratri"],
    "2024-10-02": ["Gandhi Jayanti"],
    "2024-10-24": ["Dussehra"]
  };
  
  // Current month and year
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  // Array of month names
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Function to generate calendar for the current month and year
  function generateCalendar(month, year) {
    const daysContainer = document.getElementById('days');
    const monthYearLabel = document.getElementById('month-year');
  
    // Clear the previous days
    daysContainer.innerHTML = '';
  
    // Set the month and year label
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;
  
    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Generate empty slots for days of the week before the first day
    for (let i = 0; i < firstDay; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.classList.add('day');
      daysContainer.appendChild(emptySlot);
    }
  
    // Generate the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.dataset.date = dateStr;
      dayElement.textContent = day;
  
      // Check if the day has festivals
      if (festivals[dateStr]) {
        const festivalList = document.createElement('div');
        festivalList.classList.add('festival-list');
  
        festivals[dateStr].forEach(festival => {
          const festivalItem = document.createElement('div');
          festivalItem.classList.add('festival-item');
          festivalItem.textContent = festival;
  
          // Onclick event to redirect to festival detail page
          festivalItem.onclick = () => showFestivalDetails(festival);
          festivalList.appendChild(festivalItem);
        });
  
        dayElement.appendChild(festivalList);
      }
  
      daysContainer.appendChild(dayElement);
    }
  }
  
  // Function to show festival details
  function showFestivalDetails(festival) {
    const formattedFestival = festival.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/festivals/${formattedFestival}.html`;
  }
  
  // Function to handle next month button
  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });
  
  // Function to handle previous month button
  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });
  
  // Initial calendar generation
  generateCalendar(currentMonth, currentYear);