import json
import sys

try:
    with open(r'c:\laragon\www\Video Compresor\src\locales\pt.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("Video Compresor pt.json is VALID")
except Exception as e:
    print(f"Video Compresor pt.json is INVALID: {e}")

try:
    with open(r'c:\laragon\www\TextoFix\src\locales\pt.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("TextoFix pt.json is VALID")
except Exception as e:
    print(f"TextoFix pt.json is INVALID: {e}")
