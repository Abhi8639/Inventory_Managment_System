# Inventory Management System with Multi Warehouse Support


## Prerequisites

1. **PostgreSQL**:
   - Install PostgreSQL on your system.
   - Create a database named `inventory_management_system`.

2. **Java Development Kit (JDK)**:
   - Install JDK (Java Development Kit), version 11 or higher.

3. **Node.js and npm**:
   - Install Node.js, which includes npm (Node Package Manager).

4. **React**:
   - React is used for the frontend. 

---

## Database Setup

1. **Create the Database**:
   - Open **pgAdmin**.
   - Create a database named `inventory_management_system`.

2. **Run Database Queries**:
   - Switch to the **final_prototype** branch containing the `IMS_DB_QUERIES_PostgreSql (2).sql` file.
   - Run all the queries in the `IMS_DB_QUERIES_PostgreSql (2).sql` file in your `inventory_management_system` database.

---

## Backend Setup (Spring Boot)

1. **Import the Backend Project**:
   - Open **Eclipse IDE**.
   - Import the backend project as a **Maven project**.
   - Ensure the JDK is set up in Eclipse:
     - Go to `Window > Preferences > Java > Installed JREs` and add your JDK path.

2. **Configure Application Properties**:
   - Open `src/main/resources/application.properties`.
   - Update the PostgreSQL database credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_management_system
     spring.datasource.username=your_database_username
     spring.datasource.password=your_database_password
     ```

3. **Run the Backend**:
   - In Eclipse, right-click on the main application file (e.g., `InventoryManagementSystemApplication.java`).
   - Select `Run As > Spring Boot App`.

---

## Frontend Setup (React)

1. **Navigate to Frontend Directory**:
   - Open a terminal or command prompt.
   - Navigate to the React frontend folder.

2. **Install Dependencies**:
   - Run the following command to install required dependencies:
     ```bash
     npm install
     ```
   - Dependencies include:
     - `axios`
     - `react-router-dom`

3. **Start the Frontend**:
   - Run the following command to start the frontend:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Open your web browser and navigate to:
     ```
     http://localhost:3000
     ```

---

## Running the Full Application

1. Open **pgAdmin** and ensure the `inventory_management_system` database is running.
2. Start the backend server in Eclipse.
3. Start the React frontend by navigating to the frontend folder in the terminal and running:
   ```bash
   npm start
