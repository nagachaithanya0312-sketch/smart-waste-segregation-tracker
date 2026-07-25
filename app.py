from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ============================================
# SMART WASTE SEGREGATION TRACKER
# Mini Project - Python Backend Logic (No DB Required)
# Language: Python 3
# ============================================

waste_data = {
    "banana peel": ("Wet Waste", "Green Bin", "Compost it"),
    "apple": ("Organic Waste", "Green Bin", "Compost it"),
    "vegetable waste": ("Organic Waste", "Green Bin", "Compost it"),
    "food waste": ("Wet Waste", "Green Bin", "Compost or place in organic bin"),
    "food": ("Wet Waste", "Green Bin", "Compost or place in organic bin"),

    "plastic bottle": ("Plastic Waste", "Blue Bin", "Clean, dry, and send for recycling"),
    "milk packet": ("Plastic Waste", "Blue Bin", "Recycle it"),
    "plastic cover": ("Plastic Waste", "Blue Bin", "Recycle it"),

    "newspaper": ("Paper Waste", "Blue Bin", "Flatten and send for paper recycling"),
    "paper": ("Paper Waste", "Blue Bin", "Recycle it"),
    "cardboard": ("Paper Waste", "Blue Bin", "Flatten box and place in paper bin"),

    "glass bottle": ("Glass Waste", "Glass Bin", "Rinse gently and deposit in glass bin"),
    "glass": ("Glass Waste", "Glass Bin", "Recycle it"),

    "metal can": ("Metal Waste", "Blue Bin", "Rinse and send for metal recycling"),
    "can": ("Metal Waste", "Blue Bin", "Rinse and send for metal recycling"),

    "battery": ("Hazardous Waste", "Red Bin", "Dispose safely at hazardous waste drop-off"),
    "medicine": ("Hazardous Waste", "Red Bin", "Dispose safely"),
    "light bulb": ("Hazardous Waste", "Red Bin", "Wrap safely and deposit at toxic collection point"),
    "bulb": ("Hazardous Waste", "Red Bin", "Wrap safely and deposit at toxic collection point"),

    "mobile phone": ("E-Waste", "E-Waste Bin", "Send to authorized E-Waste recycling center"),
    "mobile": ("E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"),
    "laptop": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
    "charger": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
}

category_metadata = {
    "Organic Waste": {
        "bin": "Green Bin",
        "badge_color": "success",
        "gradient": "linear-gradient(135deg, #11998e, #38ef7d)",
        "icon": "fa-leaf",
        "description": "Biodegradable organic waste that can be converted into natural compost and biofuel.",
        "examples": ["banana peel", "apple", "vegetable waste"],
        "instruction": "Compost it or place in Green Bin"
    },
    "Plastic Waste": {
        "bin": "Blue Bin",
        "badge_color": "primary",
        "gradient": "linear-gradient(135deg, #2193b0, #6dd5ed)",
        "icon": "fa-bottle-water",
        "description": "Non-biodegradable synthetic polymers that should be washed, compacted, and sent for recycling.",
        "examples": ["plastic bottle", "milk packet", "plastic cover"],
        "instruction": "Clean, dry, and put in Blue Bin for recycling"
    },
    "Paper Waste": {
        "bin": "Blue Bin",
        "badge_color": "info",
        "gradient": "linear-gradient(135deg, #4b6cb7, #182848)",
        "icon": "fa-newspaper",
        "description": "Recyclable paper, cardboard, and wood pulp materials. Keep clean and dry for processing.",
        "examples": ["newspaper", "paper", "cardboard"],
        "instruction": "Flatten and place in Blue Bin"
    },
    "Glass Waste": {
        "bin": "Glass Bin",
        "badge_color": "teal",
        "gradient": "linear-gradient(135deg, #00b4db, #0083b0)",
        "icon": "fa-wine-bottle",
        "description": "100% recyclable glass containers and jars that can be remelted indefinitely.",
        "examples": ["glass bottle", "glass"],
        "instruction": "Rinse gently and place in Glass Bin"
    },
    "Hazardous Waste": {
        "bin": "Red Bin",
        "badge_color": "danger",
        "gradient": "linear-gradient(135deg, #cb2d3e, #ef473a)",
        "icon": "fa-biohazard",
        "description": "Toxic, chemical, or bio-hazardous waste requiring specialized sanitary disposal.",
        "examples": ["battery", "medicine"],
        "instruction": "Handle with care and dispose safely in Red Bin"
    },
    "E-Waste": {
        "bin": "E-Waste Bin",
        "badge_color": "warning",
        "gradient": "linear-gradient(135deg, #f857a6, #ff5858)",
        "icon": "fa-laptop",
        "description": "Electronic equipment containing valuable metals and heavy toxins requiring specialized recycling.",
        "examples": ["mobile", "laptop", "charger"],
        "instruction": "Send to authorized E-Waste Collection Center"
    }
}

