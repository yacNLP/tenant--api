# Branch: Fetch and Insert Data to Database

This branch configures the project to:

1. **Fetch data**: Use an API to retrieve statistics for tenants (stores or headquarters).
2. **Insert data**: Store the retrieved data into a PostgreSQL relational database.

## Features

- Fetching data from an API.
- Validating and mapping the data to the database table structure.
- Inserting data into relational tables:
  - `tenants`
  - `tenant_child_ids`
  - `tenant_statistics`
- Handling errors during data insertion.

## Prerequisites

- A configured PostgreSQL database with the required tables.
- Environment variables set in a `.env` file for database connectivity.

## Key Commands

### Install dependencies
```bash
npm install
```

### Create database tables
```bash
node db/createTables.js
```

### Fetch and insert data
```bash
node node index.js
```