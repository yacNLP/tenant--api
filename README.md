# API Fetcher for Statistics Comparison

This repository contains a Node.js script to fetch and compare statistics from a REST API. The script calculates specific dates and sends them to the API endpoint to retrieve and display analytics data.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
API_URL= [URL]
TOKEN=Bearer [YOUR_ACCESS_TOKEN]
```
Replace `YOUR_ACCESS_TOKEN` & `URL` with a valid ones

---

## Run the Script
```bash
node fetch-tenants-api.js
```

The script will calculate the current date (`BaseDate`) and the same day from the previous year (`ComparisonDate`) before sending a request to the API. The console will display the API response.

---

## File Structure
- `fetch-tenants-api.js`: Main script for fetching and processing data.
- `.env`: Contains sensitive environment variables 

---

## License
This project is licensed under the MIT License.