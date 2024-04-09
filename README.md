# MyList - keep track of your stuff here.

## Homework 2

### For the seventh week:

#### Requirements:
- create a backend for your application using a language + framework of choice (ex: Java + Spring; Node.js + Express, etc)
- you should design your project using Model View Controller architecture, where View is your frontend app
- data should be persisted in memory and only in memory
- have at least 5 APIs, responsible for providing data for all your entity-based features:
     - get all entities ("GET")
     - get one entity, based on ID ("GET")
     - create entity ("POST")
     - update entity ("PUT")
     - delete entity ("DELETE")
- test your APIs using Postman
- connect the frontend to the backend using API Requests (you can use libraries, ex. axios)
- server side data validation
- manage data (state) on frontend globally, using built-in tools like context (built-in state management for React) or libraries like Redux
- have unit tests on all your features

#### Optional:
- sort, filter and pagination will be server-sided
- optimistic responses: update your frontend data optimistically before getting a response from the server

#### NEW REQUIREMENTS FUCKING HELL:
##### For bronze (5).
- unit tests 80% coverage.
- generated ID on backend.
- global state management for frontend.

##### For silver (7).
- internet down / server down => notificare pe frontend.
- generate data on backend (faker / java fake)

##### For gold (10).
- generate new entities and add them too the list on the backend from n to n seconds async.
- notify the frontend using websockets and update it in real time.
