::: mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Arial Black",
    "fontSize": "18px",
    "primaryColor": "#0f172a",
    "primaryTextColor": "#ffffff",
    "lineColor": "#000000",
    "background": "#f8fafc",
    "actorBorder": "#000000",
    "actorBackground": "#e5e7eb",
    "noteBackgroundColor": "#fde68a",
    "noteTextColor": "#000000",
    "signalColor": "#000000",
    "signalTextColor": "#000000"
  }
}}%%

sequenceDiagram
    autonumber

    participant Node as Node.js Runtime
    participant Server as server.js
    participant Express as express
    participant Dotenv as dotenv
    participant Cors as cors
    participant DB as MongoDB
    participant Mongoose as mongoose
    participant Router as task.routes.js
    participant Controller as task.controller.js
    participant Model as Task(model.js)

    %% ===== Application Startup =====
    Node->>Server: node server.js

    Server->>Dotenv: import dotenv
    Dotenv-->>Server: process.env loaded

    Server->>Express: import express
    Express-->>Server: app instance created

    Server->>Cors: import cors
    Cors-->>Server: CORS middleware enabled

    %% ===== Database Connection =====
    Server->>Mongoose: import mongoose
    Server->>Mongoose: connect(MONGO_URI)
    Mongoose-->>DB: Open connection
    DB-->>Mongoose: Connection success
    Mongoose-->>Server: DB connected

    %% ===== Route Registration =====
    Server->>Router: import task.routes.js
    Router->>Controller: import controller functions
    Controller->>Model: import Task model

    %% ===== API Request Flow =====
    Node->>Server: HTTP Request /api/tasks
    Server->>Router: Forward request
    Router->>Controller: Call createTask()

    %% ===== Business Logic =====
    Controller->>Model: Task.create(data)
    Model->>Mongoose: Insert document
    Mongoose->>DB: Save record
    DB-->>Mongoose: Saved
    Mongoose-->>Model: Document
    Model-->>Controller: Task object

    %% ===== Response =====
    Controller-->>Router: JSON response
    Router-->>Server: Response forwarded
    Server-->>Node: HTTP 201 Created
::: mermaid