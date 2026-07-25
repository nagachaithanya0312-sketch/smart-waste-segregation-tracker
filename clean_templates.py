import os
import re

head_template = '''    <!-- Vendor & Font CSS (Offline & GitHub Pages Ready) -->
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/animate.min.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom Style -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">'''

js_template = '''    <!-- Vendor JS -->
    <script src="{{ url_for('static', filename='vendor/js/bootstrap.bundle.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>'''

files = ["index.html", "working.html", "about.html", "applications.html", "future.html", "conclusion.html"]

for f in files:
    tpath = os.path.join("templates", f)
    if os.path.exists(tpath):
        with open(tpath, "r", encoding="utf-8") as file:
            content = file.read()
            
        # Clean head
        content = re.sub(
            r'<!-- Bulletproof CSS Links[\s\S]*?<!-- Custom Style -->\s*<link rel="stylesheet" href="[^"]*css/style\.css">[\s\S]*?<link rel="stylesheet" href="[^"]*css/style\.css">',
            head_template,
            content
        )

        # Clean js
        content = re.sub(
            r'<!-- Bulletproof JS Links -->[\s\S]*?<script src="[^"]*js/script\.js"></script>',
            js_template,
            content
        )
        
        # Clean hero.svg image tag
        content = content.replace(
            'src="{{ url_for(\'static\', filename=\'images/hero.svg\') }}" onerror="this.onerror=null; this.src=\'static/images/hero.svg\'; if(!this.src) this.src=\'images/hero.svg\';"',
            'src="{{ url_for(\'static\', filename=\'images/hero.svg\') }}"'
        )

        with open(tpath, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Cleaned templates/{f}")

print("Templates cleaned up with pristine structure!")
