# ⚡ **JavaScript Patterns & Best Practices**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Standardized catalog of vanilla JavaScript (ES5+) patterns across the DJP frontend |
| **👥 Audience** | Developers, Designers, AI Agents |
| **🔗 Dependencies** | [Navigation](navigation.md), [Layout](layout.md) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The Digital Janata (DJ) platform frontend relies on **vanilla JavaScript (ES5+)** without heavy runtime dependencies. This document defines the reusable architectural patterns and event handling standards.

---

## 📚 Pattern Library

### 1️⃣ 🧭 Pattern 1: Responsive Sidebar Toggle
* **🎯 Purpose:** Collapses or expands the navigation sidebar off-canvas drawer on mobile screens.

```javascript
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}
```

---

### 2️⃣ ✨ Pattern 2: Active State Management
* **🎯 Purpose:** Highlights the active navigation link based on page navigation.

```javascript
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!link.href.includes('#')) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});
```

---

### 3️⃣ 📈 Pattern 3: Chart.js Initialization
* **🎯 Purpose:** Safely initializes Chart.js canvas elements with unified design tokens.

```javascript
const chartCanvas = document.getElementById('myChart');

if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Metric A',
                data: [10, 20, 15],
                borderColor: '#a31621',
                backgroundColor: 'rgba(163, 22, 33, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });
}
```

---

### 4️⃣ ⚡ Pattern 4: DOM Query Caching
Always query DOM nodes once and cache them in variables rather than repeatedly executing `document.querySelector()`.

```javascript
// ✅ Preferred: Cache reference
const sidebar = document.querySelector('.sidebar');
sidebar.classList.add('active');
sidebar.style.display = 'block';

// ❌ Avoid: Repeated lookups
document.querySelector('.sidebar').classList.add('active');
document.querySelector('.sidebar').style.display = 'block';
```

---

### 5️⃣ 🎯 Pattern 5: Event Delegation
Use event delegation on parent containers (`<tbody>`, lists) rather than binding listeners to every individual child row.

```javascript
const tableBody = document.querySelector('tbody');

if (tableBody) {
    tableBody.addEventListener('click', (e) => {
        const button = e.target.closest('button.action-btn');
        if (button) {
            const row = button.closest('tr');
            console.log('Action triggered on row:', row);
        }
    });
}
```

---

### 6️⃣ 🏷️ Pattern 6: HTML5 Data Attributes
Use `data-*` attributes for DOM state tracking rather than string-parsing CSS classes.

```html
<body id="page-judiciary" data-page="judiciary">
    <div data-row-id="12345" class="table-row">...</div>
</body>
```

```javascript
const rowId = element.dataset.rowId;
```

---

### 7️⃣ 📑 Pattern 7: Tab Navigation Class Toggling
```javascript
const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const targetContent = document.getElementById(`tab-${tabId}`);
        if (targetContent) targetContent.classList.add('active');
    });
});
```

---

## 🚫 Common Anti-Patterns to Avoid

| Anti-Pattern | Bad Practice | Clean Replacement |
| :--- | :--- | :--- |
| **Inline Scripts** | `<button onclick="toggle()">` | Bind via `addEventListener()` in script |
| **Global Scope Pollution** | `function toggle() { ... }` at root | Enclose in modular scope or module |
| **Unchecked DOM Nulls** | Calling `.classList` on non-existent ID | Guard with `if (element) { ... }` |

---

## 📚 Related Documentation

* **[Navigation System](navigation.md)** — DOM active state rules
* **[UI Components](components.md)** — Interactive component structures

---
