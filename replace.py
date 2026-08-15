import os
import sys

# Change standard output to utf-8 to avoid encoding issues
sys.stdout.reconfigure(encoding='utf-8')

target_dir = r"e:\Freelance\frontEnd\الخليجية"

replacements = {
    "الخليجية": "الصديق",
    "94404135": "99429120",
    "cXp2OGFtNHBjbWxo": "bTlsajBocWFlcjFi"
}

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(".html") or file.endswith(".txt") or file.endswith(".css") or file.endswith(".js"):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements.items():
                    new_content = new_content.replace(old, new)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

print("Done!")
