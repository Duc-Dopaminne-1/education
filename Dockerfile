FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

EXPOSE 8080

USER node

CMD ["npm", "run", "start:prod", "--verbose"]
