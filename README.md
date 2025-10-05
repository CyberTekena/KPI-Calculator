# Hotel KPI Calculator

A single-page web application that calculates key hotel performance indicators in real time. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Real-time calculations** - KPIs update instantly as you type
- **Three core metrics:**
  - **Occupancy Rate (%)** - Percentage of rooms occupied
  - **ADR (Average Daily Rate)** - Average revenue per room sold
  - **RevPAR (Revenue Per Available Room)** - Revenue efficiency metric
- **Edge case handling** - Displays "N/A" with helpful hints when calculations cannot be performed
- **Responsive design** - Works seamlessly from mobile (360px) to desktop (1440px+)
- **Accessible** - Semantic HTML, ARIA labels, keyboard navigation support
- **Visual polish** - Smooth animations and hover effects

## How to Run

### Option 1: Direct File Access
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No server or build process required!

### Option 2: Local Server (Recommended for Development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
hotel-kpi-calculator/
├── index.html      # Main HTML structure with semantic markup
├── styles.css      # Complete styling with CSS variables and responsive design
├── script.js       # Calculation logic and real-time update handlers
└── README.md       # This file
```

## Test Cases

Use these scenarios to verify the calculator works correctly:

### Test Case 1: Normal Operation
**Inputs:**
- Total Rooms Available: `200`
- Rooms Sold: `150`
- Total Room Revenue: `15000.00`

**Expected Results:**
- Occupancy = `75.00%` (150/200 × 100)
- ADR = `$100.00` (15000 / 150)
- RevPAR = `$75.00` (15000 / 200)

### Test Case 2: Zero Rooms Sold
**Inputs:**
- Total Rooms Available: `100`
- Rooms Sold: `0`
- Total Room Revenue: `0.00`

**Expected Results:**
- Occupancy = `0.00%`
- ADR = `N/A` (cannot divide by zero rooms sold)
- RevPAR = `$0.00`

**Note:** ADR shows "N/A" with hint: "Rooms Sold must be > 0 to compute ADR"

### Test Case 3: Zero Total Rooms
**Inputs:**
- Total Rooms Available: `0`
- Rooms Sold: `0`
- Total Room Revenue: `500.00`

**Expected Results:**
- Occupancy = `N/A` (cannot divide by zero total rooms)
- ADR = `N/A` (cannot divide by zero rooms sold)
- RevPAR = `N/A` (cannot divide by zero total rooms)

**Note:** All metrics show "N/A" with appropriate hint messages

### Test Case 4: High Occupancy
**Inputs:**
- Total Rooms Available: `50`
- Rooms Sold: `48`
- Total Room Revenue: `12000.00`

**Expected Results:**
- Occupancy = `96.00%`
- ADR = `$250.00`
- RevPAR = `$240.00`

### Test Case 5: Decimal Revenue
**Inputs:**
- Total Rooms Available: `75`
- Rooms Sold: `60`
- Total Room Revenue: `8567.89`

**Expected Results:**
- Occupancy = `80.00%`
- ADR = `$142.80` (8567.89 / 60)
- RevPAR = `$114.24` (8567.89 / 75)

## Video Demo Script (5-10 minutes)

Use this script when recording your demonstration video:

### Section 1: Introduction (0:00 - 0:30)
- **Introduce yourself:** "Hi, my name is [Your Name] and I'm applying for the [Position] role."
- **App overview:** "Today I'll demonstrate the Hotel KPI Calculator, a real-time web application that helps hotel managers calculate three critical performance metrics: Occupancy Rate, Average Daily Rate, and Revenue Per Available Room."

### Section 2: Live Demonstration (0:30 - 2:00)
- **Show the interface:** Navigate through the clean, responsive design
- **Test Case 1 (Normal):** Enter values: 200 rooms, 150 sold, $15,000 revenue
  - Point out how all three KPIs update instantly
  - Highlight the visual animations on the KPI cards
- **Test Case 2 (Edge Case - Zero Rooms Sold):** Change Rooms Sold to 0
  - Show that ADR displays "N/A" with an explanatory hint
  - Explain why this edge case handling is important
- **Test Case 3 (Edge Case - Zero Total Rooms):** Set Total Rooms to 0
  - Show all three metrics display "N/A" with hints
  - Demonstrate the clear button functionality

### Section 3: Code Walkthrough (2:00 - 4:30)
- **index.html:** "The HTML uses semantic markup with proper labels, ARIA attributes for accessibility, and includes input validation attributes like min='0' and step values."
- **styles.css:** "The CSS uses CSS variables for consistent theming, implements a mobile-first responsive design with breakpoints at 768px and 1024px, and includes subtle animations for user feedback."
- **script.js:** "The JavaScript is organized into pure calculation functions that handle the business logic, and an updateAll() function that orchestrates real-time updates using the 'input' event listener for instant feedback."

### Section 4: Technical Highlights (4:30 - 5:00)
- **Edge case handling:** "Every calculation function checks for division by zero and negative values, returning null when a metric cannot be computed, which triggers the N/A display with contextual hints."
- **Accessibility:** "The form uses semantic HTML, proper label associations, ARIA descriptions, and keyboard navigation works throughout."
- **Responsive design:** "The layout adapts from single-column mobile views at 360px to a three-column desktop grid at 1024px+ using CSS Grid."

### Section 5: Closing & Future Enhancements (5:00 - 5:30)
- **Summary:** "This calculator demonstrates real-time calculation, defensive programming for edge cases, and polished UX with zero dependencies."
- **Future enhancements:** "In a production version, I would add features like:
  - Historical data tracking with charts
  - CSV export for reporting
  - Multi-property comparison views
  - Integration with property management systems
  - Dark mode preference support"
- **Thank you:** "Thank you for your time. I look forward to discussing this project and the role with you."

## Key Features & Implementation Details

### Real-Time Updates
- Uses the `input` event listener for instant feedback as users type
- Calculations are performed on every keystroke
- Visual highlight animation provides feedback when values change

### Currency Formatting
- Uses `Intl.NumberFormat` API for consistent USD formatting
- Always displays two decimal places (e.g., $125.50)
- Handles large numbers with comma separators (e.g., $1,234.56)

### Edge Case Handling
- **Division by zero:** Displays "N/A" instead of Infinity or NaN
- **Negative values:** Prevented via HTML `min="0"` and JavaScript validation
- **Empty inputs:** Treated as zero to allow progressive data entry
- **Context-sensitive hints:** Explains why a metric cannot be calculated

### Responsive Breakpoints
- **Mobile (≤767px):** Single-column layout, optimized for touch
- **Tablet (768px - 1023px):** Two-column input grid, responsive KPI cards
- **Desktop (≥1024px):** Three-column layouts throughout

### Accessibility
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Proper `<label>` associations with `for` attributes
- ARIA descriptions via `aria-describedby`
- Keyboard navigation support
- Focus indicators for keyboard users

## Browser Support

Works in all modern browsers:
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Opera (76+)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, custom properties, animations
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **Web APIs** - Intl.NumberFormat for currency formatting

## Author

Built as a demonstration of clean, professional front-end development with vanilla web technologies.

---

**License:** MIT
