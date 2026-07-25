import os
import re

files = ["index.html", "working.html", "about.html", "applications.html", "future.html", "conclusion.html"]

replacements = [
    (r"\{\{\s*url_for\('home'\)\s*\}\}", "index.html"),
    (r"\{\{\s*url_for\('working'\)\s*\}\}", "working.html"),
    (r"\{\{\s*url_for\('applications'\)\s*\}\}", "applications.html"),
    (r"\{\{\s*url_for\('future'\)\s*\}\}", "future.html"),
    (r"\{\{\s*url_for\('conclusion'\)\s*\}\}", "conclusion.html"),
    (r"\{\{\s*url_for\('about'\)\s*\}\}", "about.html"),
    (r"\{\{\s*url_for\('static',\s*filename=['\"](.*?)['\"]\)\s*\}\}", r"static/\1"),
]

for fname in files:
    src_path = os.path.join("templates", fname)
    if os.path.exists(src_path):
        with open(src_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        for pattern, repl in replacements:
            content = re.sub(pattern, repl, content)
            
        with open(fname, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed and synced root {fname} from templates/{fname}")

print("All static HTML files cleaned and synced!")

