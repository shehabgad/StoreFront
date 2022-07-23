# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## API Endpoints


- create user

  - HTTP verb `POST`
  - Endpoint:- `/users`
  - Request Body

    ```json
    {
      "username": "shehabgad",
      "firstname": "shehab",
      "lastname": "gad",
      "password": "password123"
    }
    ```

  - Response Body -- `a json web token`

            ```json
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJzaGVoYWIiLCJsYXN0bmFtZSI6ImdhZCIsInVzZXJuYW1lIjoic2hlaGFiZ2FkIiwicGFzc3dvcmQiOiIkMmIkMTAkdGJIbG5CZWI4bGE1R2s3OFNJQTluZS5ORnJHMlp5eE5SclJzQ05JaHBJWWRlRG9uL2xkVi4ifSwiaWF0IjoxNjU4NTQyNDk4fQ.kMpRu6aYuCnnrI2_1n_iWbJWSwabBeuGpgCT3mC0LQo"
            ```


- get users **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/users`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `an array of all users`

        ```json
        [
          {
            "id": 1,
            "firstname": "shehab",
            "lastname": "gad",
            "username": "shehabgad",
            "password": "$2b$10$tbHlnBeb8la5Gk78SIA9ne.NFrG2ZyxNRrRsCNIhpIYdeDon/ldV."
          }
        ]
        ```

- get a user with a certain username **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/users/:username`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `the user information with the provided username`

        ```json
          {
            "id": 1,
            "firstname": "shehab",
            "lastname": "gad",
            "username": "shehabgad",
            "password": "$2b$10$tbHlnBeb8la5Gk78SIA9ne.NFrG2ZyxNRrRsCNIhpIYdeDon/ldV."
          }
        ```

- login and get an authentication token with the provided username and password

  - HTTP verb `POST`
  - Endpoint:- `/users/login`
  - Request Body

    ```json
    {
      "username": "shehabgad",
      "password": "password123"
    }
    ```

  - Response Body -- `the json token`

        ```json
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJzaGVoYWIiLCJsYXN0bmFtZSI6ImdhZCIsInVzZXJuYW1lIjoic2hlaGFiZ2FkIiwicGFzc3dvcmQiOiIkMmIkMTAkdGJIbG5CZWI4bGE1R2s3OFNJQTluZS5ORnJHMlp5eE5SclJzQ05JaHBJWWRlRG9uL2xkVi4ifSwiaWF0IjoxNjU4NTQzMDQzfQ.4H_V-5Ue5DqFaE6gXoEN5PozF1jyUiCm2aLxbS51rV8"
        ```

- update user information **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/users`
  - Request Body

    ```json
    {
      "username": "shehabgad",
      "firstname": "Shehab",
      "lastname": "Gad",
      "password": "password12356"
    }
    ```

  - Response Body -- `the new user information updated`

        ```json
          {
            "id": 1,
            "firstname": "Shehab",
            "lastname": "Gad",
            "username": "shehabgad",
            "password": "$2b$10$kF/imuwi4Q1okZQYpSXEWOkf6Q4YjITW46dUtIjlXvEW2DlrN2vQu"
          }
        ```


- get Products

  - HTTP verb `GET`
  - Endpoint:- `/products`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `array of all products`

        ```json
          [
            {
                "id": 1,
                "name": "product1",
                "price": 55
            }
          ]
        ```

- create Product **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/products`
  - Request Body

    ```json
    {
      "name": "product2",
      "price": "60"
    }
    ```

  - Response Body -- `the product information that was just put into the database`

        ```json
        {
          "id": 2,
          "name": "product2",
          "price": 60
        }
        ```

- get Product

  - HTTP verb `GET`
  - Endpoint:- `/products/:id`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `the product with the provided id`

        ```json
        {
          "id": 2,
          "name": "product2",
          "price": 60
        }
        ```

