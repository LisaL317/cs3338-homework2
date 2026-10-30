# Homework 2

## Objective
In this assignment, you will containerize a simple full-stack application consisting of a backend, a frontend, and a Postgres database. You will build individual Dockerfiles for the backend and frontend, store your settings in a .env file, and create a Docker Compose file to orchestrate all three.

> If you get stuck, check the [Useful Documentation](#useful-documentation) section at the bottom.

---

## Part 1: Clone My Repository
1. **Clone the Repository**
    - a. Download the starter repository from the following link: https://github.com/mohsley/cs3338-homework2
    - b. Make sure to clone this into a folder where you plan to work, and open it in your terminal or code editor. The project will have the following structure:

```
assignment-folder/
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile       <-- you'll edit this
│   ├── package.json
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   │   ├── index.html
│   ├── .dockerignore
│   ├── Dockerfile       <-- you'll edit this
│   ├── package.json
├── .env.example         <-- you'll copy this
└── docker-compose.yml   <-- you'll edit this
```

---

## Part 2: Build the Dockerfiles
1. **Complete the Dockerfiles**
    - a. You will find two folders: `frontend/` and `backend/`. Each folder is missing commands in their Dockerfile. Your job is to create one in each.
    - b. For both Dockerfiles, follow the steps written as a comment before the line
        - i. Feel free to test each of these separately before trying the docker-compose!
        - ii. Hint: Make sure you're in the right folder when you build (i.e., `cd backend` or `cd frontend` before running `docker build`)
        - iii. Note: If you run the backend image by itself, it will stop with "Could not connect to the database". This is expected, the database is added in Part 4.
2. **Push your images to Docker Hub**
    - a. Push your frontend and backend image to your docker hub account
        - i. Make sure to be logged into your account!
    - b. If your image name doesn't have the format: `{USERNAME}/{IMAGE NAME}`
      You can rename your image with the following command:
      ```
      docker tag {IMAGE NAME} {USERNAME}/{IMAGE NAME}
      ```
    - c. For example if the professor made this mistake it would look like this for him:
      ```
      docker tag fake-backend-image quinzey1/fake-backend-image
      ```
    - d. Push each docker image and submit a screenshot named **published-images.png** showing your repository on Docker Hub.

---

## Part 3: Set Up the .env File
1. **Create your .env file**
    - a. At the root level, make a copy of `.env.example` and name it `.env`
    - b. Fill in each value. `STUDENT_NAME` is your name, the Postgres values can be anything you want.
    - c. Docker Compose reads `.env` automatically. To use a value in docker-compose.yml, write `${VARIABLE_NAME}`, for example `${POSTGRES_USER}`

---

## Part 4: Create the Docker-Compose
1. **Fill out the docker-compose.yml**
    - a. At the root level (outside of frontend and backend), there is a file named `docker-compose.yml`. Your goal is to fill out the file to connect all three services (db, backend, frontend) using Docker Compose.
    - b. You don't need to know databases for this! Here is everything you need for the db service:
        - i. Image: `postgres:16-alpine`
        - ii. Environment variables: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` (use the values from your `.env`)
        - iii. Data folder for the volume: `/var/lib/postgresql/data`
    - c. The backend needs these environment variables: `STUDENT_NAME`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`
        - i. `DB_HOST` is the name of your database service (`db`)
        - ii. The other values come from your `.env`
    - d. Use `depends_on` so the backend starts after the db (the frontend already does this for the backend)
2. **Test your docker-compose.yml to make sure it runs**:
    ```
    docker-compose build --no-cache
    ```
    To start up your build:
    ```
    docker-compose up
    ```
    > Hint: If you make any changes to your docker-compose after building, you will need to rebuild, simply recall the build command.
    >
    > Hint: On newer Docker installs the command is `docker compose` (with a space) instead of `docker-compose`. Both work the same.
3. When it runs with no issues, open a second terminal and run `docker-compose ps`. Submit a screenshot named **docker-compose.png** showing all three services running
4. Open http://localhost:3000 and submit a screenshot named **website.png** showing your name and the visit counter

---

## Part 5: Submission
1. **Make sure to submit your:**
    - a. published-images.png
    - b. docker-compose.png
    - c. website.png
2. Zip all three files and submit on canvas

---

## Useful Documentation
**Part 2: Dockerfiles and Docker Hub**
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Build, tag, and publish an image](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/)

**Part 3: .env file**
- [Using variables in Compose](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)

**Part 4: Docker Compose**
- [Compose services reference](https://docs.docker.com/reference/compose-file/services/) (image, ports, volumes, environment, depends_on, networks)
- [Networking in Compose](https://docs.docker.com/compose/how-tos/networking/)
- [Postgres image on Docker Hub](https://hub.docker.com/_/postgres)
