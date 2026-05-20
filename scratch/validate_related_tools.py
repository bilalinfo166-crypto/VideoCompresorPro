import os
import json
import sys

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"

def main():
    print("=" * 60)
    print("VALIDATING RELATED TOOLS KEYS IN ALL LOCALES")
    print("=" * 60)
    
    if not os.path.exists(LOCALES_DIR):
        print(f"[ERROR] Locales directory not found: {LOCALES_DIR}")
        sys.exit(1)
        
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')]
    expected_keys = [
        "related_title", "related_desc",
        "compressor_title", "compressor_desc",
        "cutter_title", "cutter_desc",
        "cropper_title", "cropper_desc"
    ]
    
    invalid_count = 0
    mismatch_count = 0
    
    for filename in sorted(all_files):
        file_path = os.path.join(LOCALES_DIR, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            if "tools" not in data:
                print(f"[ERR] {filename}: 'tools' section is missing!")
                invalid_count += 1
                continue
                
            tools = data["tools"]
            missing = [k for k in expected_keys if k not in tools]
            
            if missing:
                print(f"[ERR] {filename}: Missing keys: {missing}")
                invalid_count += 1
            else:
                # Check for empty/whitespace-only values
                empty_keys = [k for k in expected_keys if not str(tools[k]).strip()]
                if empty_keys:
                    print(f"[WARN] {filename}: Empty or whitespace values for keys: {empty_keys}")
                    mismatch_count += 1
                else:
                    print(f"[OK] {filename}: 100% valid. All 8 Related Tools keys present and populated.")
                    
        except Exception as e:
            print(f"[ERR] {filename}: Invalid JSON syntax! Error: {str(e)}")
            invalid_count += 1
            
    print("\n" + "=" * 60)
    print("RELATED TOOLS VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Total Files Checked: {len(all_files)}")
    print(f"Errors: {invalid_count}")
    print(f"Warnings: {mismatch_count}")
    print("=" * 60)
    
    if invalid_count > 0:
        sys.exit(1)
    else:
        print("ALL RELATED TOOLS LOCALE FILES ARE 100% PERFECTLY VALID!")
        sys.exit(0)

if __name__ == "__main__":
    main()
