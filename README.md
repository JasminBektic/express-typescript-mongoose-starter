# Express-Typescript starter

Starting point for creating web app or API with Express and Typescript. After fighting with myself about design, I finally decided to go with more "classy" approach in mind. Folder structure is heavily influenced by how Laravel did it.

<p align="center">
  <img src="https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png" width="240" title="NodeJS">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="250" alt="Express">
  <img src="https://i0.wp.com/dinocloudconsulting.com/wp-content/uploads/2017/09/typescript.png?ssl=1" width="260" alt="Typescript">
  <img src="https://iscte.acm.org/wp-content/uploads/2015/02/mongodb-logo1.png" width="250" alt="MongoDB">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfldcqVxzUIOz0lU2alnM1LmryGMbIQUQS6RnDiPTwwMH0aAvs" width="120" alt="Pug">
  <img src="https://cdn-images-1.medium.com/max/648/1*3F5eonRQqcP35KglajAa8Q.png" width="250" alt="Mongoose">
  <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Passport-logo.png" width="250" alt="Passport">
  <img src="https://i2.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" width="170" alt="Nodemailer">
</p>


# Setup

Currently, this setup will work <strong>only locally</strong>. If this condition is satisfied continue with the instructions below.

* Install dependecies
```
npm install
```

* Copy env.example and configure .env
```
cp .env.example .env
```

| Option | Predefined values | Description |
| --- | --- | --- |
| NODE_ENV | development, production | Define in what environment are you working currently. Set to development if you need to test, debug, etc. |
| DB_HOST | localhost | Currently starter works only locally |
| DB_PORT | 27017 | Default is `27017` |
| DB_NAME |  | Place for your db name. |
| DB_USERNAME |  | Place for your db username. If db is not protected leave this value empty. |
| DB_PASSWORD |  | Place for your db password. If db is not protected leave this value empty. |
| PORT | 9000 | Could be any. Default is set to `9000` |
| SESSION_KEY |  | Protect sessions with this key. |
| API_PREFIX |  | Here is where you define url prefix for APIs calls. Route example: `/API_PREFIX/users/get` |
| API_KEY |  | Secret api key placed in request header. Header example: `x-api-key: secretapikey` |
| LOGS | ON, OFF | Just a switch for log activity. |
| MAIL_HOST |  | Define mail service. Example: `gmail` |
| MAIL_PORT |  | TLS protocol use `587` as standard. For SSL set value to `465` |
| MAIL_USERNAME |  | Sender email. Example: test@gmail.com |
| MAIL_PASSWORD |  | Sender password. |


* Start mongoDB server
```
mongod
```

* Start project
```
npm start
```

Get started by navigating to http://localhost:9000