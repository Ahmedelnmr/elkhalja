import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

target_dir = r"e:\Freelance\frontEnd\الخليجية"

def replace_in_files():
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content.replace('logo.jpg', 'logo.png')
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")
                        
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

replace_in_files()
