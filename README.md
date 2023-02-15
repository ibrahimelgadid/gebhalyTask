## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Postman URLs

# ---> authentication urls

```bash

# Register
http://localhost:5000/api/auth/register
    fileds:-
      username,email,password,password2


# Login
http://localhost:5000/api/auth/login
    fileds:-
      email,password


```

# ---> address book urls

```bash

# Create address
# must be authenticated
POST http://localhost:5000/api/address/create
    fileds:-
      name,phone


# Get all addresses
# must be authenticated
GET http://localhost:5000/api/address

# Get all addresses for specific user
# must be authenticated
GET http://localhost:5000/api/address/${userId}/user


# Get address by id
# must be authenticated
GET http://localhost:5000/api/address/${addressId}


# Update address by id
# must be authenticated
PATCH http://localhost:5000/api/address/${addressId}
    fileds:-
      name , phone or both


# Delete address by id
# must be authenticated
DELETE http://localhost:5000/api/address/${addressId}

```
