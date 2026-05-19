import os
import json
import urllib.request
import urllib.parse
import sys
import time
import re
import html as html_lib
import random

# Ensure stdout handles Unicode characters on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Constants
LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"
ENGLISH_FILE = os.path.join(LOCALES_DIR, "en.json")

# Map special project codes to Google Translate codes if necessary
LANG_MAP = {
    'zh': 'zh-CN',  # Simplified Chinese
    'tw': 'zh-TW',  # Traditional Chinese
}

def translate_mobile(text, target_lang):
    """
    Translates text by scraping Google Translate Mobile web interface.
    """
    if not text.strip():
        return text
        
    url = "https://translate.google.com/m"
    params = {
        'sl': 'en',
        'tl': target_lang,
        'hl': 'en',
        'q': text
    }
    encoded = urllib.parse.urlencode(params)
    full_url = f"{url}?{encoded}"
    
    # Simple mobile user-agents
    user_agents = [
        'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/605.1.15',
        'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'
    ]
    
    for attempt in range(5):
        try:
            req = urllib.request.Request(
                full_url, 
                headers={'User-Agent': random.choice(user_agents)}
            )
            with urllib.request.urlopen(req, timeout=15) as response:
                html_content = response.read().decode('utf-8')
                match = re.search(r'<div[^>]*class="(?:result-container|t0)"[^>]*>(.*?)</div>', html_content, re.DOTALL)
                if match:
                    translated = match.group(1)
                    return html_lib.unescape(translated)
        except Exception as e:
            print(f"    [WARN] Attempt {attempt+1} failed for '{text[:20]}...' in '{target_lang}': {e}")
            time.sleep(1 + attempt)
    return text  # Fallback to original text

def batch_translate(items, target_lang):
    """
    Translates a list of (key, value) items in batches using |||| delimiter.
    """
    if not items:
        return {}
        
    results = {}
    delimiter = " |||| "
    
    chunk_size = 10
    chunks = [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]
    
    for chunk_idx, chunk in enumerate(chunks):
        keys = [item[0] for item in chunk]
        vals = [item[1] for item in chunk]
        
        processed_vals = [v.replace('\n', ' @@@ ') for v in vals]
        joined_text = delimiter.join(processed_vals)
        
        print(f"  Translating batch {chunk_idx + 1}/{len(chunks)} ({len(keys)} keys) for '{target_lang}'...")
        translated_joined = translate_mobile(joined_text, target_lang)
        
        success = False
        if translated_joined and "ERROR" not in translated_joined:
            translated_vals = re.split(r'\s*\|{2,4}\s*', translated_joined)
            
            if len(translated_vals) == len(vals):
                success = True
                for k, orig_v, trans_v in zip(keys, vals, translated_vals):
                    trans_v = trans_v.strip()
                    trans_v = re.sub(r'\s*@@@\s*', '\n', trans_v)
                    if orig_v.strip().isupper():
                        trans_v = trans_v.upper()
                    results[k] = trans_v
            else:
                print(f"    [WARN] Batch mismatch: input {len(vals)} != output {len(translated_vals)}.")
        
        if not success:
            print(f"    [FALLBACK] Running slow key-by-key translation for {len(keys)} keys...")
            for k, v in chunk:
                proc_v = v.replace('\n', ' @@@ ')
                trans_v = translate_mobile(proc_v, target_lang)
                trans_v = re.sub(r'\s*@@@\s*', '\n', trans_v)
                if v.strip().isupper():
                    trans_v = trans_v.upper()
                results[k] = trans_v
                time.sleep(0.1)
                
        time.sleep(0.3)
                
    return results

def main():
    print("=" * 60)
    print("STARTING DYNAMIC PSEO FEATURES TRANSLATION INJECTION")
    print("=" * 60)
    
    # Load Master English File
    if not os.path.exists(ENGLISH_FILE):
        print(f"[ERROR] English file not found: {ENGLISH_FILE}")
        sys.exit(1)
        
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    if "pseo_features" not in en_data:
        print("[ERROR] 'pseo_features' section not found in en.json.")
        sys.exit(1)
        
    en_features = en_data["pseo_features"]
    
    # Prepare English items with {context} replaced by numeric token 12345
    en_items = []
    for k, v in en_features.items():
        processed_v = v.replace("{context}", "12345")
        en_items.append((k, processed_v))
        
    print(f"Loaded English pseo_features with {len(en_items)} keys.")
    
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json')]
    target_files = [f for f in all_files if f != 'en.json']
    
    print(f"Found {len(target_files)} target locale files to translate.")
    
    for idx, filename in enumerate(target_files):
        lang_code = filename.split('.')[0]
        google_lang = LANG_MAP.get(lang_code, lang_code)
        file_path = os.path.join(LOCALES_DIR, filename)
        
        print(f"\n[{idx+1}/{len(target_files)}] Translating for '{filename}' ('{google_lang}')...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                target_data = json.load(f)
        except Exception as e:
            print(f"  [ERROR] Failed to read {filename}: {e}. Skipping.")
            continue
            
        t0 = time.time()
        translated_raw = batch_translate(en_items, google_lang)
        duration = time.time() - t0
        
        print(f"  Translated in {duration:.1f}s.")
        
        # Post-process translated raw results by restoring {context} placeholder
        processed_features = {}
        for k, trans_v in translated_raw.items():
            # Replace numeric token 12345 back to {context}
            restored_v = trans_v.replace("12345", "{context}")
            processed_features[k] = restored_v
            
        # Inject pseo_features block in alphabetical/structural order after 'discord'
        # To maintain exact structural alignment, we reconstruct the dictionary
        new_target_data = {}
        for key, value in target_data.items():
            new_target_data[key] = value
            if key == "discord":
                new_target_data["pseo_features"] = processed_features
                
        # Ensure it got added (fallback if 'discord' is missing, which shouldn't happen)
        if "pseo_features" not in new_target_data:
            new_target_data["pseo_features"] = processed_features
            
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(new_target_data, f, ensure_ascii=False, indent=2)
            print(f"  [SUCCESS] Saved and verified {filename}.")
        except Exception as e:
            print(f"  [ERROR] Failed to save {filename}: {e}.")
            
    print("\n" + "=" * 60)
    print("DYNAMIC PSEO FEATURES TRANSLATION & INJECTION COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
