
# Student Database API

This is a basic RESTful API for managing a student database. It allows you to perform CRUD (Create, Read, Update, Delete) operations on student records.
## API Reference

#### Retrieve a list of all students

```http
  GET /students
```

#### Retrieve information about a specific student by ID

```http
  GET /students/:studentId
```
#### Add a new student to the database

```http
  POST /students
```
#### Update information about a specific student by ID

```http
  PUT /students/:studentId
```

#### Delete a specific student by ID

```http
  DELETE /students/:studentId
```


## Tech Stack

Node.js, Express.js, MongoDB

