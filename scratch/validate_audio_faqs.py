import os
import json
import sys

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"

def main():
    print("=" * 60)
    print("VALIDATING AUDIO CUTTER FAQS IN ALL LOCALES")
    print("=" * 60)
    
    if not os.path.exists(LOCALES_DIR):
        print(f"[ERROR] Locales directory not found: {LOCALES_DIR}")
        sys.exit(1)
        
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')]
    expected_keys = ['faq_title'] + [f'q{i}' for i in range(1, 15)] + [f'a{i}' for i in range(1, 15)]
    
    invalid_count = 0
    mismatch_count = 0
    
    for filename in sorted(all_files):
        file_path = os.path.join(LOCALES_DIR, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            if "audio_cutter_page" not in data:
                print(f"[ERR] {filename}: 'audio_cutter_page' section is missing!")
                invalid_count += 1
                continue
                
            ac = data["audio_cutter_page"]
            missing = [k for k in expected_keys if k not in ac]
            
            if missing:
                print(f"[ERR] {filename}: Missing keys: {missing}")
                invalid_count += 1
            else:
                # Check for empty/whitespace-only values
                empty_keys = [k for k in expected_keys if not ac[k].strip()]
                if empty_keys:
                    print(f"[WARN] {filename}: Empty or whitespace values for keys: {empty_keys}")
                    mismatch_count += 1
                else:
                    print(f"[OK] {filename}: 100% valid. All 29 FAQ keys present and populated.")
                    
        except Exception as e:
            print(f"[ERR] {filename}: Invalid JSON syntax! Error: {str(e)}")
            invalid_count += 1
            
    print("\n" + "=" * 60)
    print("AUDIO FAQS VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Total Files Checked: {len(all_files)}")
    print(f"Errors: {invalid_count}")
    print(f"Warnings: {mismatch_count}")
    print("=" * 60)
    
    if invalid_count > 0:
        sys.exit(1)
    else:
        print("ALL AUDIO FAQS LOCALE FILES ARE 100% PERFECTLY VALID!")
        sys.exit(0)

if __name__ == "__main__":
    main()
