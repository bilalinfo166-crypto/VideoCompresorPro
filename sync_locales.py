import os
import json

def get_all_keys(d, prefix=''):
    keys = {}
    for k, v in d.items():
        new_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(get_all_keys(v, new_key))
        else:
            keys[new_key] = v
    return keys

def set_key(d, key, value):
    parts = key.split('.')
    for part in parts[:-1]:
        if part not in d:
            d[part] = {}
        d = d[part]
    d[parts[-1]] = value

locales_dir = 'src/locales'
master_file = os.path.join(locales_dir, 'en.json')

with open(master_file, 'r', encoding='utf-8') as f:
    master_data = json.load(f)

master_keys = get_all_keys(master_data)

for filename in os.listdir(locales_dir):
    if filename.endswith('.json') and filename != 'en.json':
        filepath = os.path.join(locales_dir, filename)
        
        # We need to read the file manually to handle duplicate keys if any 
        # (though the previous script already flattened them by picking the last one)
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                locale_data = json.load(f)
            except:
                print(f"Skipping {filename} due to invalid JSON")
                continue
        
        # Flatten the locale data (picking the last occurrence of any duplicate keys, which is what json.load does)
        locale_keys = get_all_keys(locale_data)
        
        # Create a new dict with the exact structure of master_data
        new_data = {}
        for key in master_keys:
            if key in locale_keys:
                set_key(new_data, key, locale_keys[key])
            else:
                # Fallback to English if key missing
                set_key(new_data, key, master_keys[key])
                print(f"Missing key in {filename}: {key}")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, ensure_ascii=False, indent=2)
        print(f"Synchronized {filename}")
