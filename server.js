/**
 * Autor: Dominik Hämmerle
 * Datum: 14.06.2024
 * Taskverwaltungs-App (To-Do List) mit Authentifizierung
 */

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

const app = express();
const port = 3000;

const SECRET_KEY = 'dominik';

// Middleware
app.use(bodyParser.json());

// Beispiele für die Tasks
let tasks = [
  {
    id: 1,
    title: "Hausaufgaben machen",
    description: "Mathematik Dossier lösen",
    dueDate: "2024-06-15",
    resolvedDate: null
  },
  {
    id: 2,
    title: "Zimmer aufräumen",
    description: "Zimmer aufräumen und putzen, Pflanzen giessen",
    dueDate: "2024-06-16",
    resolvedDate: null
  },
  {
    id: 3,
    title: "Gym gehen",
    description: "Rücken & Bizeps trainieren",
    dueDate: "2024-06-17",
    resolvedDate: null
  },
];

// Middleware Tokens überprüfen außer /login & /swagger-ui
app.use((request, response, next) => {
    if (request.path.startsWith('/swagger-ui') || request.path === '/login') {
      return next();
    }

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Unberechtigter Zugriff - Token nicht angegeben' });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    response.status(401).json({ error: 'Unberechtigter Zugriff - Ungültiger Token' });
  }
});

// POST /login Endpunkt - Credentials überprüfen und Token zurückgeben
app.post('/login', (request, response) => {
    const { mail, password } = request.body;
    if (mail === "dominik@example.com" && password === "dominik") {
      const token = jwt.sign({ mail }, SECRET_KEY, { expiresIn: '1h' });
      response.json({ token });
    } else {
      response.status(401).json({ error: 'Ungültige Zugangsdaten' });
    }
  });

  // GET /tasks Endpunkt - Alle Tasks abrufen
    app.get('/tasks', (request, response) => {
    response.json(tasks);
     });

// POST /tasks Endpunkt - Neuer Task erstellen
    app.post('/tasks', (request, response) => {
        const newTask = request.body;
        if (!newTask || !newTask.title || !newTask.description || !newTask.dueDate) {
            return response.status(422).json({ error: 'Ungültige Daten - Titel, Beschreibung & Fälligkeitsdatum werden benötigt'});
        }
        newTask.id = tasks.length + 1;
        newTask.resolvedDate = null; 
        tasks.push(newTask);
        response.status(201).json(newTask);
    });

// GET /tasks/{id} Endpunkt - Einen einzelnen Task per ID aufrufen
    app.get('/tasks/:id', (request, response) => {
        const taskId = parseInt(request.params.id);
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            response.json(task);
        } else {
            response.status(404).json({ error: "Task wurde nicht gefunden"});
        }
    });

// PATCH /tasks/{id} Endpunkt - einen bestehenden Task bearbeiten
app.patch("/tasks/:id", (request, response) => {
    const taskId = parseInt(request.params.id);
    const updatedTask = request.body;
    if (!updatedTask || !updatedTask.title || !updatedTask.description) {
      return response.status(400).json({ error: "Ungültige Daten - Titel und Beschreibung werden benötigt" });
    }
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      response.json(tasks[taskIndex]);
    } else {
      response.status(404).json({ error: "Task nicht gefunden" });
    }
  });

// DELETE /tasks/{id} Endpunkt - Einen Task löschen
app.delete("/tasks/:id", (request, response) => {
    const taskId = parseInt(request.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== taskId);
    if (tasks.length < initialLength) {
      response.json({ message: "Task erfolgreich gelöscht" });
    } else {
      response.status(404).json({ error: "Task nicht gefunden" });
    }

  });

// DELETE /logout Endpunkt - Token als ungültig markieren
app.delete('/logout', (request, response) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Unberechtigter Zugriff - Token nicht angegeben' });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET_KEY);
    response.status(204).end();
  } catch (error) {
    response.status(401).json({ error: 'Unberechtigter Zugriff - Ungültiger Token' });
  }
});

// GET /verify Endpunkt - Token auf Gültigkeit überprüfen
app.get ('/verify', (request, response) => {
    response.json({ message: "Token ist gültig"});
})

//SwaggerUi einbinden
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
