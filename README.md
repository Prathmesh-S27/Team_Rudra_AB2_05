# Ransomware Early Detection & Response System (PS 05)

## Team Name: Team Rudra

This repository contains the implementation of the **Ransomware Early Detection & Response System**, a machine learning-based approach for identifying cyber threats, specifically ransomware attacks. The project is structured into two main components:

- **Frontend**: A React-based web application for user interaction.
- **Backend**: A Python Flask API for handling predictions using a trained ML model.

## Project Overview

This project utilizes **machine learning models** to analyze network traffic and classify it as normal or malicious (DDoS, Ransomware). The dataset used for training contains various network attributes such as packet length, protocol type, and traffic flow metrics.

### Features:
- Detects cyber threats in real time.
- User-friendly web interface to input data and view predictions.
- Flask API for ML model inference.
- Dockerized backend for easy deployment.

## Repository Structure:
```
- backend/          # Backend API and machine learning model
- frontend/         # React-based frontend application
- node_modules/     # Dependencies for frontend
- README.md         # General repository overview
- package.json      # Frontend dependency manager
- package-lock.json # Lock file for frontend dependencies
```

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the Flask API:
   ```sh
   python app.py
   ```

## API Testing
- The backend API runs at `http://localhost:5000`
- Use **Postman** or the **frontend application** to send requests to the `/predict` endpoint.

---

Refer to the **frontend** and **backend** READMEs for specific details regarding their setup and usage.

---

### License
This project is open-source but for hackthon and available for contributions after hackthon is over.

## Contact
For any inquiries, feel free to reach out to **Team Rudra**.
