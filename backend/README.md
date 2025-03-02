### **Backend Combined File (backend/README.md)**  

# Backend - Ransomware Early Detection & Response System

## Overview
This is the **backend** of the **Ransomware Early Detection & Response System**, developed using **Flask**. It provides an API for processing network traffic data and predicting whether the traffic is normal or an attack.

## Features
- **REST API** for cyber threat detection.
- **Machine Learning Integration** using pre-trained models.
- **Docker Support** for containerized deployment.

## Technologies Used
- **Python** (3.11 or later)
- **Flask** (for API development)
- **Scikit-learn** (ML model)
- **Pandas & NumPy** (data handling)
- **Matplotlib** (data visualization)
- **Pickle** (model serialization)
- **Docker** (for deployment)

---

## Setup Instructions
### Prerequisites
- Install **Python 3.11+**.
- Install **pipenv** for virtual environment management.

### Installation & Running the API
1. Navigate to the backend directory:
   ```sh
   cd backend
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   python predict.py

3. Check it on :
   ```sh
   http://localhost:5000

4. For Docker:
   ```sh
   docker build -t flask-predict-app .
   docker run -p 5002:5002 flask-predict-app




