import os
import re

mapping = {
    "11111111-1111-1111-1111-111111111111": "1f4c2da8-eedd-4523-b541-7c818c237fff",
    "22222222-2222-2222-2222-222222222222": "c82b82ab-e0e0-4182-b50a-f2d391fb3296",
    "33333333-3333-3333-3333-333333333333": "990671fe-24d5-480f-9da5-76352b8cefd4",
    "44444444-4444-4444-4444-444444444444": "51512996-3ffb-4205-8930-072ea7e94f1e",
    "55555555-5555-5555-5555-555555555555": "0cf5ae96-9ca5-4887-b654-5612acdc649f",
    "66666666-6666-6666-6666-666666666666": "543b3e8a-8a24-46bb-9f9a-a7b9c67541d8",
    "77777777-7777-7777-7777-777777777777": "66d52ce0-f22e-481a-97a5-845cc610e83d",
    "88888888-8888-8888-8888-888888888888": "d43f7c4a-8238-4236-b62d-f9989b6db167"
}

def replace_uuids(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if 'target' in dirs:
            dirs.remove('target')
        if 'dist' in dirs:
            dirs.remove('dist')

        for file in files:
            filepath = os.path.join(root, file)
            # Only process text files
            if not file.endswith(('.java', '.yaml', '.yml', '.json', '.sql', '.tsx', '.ts', '.md', '.html', '.css', '.js')):
                continue
                
            try:
                with open(filepath, 'r') as f:
                    content = f.read()
                
                changed = False
                for old_uuid, new_uuid in mapping.items():
                    if old_uuid in content:
                        content = content.replace(old_uuid, new_uuid)
                        changed = True
                
                if changed:
                    with open(filepath, 'w') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

replace_uuids('.')
