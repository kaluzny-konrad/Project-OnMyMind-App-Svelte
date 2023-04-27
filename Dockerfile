FROM node:latest
COPY . /src
COPY . /static
RUN npm install
CMD ["npm", "start"]
