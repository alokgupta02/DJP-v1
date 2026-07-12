function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatInlineMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}

function renderTable(rows) {
  if (rows.length === 0) return '';
  let html = '<div class="table-container"><table>';
  
  // First row is header
  const headerCols = rows[0].split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
  html += '<thead><tr>';
  headerCols.forEach(col => {
    html += `<th>${formatInlineMd(col)}</th>`;
  });
  html += '</tr></thead><tbody>';

  // Remaining rows
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip separator row
    if (i === 1 && /^[|:\-\s]+$/.test(row)) {
      continue;
    }
    const cols = row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    html += '<tr>';
    cols.forEach(col => {
      html += `<td>${formatInlineMd(col)}</td>`;
    });
    html += '</tr>';
  }
  
  html += '</tbody></table></div>';
  return html;
}

export function renderSimpleMarkdown(md) {
  if (!md) return '';
  const lines = md.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBuffer = '';
  let tableRows = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      html += renderTable(tableRows);
      tableRows = [];
    }
  };

  lines.forEach(line => {
    if (line.trim().startsWith('```')) {
      flushTable();
      if (inCodeBlock) {
        html += `<pre><code>${escapeHtml(codeBuffer)}</code></pre>`;
        codeBuffer = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer += line + '\n';
      return;
    }

    let l = escapeHtml(line);

    const isTableRow = l.trim().startsWith('|');
    if (isTableRow) {
      tableRows.push(l);
      return;
    } else {
      flushTable();
    }

    // Checkbox support
    const checkboxMatch = l.match(/^[*-]\s+\[([ xX/!])\]\s+(.*)$/);
    if (checkboxMatch) {
      const checked = checkboxMatch[1].toLowerCase() === 'x' ? 'checked' : '';
      const style = checkboxMatch[1] === '/' ? 'color: var(--accent-amber); font-weight: 500;' : '';
      html += `<div class="checkbox-item"><input type="checkbox" disabled ${checked} /> <span style="${style}">${formatInlineMd(checkboxMatch[2])}</span></div>`;
      return;
    }

    if (l.startsWith('# ')) { html += `<h1>${formatInlineMd(l.slice(2))}</h1>`; return; }
    if (l.startsWith('## ')) { html += `<h2>${formatInlineMd(l.slice(3))}</h2>`; return; }
    if (l.startsWith('### ')) { html += `<h3>${formatInlineMd(l.slice(4))}</h3>`; return; }

    if (l.startsWith('* ') || l.startsWith('- ')) {
      html += `<li>${formatInlineMd(l.slice(2))}</li>`;
      return;
    }

    if (l.startsWith('> ')) {
      html += `<blockquote>${formatInlineMd(l.slice(2))}</blockquote>`;
      return;
    }

    if (l.trim() === '') return;

    html += `<p>${formatInlineMd(l)}</p>`;
  });

  flushTable();

  return html;
}
