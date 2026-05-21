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

# Map special project codes to Google Translate codes
LANG_MAP = {
    'zh': 'zh-CN',  # Simplified Chinese
    'tw': 'zh-TW',  # Traditional Chinese
}

# The new keys to add in English (Master)
NEW_KEYS = {
    "auth": {
        "optional_info": "While our tools are 100% free and work fully without an account, creating one lets you save custom presets, access advanced codecs, and track compression history."
    },
    "about_page": {
        "meta_title": "About Us - Privacy-First Video Tools | VideoCompressorPro",
        "meta_description": "Learn more about VideoCompressorPro, our mission to provide lightning-fast, private, and high-quality online video tools for free."
    },
    "contact_page": {
        "meta_title": "Contact Us - Support & Inquiries | VideoCompressorPro",
        "meta_description": "Get in touch with the VideoCompressorPro team for support, feature requests, or business inquiries. We are here to help."
    },
    "privacy_page": {
        "meta_title": "Privacy Policy - 100% Private Video Compression | VideoCompressorPro",
        "meta_description": "Read the Privacy Policy of VideoCompressorPro. We process all your files 100% locally in your browser - no files are uploaded to our servers."
    },
    "terms_page": {
        "meta_title": "Terms of Service - Free Online Video Tools | VideoCompressorPro",
        "meta_description": "Read the Terms of Service for using VideoCompressorPro's free, secure, browser-based online video tools."
    }
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
            print(f"    [WARN] Attempt {attempt+1} failed for '{text[:20]}...' in '{target_lang}': {e}")
            time.sleep(1 + attempt)
    return text

def main():
    print("=" * 60)
    print("STARTING META AND AUTH TRANSLATION PIPELINE")
    print("=" * 60)
    
    # 1. Update Master English File
    print(f"Updating Master English file: {ENGLISH_FILE}")
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    for block_name, keys in NEW_KEYS.items():
        if block_name not in en_data:
            en_data[block_name] = {}
        for key_name, val in keys.items():
            en_data[block_name][key_name] = val
            
    with open(ENGLISH_FILE, 'w', encoding='utf-8') as f:
        json.dump(en_data, f, indent=2, ensure_ascii=False)
    print("English Master updated successfully.")

    # 2. Iterate through all other locale files
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json') and f != "en.json"]
    print(f"Found {len(all_files)} other language files to translate.\n")
    
    for idx, filename in enumerate(all_files):
        lang_code = filename.replace('.json', '')
        file_path = os.path.join(LOCALES_DIR, filename)
        
        print(f"[{idx+1}/{len(all_files)}] Translating for: {filename} ({lang_code.upper()})")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # We need to translate and insert the new keys
        for block_name, keys in NEW_KEYS.items():
            if block_name not in data:
                data[block_name] = {}
                
            for key_name, val in keys.items():
                # Check if already exists, if so skip (unless it's empty)
                if key_name in data[block_name] and data[block_name][key_name].strip():
                    continue
                    
                print(f"  Translating '{block_name}.{key_name}'...")
                translated_text = translate_mobile(val, lang_code)
                data[block_name][key_name] = translated_text
                print(f"    -> '{translated_text[:40]}...'")
                time.sleep(0.5) # Gentle pause to be extremely polite to Google Translate
                
        # Save the updated file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print(f"[✓] Successfully updated and saved {filename}\n")
        
    print("=" * 60)
    print("META AND AUTH TRANSLATION COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
