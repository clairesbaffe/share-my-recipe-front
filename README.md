# share-my-recipe-front
Recipe sharing app

## Start app

Before starting, create a `.env` file in the root of the project with the following content:

```bash
REACT_APP_API_URL=<YOUR_API_URL>
# For example : REACT_APP_API_URL="http://localhost:8080/api/v1"
```

To start the app, run the following command in a terminal:
```bash
docker-compose up --build -d
```

Once the application has started, open your browser and go to: http://localhost:1003.