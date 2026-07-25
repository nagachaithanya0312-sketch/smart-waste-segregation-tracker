# Smart Waste Segregation Tracker

A modern, AI-inspired web application designed to track, classify, and guide the segregation of household and industrial waste into appropriate eco-friendly dustbins. Built for college mini-project presentations with modern Glassmorphism UI, interactive vector diagrams (Flowchart, DFD Level 0, System Architecture, Components Diagram, UML Diagrams), dynamic search API, and dark mode support.

---

## 🌟 Key Features

* 🚀 **Real-Time Classification Engine**: Fast lookup for waste categories, dustbin color coding, and disposal instructions.
* 🌿 **Modern Glassmorphism & Eco Theme**: Sleek green & blue color gradients, floating leaves particle animation, and dark mode toggle.
* 📊 **Comprehensive System Diagrams**: Built-in interactive SVG diagrams:
  - System Flowchart
  - Data Flow Diagram (DFD Level 0)
  - System Architecture Diagram
  - Components Diagram
  - UML Use Case, Sequence, Activity & Class Diagrams
* 📱 **Fully Responsive Layout**: Integrated Bootstrap 5 grid & custom responsive CSS.
* 💡 **Future Innovations & Calculators**: AI Camera Simulator, Voice Search demo, and Carbon Footprint Savings Calculator.

---

## 📂 Project Directory Structure

```
SmartWasteTracker/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│   ├── index.html
│   ├── about.html
│   ├── working.html
│   ├── applications.html
│   ├── future.html
│   └── conclusion.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        ├── logo.svg
        ├── hero.svg
        ├── organic.svg
        ├── plastic.svg
        ├── paper.svg
        ├── glass.svg
        ├── hazardous.svg
        └── ewaste.svg
```

---

## 🛠️ Tech Stack

* **Backend**: Python 3.x, Flask
* **Frontend**: HTML5, CSS3 (Vanilla + Custom Glassmorphism), JavaScript (ES6)
* **Libraries**: Bootstrap 5, Font Awesome 6, Google Fonts (Plus Jakarta Sans / Outfit)
* **Design Pattern**: MVC (Model-View-Controller) pattern with REST API endpoints

---

## ⚡ Quick Start Guide

### 1. Clone or Download Project
Ensure Python 3.8+ is installed on your system.

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
python app.py
```

### 4. Access Web Interface
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 📜 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET/POST` | `/api/search` | Classifies waste item passed via JSON body `{"item": "..."}` or query parameter `?item=...` |
| `GET` | `/api/categories` | Retrieves category metadata and dustbin colors |
| `GET` | `/api/stats` | Returns real-time database indexing stats |

---

## 📄 License
This project is open-source under the MIT License for educational and academic mini-project presentations.
