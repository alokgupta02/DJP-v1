import os
import re

def clean_unused_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    
    import_lines = []
    other_lines = []
    
    import_pattern = re.compile(r'^import\s+(?:static\s+)?([\w\.]+)\s*;')

    for line in lines:
        match = import_pattern.match(line.strip())
        if match:
            import_lines.append((line, match.group(1)))
        else:
            other_lines.append(line)

    if not import_lines:
        return

    body_content = '\n'.join(other_lines)
    
    body_content_clean = re.sub(r'/\*.*?\*/', '', body_content, flags=re.DOTALL)
    body_content_clean = re.sub(r'//.*', '', body_content_clean)

    used_imports = []
    removed_imports = []

    for full_line, import_path in import_lines:
        symbol = import_path.split('.')[-1]
        
        if symbol == '*':
            used_imports.append(full_line)
            continue
            
        pattern = re.compile(r'\b' + re.escape(symbol) + r'\b')
        if pattern.search(body_content_clean):
            used_imports.append(full_line)
        else:
            removed_imports.append(full_line)

    if not removed_imports:
        return

    new_lines = []
    import_index_start = -1
    import_index_end = -1

    for i, line in enumerate(lines):
        if import_pattern.match(line.strip()):
            if import_index_start == -1:
                import_index_start = i
            import_index_end = i

    if import_index_start != -1:
        new_lines = lines[:import_index_start] + used_imports + lines[import_index_end + 1:]
    else:
        new_lines = lines

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines) + '\n')

    print(f"Cleaned {file_path}: Removed {len(removed_imports)} unused import(s).")
    for imp in removed_imports:
        print(f"  - {imp}")

def main():
    src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')
    print(f"Scanning Java files in {src_dir}...")
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.java'):
                clean_unused_imports(os.path.join(root, file))

if __name__ == '__main__':
    main()
