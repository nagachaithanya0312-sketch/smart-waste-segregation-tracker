import os

clean_head_template = '''    <!-- Vendor & Font CSS (Offline & GitHub Pages Ready) -->
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='vendor/css/animate.min.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom Style -->
    <link rel="stylesheet" href="{{ url_for('static', filename='./css/style.css') }}">'''

clean_js_template = '''    <!-- Vendor JS -->
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

        # Find head start and end
        head_start = content.find("<!--")
        head_end = content.find("</head>")
        
        # Replace head section cleanly
        lines = content.splitlines()
        new_lines = []
        in_head_css = False
        in_footer_js = False

        for line in lines:
            if "<!-- Bulletproof CSS Links" in line or "<!-- Local Vendor" in line or "<!-- Google Fonts" in line:
                in_head_css = True
                new_lines.append(clean_head_template)
                continue
            if in_head_css:
                if "<!-- Custom Style -->" in line or "./css/style.css" in line:
                    in_head_css = False
                continue
            
            if "<!-- Bulletproof JS Links" in line or "<!-- Local & CDN Vendor JS" in line or "<!-- Bootstrap 5 JS -->" in line:
                in_footer_js = True
                new_lines.append(clean_js_template)
                continue
            if in_footer_js:
                if "js/script.js" in line:
                    in_footer_js = False
                continue

            new_lines.append(line)

        new_content = "\n".join(new_lines)
        with open(tpath, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Cleaned templates/{f}")

print("Templates exact clean completed!")
