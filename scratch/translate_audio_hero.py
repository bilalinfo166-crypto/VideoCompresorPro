import os
import json
import urllib.request
import urllib.parse
import sys
import time
import re
import html as html_lib
import random

sys.stdout.reconfigure(encoding='utf-8')

LOCALES_DIR = r"c:\laragon\www\Video Compresor\src\locales"
ENGLISH_FILE = os.path.join(LOCALES_DIR, "en.json")

LANG_MAP = {
    'zh': 'zh-CN',
    'tw': 'zh-TW',
}

def translate_mobile(text, target_lang):
    if not text.strip():
        return text
    url = "https://translate.google.com/m"
    params = {'sl': 'en', 'tl': target_lang, 'hl': 'en', 'q': text}
    encoded = urllib.parse.urlencode(params)
    full_url = f"{url}?{encoded}"
    
    user_agents = [
        'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/605.1.15',
        'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'
    ]
    
    for attempt in range(5):
        try:
            req = urllib.request.Request(full_url, headers={'User-Agent': random.choice(user_agents)})
            with urllib.request.urlopen(req, timeout=15) as response:
                html_content = response.read().decode('utf-8')
                match = re.search(r'<div[^>]*class="(?:result-container|t0)"[^>]*>(.*?)</div>', html_content, re.DOTALL)
                if match:
                    return html_lib.unescape(match.group(1))
        except Exception as e:
            time.sleep(1 + attempt)
    return text

def batch_translate(items, target_lang):
    if not items: return {}
    results = {}
    delimiter = " |||| "
    keys = [item[0] for item in items]
    vals = [item[1] for item in items]
    processed_vals = [v.replace('\n', ' @@@ ') for v in vals]
    joined_text = delimiter.join(processed_vals)
    
    print(f"  Translating {len(keys)} keys for '{target_lang}'...")
    translated_joined = translate_mobile(joined_text, target_lang)
    
    if translated_joined and "ERROR" not in translated_joined:
        translated_vals = re.split(r'\s*\|{2,4}\s*', translated_joined)
        if len(translated_vals) == len(vals):
            for k, orig_v, trans_v in zip(keys, vals, translated_vals):
                trans_v = trans_v.strip()
                trans_v = re.sub(r'\s*@@@\s*', '\n', trans_v)
                if orig_v.strip().isupper():
                    trans_v = trans_v.upper()
                results[k] = trans_v
            return results

    # Fallback
    print(f"    [FALLBACK] Running key-by-key...")
    for k, v in items:
        trans_v = translate_mobile(v.replace('\n', ' @@@ '), target_lang)
        trans_v = re.sub(r'\s*@@@\s*', '\n', trans_v)
        if v.strip().isupper():
            trans_v = trans_v.upper()
        results[k] = trans_v
        time.sleep(0.1)
    return results

def main():
    print("STARTING AUDIO CUTTER HERO TRANSLATION")
    
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    keys_to_translate = ["visualizer_title", "visualizer_desc"]
    en_items = [(k, en_data["audio_cutter_page"][k]) for k in keys_to_translate]
    
    all_files = [f for f in os.listdir(LOCALES_DIR) if f.endswith('.json') and f != 'en.json']
    
    for idx, filename in enumerate(all_files):
        lang_code = filename.split('.')[0]
        google_lang = LANG_MAP.get(lang_code, lang_code)
        file_path = os.path.join(LOCALES_DIR, filename)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            target_data = json.load(f)
            
        translated = batch_translate(en_items, google_lang)
        
        for k, v in translated.items():
            target_data["audio_cutter_page"][k] = v
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(target_data, f, ensure_ascii=False, indent=2)
        print(f"  [SUCCESS] {filename}")
        
    print("TRANSLATION COMPLETE!")

if __name__ == "__main__":
    main()