def classify_waste(query_text):
    query = (query_text or "").strip().lower()
    if not query:
        return None
    
    # 1. Exact match
    if query in waste_data:
        cat, bin_name, instruction = waste_data[query]
        return {
            "query": query_text,
            "category": cat,
            "bin": bin_name,
            "instruction": instruction,
            "found": True
        }
    
    # 2. Substring match
    for key, (cat, bin_name, instruction) in waste_data.items():
        if key in query or query in key:
            return {
                "query": query_text,
                "category": cat,
                "bin": bin_name,
                "instruction": instruction,
                "found": True
            }
            
    # 3. Categorical generic keywords fallback
    generic_keywords = {
        "organic": ("Organic Waste", "Green Bin", "Compost it"),
        "food": ("Organic Waste", "Green Bin", "Compost it"),
        "fruit": ("Organic Waste", "Green Bin", "Compost it"),
        "peel": ("Organic Waste", "Green Bin", "Compost it"),
        "plastic": ("Plastic Waste", "Blue Bin", "Recycle it"),
        "poly": ("Plastic Waste", "Blue Bin", "Recycle it"),
        "bottle": ("Plastic Waste", "Blue Bin", "Recycle it"),
        "paper": ("Paper Waste", "Blue Bin", "Recycle it"),
        "card": ("Paper Waste", "Blue Bin", "Recycle it"),
        "glass": ("Glass Waste", "Glass Bin", "Recycle it"),
        "battery": ("Hazardous Waste", "Red Bin", "Dispose safely"),
        "medicine": ("Hazardous Waste", "Red Bin", "Dispose safely"),
        "phone": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
        "laptop": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
        "charger": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
    }
    
    for kw, (cat, bin_name, instruction) in generic_keywords.items():
        if kw in query:
            return {
                "query": query_text,
                "category": cat,
                "bin": bin_name,
                "instruction": instruction,
                "found": True
            }

    # 4. Unknown item
    return {
        "query": query_text,
        "category": "Unknown Waste",
        "bin": "General / Audit Bin",
        "instruction": "Item not found in standard classification database. Please check manual eco-sorting guidelines or submit for AI review.",
        "found": False
    }

# Python Code Snippet string for the Code Modal
python_code_snippet = """# ============================================
# SMART WASTE SEGREGATION TRACKER
# Mini Project
# Language: Python
# ============================================

# Waste database
waste_data = {
    "banana peel": ("Organic Waste", "Green Bin", "Compost it"),
    "apple": ("Organic Waste", "Green Bin", "Compost it"),
    "vegetable waste": ("Organic Waste", "Green Bin", "Compost it"),

    "plastic bottle": ("Plastic Waste", "Blue Bin", "Recycle it"),
    "milk packet": ("Plastic Waste", "Blue Bin", "Recycle it"),
    "plastic cover": ("Plastic Waste", "Blue Bin", "Recycle it"),

    "newspaper": ("Paper Waste", "Blue Bin", "Recycle it"),
    "paper": ("Paper Waste", "Blue Bin", "Recycle it"),
    "cardboard": ("Paper Waste", "Blue Bin", "Recycle it"),

    "glass bottle": ("Glass Waste", "Glass Bin", "Recycle it"),
    "glass": ("Glass Waste", "Glass Bin", "Recycle it"),

    "battery": ("Hazardous Waste", "Red Bin", "Dispose safely"),
    "medicine": ("Hazardous Waste", "Red Bin", "Dispose safely"),

    "mobile": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
    "laptop": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
    "charger": ("E-Waste", "E-Waste Bin", "Send to E-Waste Center"),
}

print("=" * 50)
print("      SMART WASTE SEGREGATION TRACKER")
print("=" * 50)

while True:

    item = input("\\nEnter Waste Item: ").lower().strip()

    found = False

    # Simple NLP (Keyword Matching)
    for key in waste_data:
        if key in item or item in key:
            category, bin_name, instruction = waste_data[key]

            print("\\nWaste Category :", category)
            print("Dustbin        :", bin_name)
            print("Instruction    :", instruction)

            found = True
            break

    if not found:
        print("\\nWaste item not found.")
        print("Please dispose according to your local waste management rules.")

    choice = input("\\nDo you want to check another item? (yes/no): ").lower()

    if choice != "yes":
        print("\\nThank you for using Smart Waste Segregation Tracker.")
        break
"""

# ================= Routes =================

@app.route("/")
@app.route("/index.html")
def home():
    return render_template("index.html", python_code=python_code_snippet)

@app.route("/about")
@app.route("/about.html")
def about():
    return render_template("about.html", python_code=python_code_snippet)

@app.route("/working")
@app.route("/working.html")
def working():
    return render_template("working.html", python_code=python_code_snippet)

@app.route("/applications")
@app.route("/applications.html")
def applications():
    return render_template("applications.html", python_code=python_code_snippet)

@app.route("/future")
@app.route("/future.html")
def future():
    return render_template("future.html", python_code=python_code_snippet)

@app.route("/conclusion")
@app.route("/conclusion.html")
def conclusion():
    return render_template("conclusion.html", python_code=python_code_snippet)

# ================= API Endpoints =================

@app.route("/api/search", methods=["GET", "POST"])
def search_waste():
    if request.method == "POST":
        data = request.get_json(silent=True) or {}
        item = data.get("item", "")
    else:
        item = request.args.get("item", "")
    
    result = classify_waste(item)
    return jsonify(result or {"found": False, "error": "No item provided"})

@app.route("/api/code")
def get_python_code():
    return jsonify({"code": python_code_snippet})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
