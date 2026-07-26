import re
import uuid
import os

# Files to process
files = [
    'backend/src/main/resources/data/users.sql',
    'backend/src/main/resources/data/issues.sql',
    'backend/src/main/resources/data/discussions.sql',
    'backend/src/main/resources/data/polls.sql',
    '../bmad/backend/src/main/resources/data.sql',
    '../docs/api/postman/collections/postman/collections/DJP Prototype & Spring Boot REST API Collection/6. Profiles/Get Profile By ID.request.yaml',
    '../docs/api/postman/collections/postman/collections/DJP Prototype & Spring Boot REST API Collection/6. Profiles/Update Profile.request.yaml',
    'frontend/src/features/profile/ProfilePage.tsx'
]

# We need a global mapping so that if a user ID is referenced across multiple files,
# it gets replaced with the SAME new UUID.
global_mapping = {}

uuid_pattern = r'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'

for filepath in files:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, does not exist")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    found_uuids = set(re.findall(uuid_pattern, content))
    
    for old_uuid in found_uuids:
        # Check if it's one of our repeating pattern ones e.g. 11111111-1111-1111...
        # A simple check: if the first 8 characters are all the same digit
        if old_uuid[:8] == old_uuid[0] * 8:
            if old_uuid not in global_mapping:
                 global_mapping[old_uuid] = str(uuid.uuid4())
                 
    # Replace in file using the global mapping
    for old, new in global_mapping.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)
        
    print(f"Processed {filepath}")
    
for old, new in global_mapping.items():
    print(f"Mapped {old} -> {new}")
