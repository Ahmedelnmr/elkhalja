import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

target_dir = r"e:\Freelance\frontEnd\الخليجية"

# We want to replace '>اتصل بنا</a>' with '>اتصل بنا</a>\n                <a href="https://www.instagram.com/naqle_afshe_alkuet?igsh=bTlsajBocWFlcjFi" class="header-insta" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" style="font-size: 1.25rem;"></i></a>'

search_str = '>اتصل بنا</a>\n            </nav>'
replace_str = '>اتصل بنا</a>\n                <a href="https://www.instagram.com/naqle_afshe_alkuet?igsh=bTlsajBocWFlcjFi" class="header-insta" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="display:flex; align-items:center; justify-content:center;"><i class="fa-brands fa-instagram" style="font-size: 1.4rem;"></i></a>\n            </nav>'

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Because the spaces might vary, let's use a more robust replacement
                import re
                
                # find '>اتصل بنا</a>' followed by whitespace and '</nav>'
                pattern = re.compile(r'>اتصل بنا</a>\s*</nav>')
                
                def replacer(match):
                    return '>اتصل بنا</a>\n                <a href="https://www.instagram.com/naqle_afshe_alkuet?igsh=bTlsajBocWFlcjFi" class="header-insta" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="display:flex; align-items:center; justify-content:center;"><i class="fa-brands fa-instagram" style="font-size: 1.4rem;"></i></a>\n            </nav>'
                
                new_content = pattern.sub(replacer, content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

print("Done!")
