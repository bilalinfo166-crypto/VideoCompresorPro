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

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"
ENGLISH_FILE = os.path.join(LOCALES_DIR, "en.json")

LANG_MAP = {
    'zh': 'zh-CN',
    'tw': 'zh-TW',
}

NEW_TRUSTED = {
    "title": "Optimized for Seamless Upload and Playback on All Major Platforms",
    "desc": "Compress your videos to meet the strict upload constraints of your favorite websites, email providers, and social media platforms."
}

def translate_mobile(text, target_lang):
    if not text.strip():
        return text
    google_lang = LANG_MAP.get(target_lang, target_lang)
    url = "https://translate.google.com/m"
    params = {
        'sl': 'en',
        'tl': google_lang,
        'hl': 'en',
        'q': text
    }
    encoded = urllib.parse.urlencode(params)
    full_url = f"{url}?{encoded}"
    
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
            print(f"    [WARN] Attempt {attempt+1} failed: {e}")
            time.sleep(1 + attempt)
    return text

def main():
    print("=" * 60)
    print("STARTING TRUSTED BLOCK TRANSLATION")
    print("=" * 60)
    
    # 1. English
    print(f"Updating English master: {ENGLISH_FILE}")
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    en_data["trusted"] = NEW_TRUSTED
    with open(ENGLISH_FILE, 'w', encoding='utf-8') as f:
        json.dump(en_data, f, indent=2, ensure_ascii=False)
    print("English master updated successfully.")

    # 2. Others
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json') and f != "en.json"]
    print(f"Found {len(all_files)} other files to process.")
    
    for idx, filename in enumerate(all_files):
        lang_code = filename.replace('.json', '')
        file_path = os.path.join(LOCALES_DIR, filename)
        
        print(f"[{idx+1}/{len(all_files)}] Processing: {filename}")
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        data["trusted"] = {
            "title": translate_mobile(NEW_TRUSTED["title"], lang_code),
            "desc": translate_mobile(NEW_TRUSTED["desc"], lang_code)
        }
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"[✓] Saved {filename}")
        time.sleep(0.5)
        
    print("=" * 60)
    print("TRUSTED BLOCK TRANSLATION COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
