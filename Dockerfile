FROM node:17-alpine AS development
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:17-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
