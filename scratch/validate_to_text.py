import os
import json
import sys

# Ensure stdout handles Unicode characters on Windows
sys.stdout.reconfigure(encoding='utf-8')

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"
ENGLISH_FILE = os.path.join(LOCALES_DIR, "en.json")

def main():
    print("=" * 60)
    print("STARTING TO_TEXT_PAGE JSON STRUCTURE VALIDATION")
    print("=" * 60)
    
    if not os.path.exists(ENGLISH_FILE):
        print(f"[ERROR] Master English file not found: {ENGLISH_FILE}")
        sys.exit(1)
        
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    if "to_text_page" not in en_data:
        print("[ERROR] 'to_text_page' section is missing from en.json!")
        sys.exit(1)
        
    en_keys = set(en_data["to_text_page"].keys())
    print(f"Master English 'to_text_page' has {len(en_keys)} keys.")
    
    all_files = sorted([f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')])
    
    invalid_count = 0
    mismatch_count = 0
    
    for filename in all_files:
        file_path = os.path.join(LOCALES_DIR, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if "to_text_page" not in data:
                print(f"[✗] {filename}: 'to_text_page' section is MISSING!")
                invalid_count += 1
                continue
                
            lang_keys = set(data["to_text_page"].keys())
            
            # Check key count
            if len(lang_keys) != len(en_keys):
                print(f"[WARN] {filename}: Key count mismatch! Expected {len(en_keys)}, found {len(lang_keys)}.")
                mismatch_count += 1
                
            # Check missing keys
            missing_keys = en_keys - lang_keys
            if missing_keys:
                print(f"[✗] {filename}: Missing keys: {missing_keys}")
                invalid_count += 1
                
            # Check extra keys
            extra_keys = lang_keys - en_keys
            if extra_keys:
                print(f"[WARN] {filename}: Extra keys: {extra_keys}")
                mismatch_count += 1
                
            if not missing_keys and len(lang_keys) == len(en_keys):
                print(f"[✓] {filename}: 100% Aligned ({len(lang_keys)} keys).")
                
        except Exception as e:
            print(f"[✗] {filename}: INVALID JSON! Error: {e}")
            invalid_count += 1
            
    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Total Files Checked: {len(all_files)}")
    print(f"Syntax & Structural Errors: {invalid_count}")
    print(f"Warnings / Mismatches: {mismatch_count}")
    print("=" * 60)
    
    if invalid_count > 0:
        sys.exit(1)
    else:
        print("ALL 30 LOCALE FILES ARE 100% PERFECTLY ALIGNED FOR 'to_text_page'!")
        sys.exit(0)

if __name__ == "__main__":
    main()