- update a Product **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/products`
  - Request Body

    ```json
    {
      "product": {
        "id": "2",
        "name": "Product two",
        "price": "12"
      }
    }
    ```

  - Response Body -- `the product after update`

        ```json
        {
          "id": 2,
          "name": "Product two",
          "price": 12
        }
        ```

- delete a Product **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/products`
  - Request Body

    ```json
    {
      "id": "2"
    }
    ```

  - Response Body -- `the product that was deleted`

        ```json

        {
          "id": 2,
          "name": "Product two",
          "price": 12
        }
        ```

- create order **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    {
      "user_id": "1",
      "status": "active",
      "products": [
        {
          "id": "1",
          "quantity": "5"
        }
      ]
    }
    ```

  - Response Body -- `the order that was just added`

        ```json

        {
        "id": 1,
        "status": "active",
        "user_id": 1,
        "orderProducts": [
        {
        "order_id": 1,
        "product_id": 1,
        "quantity": 5
        }
        ]
        }

    ```

    

- get orders **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `array of all orders`

        ```json
            {
        "id": 1,
        "status": "active",
        "user_id": 1,
        "orderProducts": [
            {
                "order_id": 1,
                "product_id": 1,
                "quantity": 5
            }
        ]

        }

    ```


- get order with an id **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orders/:id`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `the order with the provided id`

        ```json
            {
          "id": 1,
          "status": "active",
          "user_id": 1,
          "orderProducts": [
              {
                  "order_id": 1,
                  "product_id": 1,
                  "quantity": 5
              }
          ]

            }

    ```

    

- get all orders with a certain user with a provided id has made **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orders/users/:user_id`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `array of orders made by the provided user (given the id)`

        ```json
            [
                {
                    "id": 1,
                    "status": "active",
                    "user_id": 1,
                    "orderProducts": [
                        {
                            "order_id": 1,
                            "product_id": 1,
                            "quantity": 5
                        }
                    ]
                }
            ]

    ```

    

- update order status **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    {
      "id": "1",
      "status": "complete"
    }
    ```

  - Response Body -- `the order after update`

        ```json
                {
            "id": 1,
            "status": "complete",
            "user_id": 1
        }

    ```


- delete order **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    {
      "id": "1"
    }
    ```

  - Response Body -- `the order that was just deleted`

        ```json
                  {
            "id": 1,
            "status": "complete",
            "user_id": 1
        }
       ```
- get orderProducts **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orderProducts`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `array of all order products`

        ```json
           [
          {
        "order_id": 2,
        "product_id": 1,
        "quantity": 4
         }
        ]
       ```
- get all orderProducts with a certain order id**`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orderProducts/:id`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `array of all order products`

        ```json
           [
          {
        "order_id": 2,
        "product_id": 1,
        "quantity": 4
         }
        ]
       ```
- create orderProducts with order id, product id and quantity **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/orderProducts`
  - Request Body

    ```json
    {
      "order_id": "2",
      "product_id": "3",
      "quantity": "4"
    }
    ```

  - Response Body -- `the order product that was just made`

        ```json
              {
          "order_id": 2,
          "product_id": 3,
          "quantity": 4
            }
        
       ```
- update orderProducts with order id, product id and quantity **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/orderProducts`
  - Request Body

    ```json
    {
      "order_id": "2",
      "product_id": "3",
      "quantity": "18"
    }
    ```

  - Response Body -- `the order product after update`

        ```json
                  {
            "order_id": 2,
            "product_id": 3,
            "quantity": 18
           }
       ```
- delete orderProducts with order id, product id **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/orderProducts`
  - Request Body

    ```json
    {
      "order_id": "2",
      "product_id": "3",
    }
    ```

  - Response Body -- `the order product that was just deleted`

      ```json
                {
          "order_id": 2,
          "product_id": 3,
          "quantity": 18
      }
       ```
       ```






## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## data schema

### users schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  userName VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### products schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price float NOT NULL
);
```

### orders schema

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### orderProducts schema

```sql
CREATE TABLE orderProducts (
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (order_id,product_id)
);
```
