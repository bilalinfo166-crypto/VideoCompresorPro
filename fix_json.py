import os
import json

locales_dir = 'src/locales'

for filename in os.listdir(locales_dir):
    if filename.endswith('.json'):
        filepath = os.path.join(locales_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Formatted {filename}")
