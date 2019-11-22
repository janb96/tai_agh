FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install sqlite3 --save
RUN npm install sequelize --save
RUN npm install axios
CMD ["npm", "start"]
