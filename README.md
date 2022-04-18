# ultra coding test

```bash
docker composer up dev
```

# tools

- See `ultra-coding-test.postman_collection.json` for Postman test requests

# Endpoints

```
POST    /                     Create game
PUT     /                     Update game
DELETE  /:id                  Delete game with :id
GET     /                     Get all games
GET     /:id                  Get one game with :id
GET     /get-publisher/:name  get publisher of game :name
GET     /cleanup              Remove games older than 18 months and discount games older than 12 months
```

# stuff
Weird docker prob: https://github.com/docker/compose/issues/4337
Next time: https://docs.nestjs.com/openapi/introduction