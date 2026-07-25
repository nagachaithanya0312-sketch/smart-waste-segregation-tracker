import os
import re

head_block_templates = '''    <!-- Bulletproof CSS Links (Works in Flask, Local Static, Live Server, & GitHub Pages) -->
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/animate.min.css') }}">
    <link rel="stylesheet" href="../static/vendor/css/bootstrap.min.css">
    <link rel="stylesheet" href="../static/vendor/css/all.min.css">
    <link rel="stylesheet" href="static/vendor/css/bootstrap.min.css">
    <link rel="stylesheet" href="static/vendor/css/all.min.css">
    <link rel="stylesheet" href="vendor/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom Style -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <link rel="stylesheet" href="../static/css/style.css">
    <link rel="stylesheet" href="static/css/style.css">
    <link rel="stylesheet" href="css/style.css">'''

js_block_templates = '''    <!-- Bulletproof JS Links -->
    <script src="{{ url_for('static', filename='vendor/js/bootstrap.bundle.min.js') }}"></script>
    <script src="../static/vendor/js/bootstrap.bundle.min.js"></script>
    <script src="static/vendor/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
    <script src="../static/js/script.js"></script>
    <script src="static/js/script.js"></script>
    <script src="js/script.js"></script>'''

# Apply to templates
files = ["index.html", "working.html", "about.html", "applications.html", "future.html", "conclusion.html"]
for f in files:
    tpath = os.path.join("templates", f)
    if os.path.exists(tpath):
        with open(tpath, "r", encoding="utf-8") as file:
            content = file.read()
            
        # Replace head stylesheets
        content = re.sub(
            r'(?:<!-- Local Vendor[\s\S]*?-->|<!-- Google Fonts -->|<link[^>]*font-awesome[^>]*>)[\s\S]*?<link rel="stylesheet" href="\{\{\s*url_for\(\'static\',\s*filename=\'css/style\.css\'\)\s*\}\}">',
            head_block_templates,
            content
        )
        
        # Replace footer scripts
        content = re.sub(
            r'(?:<!-- Local & CDN Vendor JS -->|<!-- Bootstrap 5 JS -->)[\s\S]*?<script src="\{\{\s*url_for\(\'static\',\s*filename=\'js/script\.js\'\)\s*\}\}"></script>',
            js_block_templates,
            content
        )
        
        # Ensure hero.svg has image fallback
        content = content.replace(
            'src="{{ url_for(\'static\', filename=\'images/hero.svg\') }}"',
            'src="{{ url_for(\'static\', filename=\'images/hero.svg\') }}" onerror="this.onerror=null; this.src=\'static/images/hero.svg\'; if(!this.src) this.src=\'images/hero.svg\';"'
        )
        content = content.replace(
            'src="static/images/hero.svg"',
            'src="static/images/hero.svg" onerror="this.onerror=null; this.src=\'images/hero.svg\'; if(!this.src) this.src=\'../static/images/hero.svg\';"'
        )

        with open(tpath, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated templates/{f}")

print("All template links bulletproofed successfully!")
