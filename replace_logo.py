import os
import re
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
                    
                    # Determine prefix for Images path (for subdirectories)
                    rel_path = os.path.relpath(filepath, target_dir)
                    depth = rel_path.count(os.sep)
                    img_prefix = "../" * depth + "Images/logo.jpg"
                    
                    # 1. Replace Header Logo
                    # <a href="index.html" class="logo">
                    #     <i class="fa-solid fa-truck-fast"></i>
                    #     الصديق
                    # </a>
                    
                    # Regex to match the logo block in header
                    header_logo_pattern = re.compile(
                        r'(<a\s+href="[^"]*index\.html"\s+class="logo"\s*>)\s*<i\s+class="fa-solid\s+fa-truck-fast"></i>\s*الصديق\s*</a>', 
                        re.IGNORECASE
                    )
                    
                    def header_replacer(match):
                        return f'{match.group(1)}\n                <img src="{img_prefix}" alt="الصديق" class="site-logo">\n            </a>'
                    
                    content = header_logo_pattern.sub(header_replacer, content)
                    
                    # 2. Replace Footer Logo
                    # <div class="footer-logo">
                    #     <i class="fa-solid fa-truck-fast"></i>
                    #     الصديق
                    # </div>
                    footer_logo_pattern = re.compile(
                        r'<div\s+class="footer-logo">\s*<i\s+class="fa-solid\s+fa-truck-fast"></i>\s*الصديق\s*</div>',
                        re.IGNORECASE
                    )
                    
                    def footer_replacer(match):
                        return f'<div class="footer-logo">\n                        <img src="{img_prefix}" alt="الصديق" class="site-logo-footer">\n                    </div>'
                    
                    content = footer_logo_pattern.sub(footer_replacer, content)
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
                    print(f"Updated {filepath}")
                    
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

replace_in_files()
