"""
Fix inline backtick characters inside content template literals in blog-posts.ts
Inline backticks (used as markdown code spans) conflict with TypeScript template literal syntax.
This script removes inline backticks from inside content fields.
"""
import re

filepath = "src/data/blog-posts.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find all content template literal blocks
# Pattern: content: `...` where ... spans multiple lines
# We need to find backtick-wrapped inline code inside these blocks and remove the backticks

# Strategy: split on the content field marker, process each content block
# A content block starts with: content: `\n  and ends with \n`\n  }

# Simpler approach: use a state machine line by line
lines = content.split('\n')
in_content = False
result = []
fixed_count = 0

for i, line in enumerate(lines):
    if not in_content:
        # Check if this line starts a content template literal
        stripped = line.strip()
        if stripped == 'content: `' or stripped.startswith('content: `\n'):
            in_content = True
        result.append(line)
    else:
        # We're inside a content template literal
        # Check if this line is the closing backtick (ends the template literal)
        stripped = line.strip()
        if stripped == '`':
            in_content = False
            result.append(line)
        else:
            # Fix inline backticks: `word` -> word (remove backtick wrapping from code spans)
            # Pattern: backtick followed by word chars, punctuation, spaces, then closing backtick
            new_line = re.sub(r'`([^`\n]{1,60}?)`', r'\1', line)
            if new_line != line:
                fixed_count += 1
                print(f"Line {i+1}: FIXED: {line.strip()[:80]}")
                print(f"         -> {new_line.strip()[:80]}")
            result.append(new_line)

fixed_content = '\n'.join(result)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(fixed_content)

print(f"\nTotal lines fixed: {fixed_count}")
print("Done!")
