import os
import re

template_dir = "templates"
files = ["index.html", "working.html", "about.html", "applications.html", "future.html", "conclusion.html"]

for fname in files:
    path = os.path.join(template_dir, fname)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        # Update Head CSS links if not already updated
        if "vendor/css/bootstrap.min.css" not in content:
            head_replace = '''    <!-- Local Vendor & Font CSS (Offline & GitHub Pages Ready) -->
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
            
            # Replace old head stylesheet section
            content = re.sub(
                r'<!-- Google Fonts -->[\s\S]*?<link rel="stylesheet" href="\{\{\s*url_for\(\'static\',\s*filename=\'css/style\.css\'\)\s*\}\}">',
                head_replace,
                content
            )

        # Update Footer JS links if not already updated
        if "vendor/js/bootstrap.bundle.min.js" not in content:
            js_replace = '''    <!-- Local & CDN Vendor JS -->
    <script src="{{ url_for('static', filename='vendor/js/bootstrap.bundle.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>'''

            content = re.sub(
                r'<script src="https://cdn\.jsdelivr\.net/npm/bootstrap@5\.3\.2/dist/js/bootstrap\.bundle\.min\.js"></script>[\s\S]*?<script src="\{\{\s*url_for\(\'static\',\s*filename=\'js/script\.js\'\)\s*\}\}"></script>',
                js_replace,
                content
            )

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated template {fname}")

print("Template files updated successfully!")
