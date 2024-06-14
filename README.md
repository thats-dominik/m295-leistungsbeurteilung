## Einrichtung

### 1. Das Erstellen des Ordners

```mkdir leistungsbeurteilung-b-dominik-haemmerle```
```cd leistungsbeurteilung-b-dominik-haemmerle```

### 2. Initialisierung eines neuen Node.js Projektes

`npm init -y`
### 3. Installieren der erforderlichen Abhängigkeiten

1. **Express**

    `npm install express`
    
2. **Body-Parser**

    `npm install body-parser`
    
3. **jsonwebtoken**

    `npm install jsonwebtoken`
    
4. **Swagger UI Express**

    `npm install swagger-ui-express`
    
5. **swagger-autogen**

    `npm install swagger-autogen`
    

### 4. ESLint einrichten

`npx eslint --init`

### 5. API-Endpunkte testen

#### 5.1 Das Testen des Login-Endpunktes

1. Erstellen Sie eine POST-Anfrage zu `localhost:3000/login`.
2. Fügen Sie bei "Headers" einen `Content-Type: application/json` hinzu.
3. Senden Sie die folgende JSON-Daten im Body:

    ```json
    {   
    "mail": "dominik@example.com",
	"password": "dominik"
	}
    ```
    
4. Kopieren Sie das Token aus der Antwort.

#### 5.2 Das Testen des GET /tasks

1. Erstellen Sie eine GET-Anfrage zu `localhost:3000/tasks`.
2. Wählen Sie bei "Authorization" den Auth Type "Bearer Token" aus.
3. Fügen Sie das erhaltene Token bei "Token" ein.
4. Sie erhalten eine JSON-Ausgabe aller To-Do's.

#### 5.3 Das Testen des POST /tasks (Erstellen eines neuen Tasks)

1. Erstellen Sie eine POST-Anfrage zu `localhost:3000/tasks`.
2. Verwenden Sie den erhaltenen Token bei "Authorization".
3. Fügen Sie bei "Headers" `Content-Type: application/json` hinzu.
4. Senden Sie die folgende JSON-Daten im Body:
    
```json
{
"title": "Test-POST",   
"description": "Dies ist nur ein Test für den POST",   
"dueDate": "2024-06-23" 
}
```
    
5. Der neue Task wird erstellt und ausgegeben.

#### 5.4 Das Testen des GET /tasks/{id} (Task per ID finden)

1. Erstellen Sie eine GET-Anfrage zu `localhost:3000/tasks/1` (Beispiel-ID).
2. Verwenden Sie den Bearer Token bei "Authorization".
3. Sie erhalten das Task-Element mit der angegebenen ID im JSON-Format:
    
    ```json
    {   
    "id": 1,   
    "title": "Hausaufgaben machen",   
    "description": "Mathematik Dossier lösen",   
    "dueDate": "2024-06-15",   
    "resolvedDate": null 
    }
    ```
    

#### 5.5 Das Testen des PATCH /tasks/{id} (Task bearbeiten)

1. Erstellen Sie eine PATCH-Anfrage zu `localhost:3000/tasks/1` (Beispiel-ID).
2. Verwenden Sie den Bearer Token bei "Authorization".
3. Fügen Sie bei "Headers" `Content-Type: application/json` hinzu.
4. Senden Sie die folgende JSON-Daten im Body:
    
    ```json
    {   
    "title": "Update",   
    "description": "Aktualisierte Beschreibung",   
    "dueDate": "2024-07-01",   
    "resolvedDate": null 
    }```
    
5. Der Task wird aktualisiert und zurückgegeben.

#### 5.6 Das Testen des DELETE /tasks/{id} (Task löschen)

1. Erstellen Sie eine DELETE-Anfrage zu `localhost:3000/tasks/1` (Beispiel-ID).
2. Verwenden Sie den Bearer Token bei "Authorization".
3. Senden Sie die Anfrage und erhalten eine Bestätigungsmeldung:
    
    ```json
    {   
    "message": "Task erfolgreich gelöscht" 
    }
    ```
    

#### 5.7 Das Testen des POST /login

1. Erstellen Sie eine POST-Anfrage zu `localhost:3000/login`.
2. Fügen Sie bei "Headers" `Content-Type: application/json` hinzu.
3. Senden Sie die folgende JSON-Daten im Body:

    ```json
    {   
    "mail": "dominik@example.com",   
    "password": "dominik" 
    }
    ```
    
4. Sie erhalten ein Token im JSON-Format:

    ```json
    {   
    "token": "eyJhbGc..." 
    }```
    

#### 5.8 Das Testen des DELETE /logout

1. Erstellen Sie eine DELETE-Anfrage zu `localhost:3000/logout`.
2. Verwenden Sie den Bearer Token bei "Authorization".
3. Sie erhalten als Antwort einen Status 204 (No Content).

### 6. Swagger-Dokumentation generieren

Führen Sie den folgenden Befehl aus:

`node swagger.js`

Der Inhalt der `swagger.js` Datei ist:

```javascript
const swaggerAutogen = require('swagger-autogen')();  const outputFile = './swagger_output.json'; const endpointsFiles = ['./server.js'];  swaggerAutogen(outputFile, endpointsFiles);
```

Öffnen Sie `http://localhost:3000/swagger-ui/`, um das Swagger-Interface zu sehen und die Endpunkte zu testen.
