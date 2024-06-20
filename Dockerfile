FROM node
WORKDIR /app
RUN npm i -g pnpm@8.15.4
RUN npm i -g prisma
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run generate
RUN pnpm run build
EXPOSE 8080
CMD ["npm", "run", "start:prod", "--verbose"]