# Step 1: Use an official Node.js base image with a specific version.
# Here, we use an Alpine version to keep the image lightweight.

FROM node:20-alpine

# Step 2: Set the working directory inside the container.
# This is where all subsequent commands will be executed.

WORKDIR /app

# Step 3: Set metadata for the image (optional but good practice).
# Use the LABEL instruction to describe the image (e.g., author, version, description).

LABEL author="Lisa" \
	version="1.0" \
	description="backend for CS3338 HW02"

# Step 4: Copy package.json and package-lock.json (if present) first to install dependencies.
# By copying these files before the rest of the application code, Docker can cache the npm install step.
# Hint: you can copy both files with one command! Remember .gitignore formatting, it's very similar.

COPY package*.json ./

# Step 5: Install npm dependencies.
# Use RUN to install the dependencies defined in package.json.

RUN npm install

# Step 6: Copy the rest of the backend code into the container.
# This step copies all remaining files (including backend server files) into the working directory.

COPY . .

# Step 7: Expose the port the backend application will listen on.
# Typically, Express runs on port 5000 or any custom port you define in your code.

EXPOSE 5000

# Step 8: Create a volume to persist data that is shared with the host machine (optional).
# This can be used to persist database files, logs, or any other data.

VOLUME ["/app/data"]

# Step 9: Specify the default command to run your application when the container starts.
# This should usually run the Node.js app with `npm start`.

CMD ["npm", "start"]
