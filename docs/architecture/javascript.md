# JavaScript Patterns

**Purpose**: Common JavaScript patterns used across all 9 pages  
**Audience**: Developers, agents  
**Dependencies**: [Navigation](navigation.md), [Layout](layout.md)  
**Status**: Stable  
**Last Updated**: 2026-07-04

---

## Overview

DJ Dashboard uses vanilla JavaScript (ES5+) with no dependencies. This document catalogs reusable patterns used on all pages.

---

## Pattern 1: Sidebar Toggle

**Purpose**: Collapse/expand sidebar on button click  
**Used On**: All 9 pages  
**Responsive**: Mobile overlay effect

**HTML**:
```html
<button id="sidebarToggle" class="toggle-btn">☰</button>
<aside class="sidebar"><!-- content --></aside>
```

**JavaScript**:
```javascript
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
```

**CSS**:
```css
.sidebar {
    width: 250px;
    transition: width 0.3s ease-in-out;
}

.sidebar.collapsed {
    width: 0;
    overflow: hidden;
}

@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .sidebar.collapsed {
        transform: translateX(0);
    }
}
```

---

## Pattern 2: Active State Management

**Purpose**: Highlight current page in sidebar menu  
**Used On**: All 9 pages  
**Logic**: Remove active from all links, add to clicked

**HTML**:
```html
<ul class="sidebar-menu">
    <li><a href="overview.html" class="active">Dashboard</a></li>
    <li><a href="judiciary.html">Judiciary</a></li>
    <!-- etc -->
</ul>
```

**JavaScript**:
```javascript
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only for page links (not hash anchors)
        if (!link.href.includes('#')) {
            // Remove active from all
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            link.classList.add('active');
        }
    });
});
```

**CSS**:
```css
.sidebar-menu a.active {
    background-color: #ff6b5b;
    color: white;
}
```

---

## Pattern 3: Chart.js Initialization

**Purpose**: Initialize charts on pages with data visualization  
**Used On**: overview.html, judiciary.html, states.html  
**Config**: Custom colors, no legend

**HTML**:
```html
<div class="chart-container">
    <canvas id="myChart"></canvas>
</div>
```

**JavaScript** (Example: Line Chart):
```javascript
const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Metric A',
                data: [10, 20, 15],
                borderColor: '#ff6b5b',
                backgroundColor: 'rgba(255, 107, 91, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Metric B',
                data: [8, 18, 12],
                borderColor: '#13c2c2',
                backgroundColor: 'rgba(19, 194, 194, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false  // No legend
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
```

**Bar Chart Example**:
```javascript
const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['State A', 'State B', 'State C'],
        datasets: [{
            label: 'Development Score',
            data: [65, 72, 58],
            backgroundColor: '#ff6b5b',
            borderRadius: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});
```

---

## Pattern 4: DOM Query & Cache

**Purpose**: Efficient DOM manipulation  
**Best Practice**: Query once, reuse variable

**✅ Good**:
```javascript
const sidebar = document.querySelector('.sidebar');
const toggle = document.getElementById('sidebarToggle');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
```

**❌ Bad**:
```javascript
// Querying DOM multiple times
document.querySelector('.sidebar').classList.toggle('collapsed');
// Later...
document.querySelector('.sidebar').style.display = 'none';
```

---

## Pattern 5: Event Delegation

**Purpose**: Handle events on dynamic or multiple elements  
**Example**: Table row actions

```javascript
// Instead of adding listener to each row:
const tableBody = document.querySelector('tbody');

tableBody.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    
    if (button && button.classList.contains('action-btn')) {
        const row = button.closest('tr');
        console.log('Row clicked:', row);
    }
});
```

---

## Pattern 6: Data Attributes

**Purpose**: Store data on elements without classes  
**Example**: Page identification

**HTML**:
```html
<body id="page-judiciary" data-page="judiciary" data-type="dashboard">
    <div data-row-id="12345" class="table-row">
        <!-- content -->
    </div>
</body>
```

**JavaScript**:
```javascript
const body = document.querySelector('body');
const pageType = body.dataset.page;  // "judiciary"
const rows = document.querySelectorAll('[data-row-id]');

rows.forEach(row => {
    const id = row.dataset.rowId;
    console.log('Row ID:', id);
});
```

---

## Pattern 7: Class Toggling

**Purpose**: Simple state management with CSS classes  
**Example**: Tab switching

**HTML**:
```html
<div class="tabs">
    <button class="tab-btn active" data-tab="all">All</button>
    <button class="tab-btn" data-tab="open">Open</button>
    <button class="tab-btn" data-tab="closed">Closed</button>
</div>

<div class="tab-content active" id="tab-all">Content A</div>
<div class="tab-content" id="tab-open">Content B</div>
<div class="tab-content" id="tab-closed">Content C</div>
```

**JavaScript**:
```javascript
const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active to clicked
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});
```

---

## Pattern 8: Conditional Initialization

**Purpose**: Only initialize components on specific pages  
**Example**: Charts on some pages only

**HTML**:
```html
<body id="page-overview">
    <canvas id="trendsChart"></canvas>
</body>
```

**JavaScript**:
```javascript
// Only init chart if element exists
const chartCanvas = document.getElementById('trendsChart');
if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, { /* config */ });
}
```

---

## Pattern 9: Responsive Behavior

**Purpose**: Adjust behavior based on screen size  
**Example**: Mobile sidebar overlay

```javascript
// Mobile-specific behavior
const isMobile = window.innerWidth < 768;

if (isMobile) {
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('collapsed');
        }
    });
}

// Listen for resize
window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth < 768;
    if (isMobile !== newIsMobile) {
        location.reload();  // or adjust UI
    }
});
```

---

## Pattern 10: Error Handling

**Purpose**: Handle missing elements gracefully  

```javascript
// Safe query
const element = document.getElementById('optional-element');
if (element) {
    element.addEventListener('click', handleClick);
}

// Safe event listener
try {
    new Chart(ctx, config);
} catch (e) {
    console.error('Chart initialization failed:', e);
}
```

---

## Common Anti-Patterns to Avoid

### ❌ Inline Scripts
```html
<!-- WRONG -->
<button onclick="toggleSidebar()">Menu</button>
```

### ❌ Global Functions
```javascript
// WRONG: Pollutes global scope
function toggleSidebar() { /* ... */ }
function handleClick() { /* ... */ }
```

### ❌ Multiple DOM Queries
```javascript
// WRONG: Queries DOM 3 times
document.querySelector('.sidebar').style.width = '0';
document.querySelector('.sidebar').style.opacity = '0';
document.querySelector('.sidebar').classList.add('hidden');
```

### ❌ Missing Error Checks
```javascript
// WRONG: Crashes if element missing
const chart = new Chart(document.getElementById('missing-chart'), config);
```

---

## Assumptions & Constraints

### Assumptions
- Chart.js CDN available
- Modern browser with ES5+ support
- No frameworks (vanilla JS only)
- DOM ready before scripts run

### Constraints
- No jQuery or libraries
- No async/await (ES5+ compatible)
- No template literals for IE11
- No arrow functions... actually arrows are fine (ES5+)

---

## Related Documentation

**Prerequisites**:
- [Navigation](navigation.md) — Active state logic
- [Layout](layout.md) — Responsive patterns

**Related Concepts**:
- [Components](components.md) — Component selectors
- [Agent Guide](../development/agent.md) — Development patterns

**Depending on This Doc**:
- All HTML pages — JavaScript implementation
- [Agent Guide](../development/agent.md) — Best practices

---

*Last Updated*: 2026-07-04  
*Maintainer*: JavaScript Patterns  
*Version*: 1.0
