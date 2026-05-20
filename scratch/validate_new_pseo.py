import os
import json
import sys

# Ensure stdout handles Unicode characters on Windows
sys.stdout.reconfigure(encoding='utf-8')

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"
ENGLISH_FILE = os.path.join(LOCALES_DIR, "en.json")

NEW_PSEO_KEYS = [
    "avi", "mkv", "webm", 
    "video-for-instagram", "video-for-slack", "video-for-teams", "video-for-facebook"
]

def get_structure_fingerprint(obj):
    """
    Returns a fingerprint of a dict/list structure to compare structural equivalence.
    """
    if isinstance(obj, dict):
        return sorted([(k, get_structure_fingerprint(v)) for k, v in obj.items()])
    elif isinstance(obj, list):
        return tuple([get_structure_fingerprint(item) for item in obj])
    else:
        return type(obj).__name__

def main():
    print("=" * 60)
    print("RUNNING PSEO STRUCTURAL ALIGNMENT VALIDATION")
    print("=" * 60)
    
    if not os.path.exists(ENGLISH_FILE):
        print(f"[ERROR] Master English file not found: {ENGLISH_FILE}")
        sys.exit(1)
        
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    if "pseo" not in en_data:
        print("[ERROR] 'pseo' key not found in en.json.")
        sys.exit(1)
        
    pseo_en = en_data["pseo"]
    
    # Generate structural fingerprint for the 7 new keys in English
    en_fingerprints = {}
    for key in NEW_PSEO_KEYS:
        if key not in pseo_en:
            print(f"[ERROR] Master key '{key}' missing from en.json.")
            sys.exit(1)
        en_fingerprints[key] = get_structure_fingerprint(pseo_en[key])
        
    print("Master English structure fingerprints calculated successfully.")
    
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')]
    failures = 0
    successes = 0
    
    for filename in all_files:
        file_path = os.path.join(LOCALES_DIR, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                target_data = json.load(f)
        except Exception as e:
            print(f"[ERROR] Failed to load JSON from {filename}: {e}")
            failures += 1
            continue
            
        if "pseo" not in target_data:
            print(f"[ERROR] File '{filename}' is missing the 'pseo' key.")
            failures += 1
            continue
            
        pseo_target = target_data["pseo"]
        file_mismatches = 0
        
        for key in NEW_PSEO_KEYS:
            if key not in pseo_target:
                print(f"  [FAIL] {filename} is missing the '{key}' page completely.")
                file_mismatches += 1
                continue
                
            target_fingerprint = get_structure_fingerprint(pseo_target[key])
            if target_fingerprint != en_fingerprints[key]:
                print(f"  [FAIL] {filename} has structural mismatch under page '{key}'.")
                file_mismatches += 1
                
        if file_mismatches == 0:
            print(f"  [SUCCESS] {filename} is perfectly aligned and validated.")
            successes += 1
        else:
            failures += 1
            
    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY:")
    print(f"  Total Aligned and Validated Files: {successes}")
    print(f"  Total Failed Files: {failures}")
    print("=" * 60)
    
    if failures > 0:
        print("[CRITICAL] Structural verification failed. Please check the logs.")
        sys.exit(1)
    else:
        print("[SUCCESS] All files are 100% aligned and syntactically correct!")
        sys.exit(0)

if __name__ == "__main__":
    main()
