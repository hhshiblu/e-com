# Dockerfile for React client

# Build react client
FROM node:18

# Working directory be app
WORKDIR /app

COPY package.json ./

###  Installing dependencies
RUN npm config set legacy-peer-deps true
RUN npm install 

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]