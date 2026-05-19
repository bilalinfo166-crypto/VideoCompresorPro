import os
import json
import sys

# Ensure stdout handles Unicode characters on Windows
sys.stdout.reconfigure(encoding='utf-8')

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"

def main():
    print("=" * 60)
    print("STARTING LOCALE JSON STRUCTURE VALIDATION")
    print("=" * 60)
    
    if not os.path.exists(LOCALES_DIR):
        print(f"[ERROR] Locales directory not found: {LOCALES_DIR}")
        sys.exit(1)
        
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')]
    print(f"Found {len(all_files)} locale JSON files to validate.\n")
    
    invalid_count = 0
    mismatch_count = 0
    
    # Let's load the master English file to check key alignment
    en_file_path = os.path.join(LOCALES_DIR, "en.json")
    with open(en_file_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    en_mp3_keys = set(en_data["to_mp3_page"].keys())
    en_youtube_keys = set(en_data["pseo"]["youtube"].keys())
    en_tiktok_keys = set(en_data["pseo"]["tiktok"].keys())
    print(f"Master English 'to_mp3_page' has {len(en_mp3_keys)} keys.")
    print(f"Master English 'pseo.youtube' has {len(en_youtube_keys)} keys.")
    print(f"Master English 'pseo.tiktok' has {len(en_tiktok_keys)} keys.")
    
    for filename in sorted(all_files):
        file_path = os.path.join(LOCALES_DIR, filename)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Syntax validation: PASSED
            print(f"[✓] {filename}: Valid JSON syntax.")
            
            # Key presence check for to_mp3_page
            if "to_mp3_page" not in data:
                print(f"    [ERROR] 'to_mp3_page' section is missing!")
                invalid_count += 1
                continue
                
            mp3_section = data["to_mp3_page"]
            mp3_keys = set(mp3_section.keys())
            
            # Check key count for to_mp3_page
            if len(mp3_keys) != len(en_mp3_keys):
                print(f"    [WARN] MP3 key count mismatch! Expected {len(en_mp3_keys)}, found {len(mp3_keys)}.")
                mismatch_count += 1
                
            # Check for missing keys compared to Master
            missing_mp3 = en_mp3_keys - mp3_keys
            if missing_mp3:
                print(f"    [ERROR] Missing MP3 keys: {missing_mp3}")
                invalid_count += 1

            # PSEO YouTube & TikTok Validation
            if "pseo" not in data:
                print(f"    [ERROR] 'pseo' section is missing!")
                invalid_count += 1
                continue
                
            pseo_section = data["pseo"]
            
            # YouTube check
            if "youtube" not in pseo_section:
                print(f"    [ERROR] 'pseo.youtube' is missing!")
                invalid_count += 1
            else:
                yt_keys = set(pseo_section["youtube"].keys())
                missing_yt = en_youtube_keys - yt_keys
                if missing_yt:
                    print(f"    [ERROR] Missing YouTube keys: {missing_yt}")
                    invalid_count += 1
                
                # Check arrays lengths
                if len(pseo_section["youtube"].get("features", [])) != len(en_data["pseo"]["youtube"]["features"]):
                    print(f"    [ERROR] YouTube features array size mismatch.")
                    invalid_count += 1
                if len(pseo_section["youtube"].get("steps", [])) != len(en_data["pseo"]["youtube"]["steps"]):
                    print(f"    [ERROR] YouTube steps array size mismatch.")
                    invalid_count += 1
                if len(pseo_section["youtube"].get("faqs", [])) != len(en_data["pseo"]["youtube"]["faqs"]):
                    print(f"    [ERROR] YouTube faqs array size mismatch.")
                    invalid_count += 1

            # TikTok check
            if "tiktok" not in pseo_section:
                print(f"    [ERROR] 'pseo.tiktok' is missing!")
                invalid_count += 1
            else:
                tt_keys = set(pseo_section["tiktok"].keys())
                missing_tt = en_tiktok_keys - tt_keys
                if missing_tt:
                    print(f"    [ERROR] Missing TikTok keys: {missing_tt}")
                    invalid_count += 1
                
                # Check arrays lengths
                if len(pseo_section["tiktok"].get("features", [])) != len(en_data["pseo"]["tiktok"]["features"]):
                    print(f"    [ERROR] TikTok features array size mismatch.")
                    invalid_count += 1
                if len(pseo_section["tiktok"].get("steps", [])) != len(en_data["pseo"]["tiktok"]["steps"]):
                    print(f"    [ERROR] TikTok steps array size mismatch.")
                    invalid_count += 1
                if len(pseo_section["tiktok"].get("faqs", [])) != len(en_data["pseo"]["tiktok"]["faqs"]):
                    print(f"    [ERROR] TikTok faqs array size mismatch.")
                    invalid_count += 1
                
        except Exception as e:
            print(f"[✗] {filename}: INVALID JSON! Error: {e}")
            invalid_count += 1
            
    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Total Files Checked: {len(all_files)}")
    print(f"Syntax & Schema Errors: {invalid_count}")
    print(f"Warnings / Mismatches: {mismatch_count}")
    print("=" * 60)
    
    if invalid_count > 0:
        sys.exit(1)
    else:
        print("ALL LOCALE FILES ARE 100% VALID AND PERFECTLY ALIGNED!")
        sys.exit(0)

if __name__ == "__main__":
    main()
