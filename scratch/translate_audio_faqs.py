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
        'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
            print(f"      [RETRY] Attempt {attempt+1} failed: {e}")
            time.sleep(2 + attempt)
    return text

def preprocess_text(v):
    v = v.replace('\r\n', '\n')
    v = v.replace('\n\n', ' @@@@@ ')
    v = v.replace('\n', ' @@@ ')
    return v

def postprocess_text(v, orig_v):
    v = re.sub(r'\s*@@@@@\s*', '\n\n', v)
    v = re.sub(r'\s*@@@\s*', '\n', v)
    
    if '\n\n' in orig_v and '\n\n' not in v:
        v = v.replace('\n', '\n\n')
        
    if orig_v.strip().isupper():
        v = v.upper()
    return v

def batch_translate(items, target_lang):
    if not items: return {}
    results = {}
    delimiter = " |||| "
    keys = [item[0] for item in items]
    vals = [item[1] for item in items]
    processed_vals = [preprocess_text(v) for v in vals]
    joined_text = delimiter.join(processed_vals)
    
    print(f"  Translating {len(keys)} keys for '{target_lang}'...")
    translated_joined = translate_mobile(joined_text, target_lang)
    
    if translated_joined and "ERROR" not in translated_joined:
        translated_vals = re.split(r'\s*\|{2,4}\s*', translated_joined)
        if len(translated_vals) == len(vals):
            for k, orig_v, trans_v in zip(keys, vals, translated_vals):
                results[k] = postprocess_text(trans_v.strip(), orig_v)
            return results

    # Fallback key-by-key
    print(f"    [FALLBACK] Running key-by-key for '{target_lang}'...")
    for k, v in items:
        trans_v = translate_mobile(preprocess_text(v), target_lang)
        results[k] = postprocess_text(trans_v.strip(), v)
        time.sleep(0.2)
    return results

def main():
    print("STARTING AUDIO CUTTER FAQS TRANSLATION")
    
    with open(ENGLISH_FILE, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    keys_to_translate = [
        "faq_title",
        "q1", "a1",
        "q2", "a2",
        "q3", "a3",
        "q4", "a4",
        "q5", "a5",
        "q6", "a6",
        "q7", "a7",
        "q8", "a8",
        "q9", "a9",
        "q10", "a10",
        "q11", "a11",
        "q12", "a12",
        "q13", "a13",
        "q14", "a14"
    ]
    
    en_items = [(k, en_data["audio_cutter_page"][k]) for k in keys_to_translate]
    
    all_files = sorted([f for f in os.listdir(LOCALES_DIR) if f.endswith('.json') and f != 'en.json'])
    
    total = len(all_files)
    for idx, filename in enumerate(all_files):
        lang_code = filename.split('.')[0]
        google_lang = LANG_MAP.get(lang_code, lang_code)
        file_path = os.path.join(LOCALES_DIR, filename)
        
        print(f"[{idx+1}/{total}] Processing {filename} ({lang_code})")
        with open(file_path, 'r', encoding='utf-8') as f:
            target_data = json.load(f)
            
        translated = {}
        chunk_size = 10
        for i in range(0, len(en_items), chunk_size):
            chunk = en_items[i:i+chunk_size]
            translated_chunk = batch_translate(chunk, google_lang)
            translated.update(translated_chunk)
            time.sleep(0.3)
        
        if "audio_cutter_page" not in target_data:
            target_data["audio_cutter_page"] = {}
            
        for k, v in translated.items():
            target_data["audio_cutter_page"][k] = v
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(target_data, f, ensure_ascii=False, indent=2)
        print(f"  [SUCCESS] Updated {filename}")
        time.sleep(0.5)
        
    print("TRANSLATION COMPLETE!")

if __name__ == "__main__":
    main()
