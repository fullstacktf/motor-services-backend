
![image](https://drive.google.com/uc?export=view&id=1i8OzH4Ip6_4Csz6jgZcKed6TzSmV7l9E)


# Pick Auto 🚗

Pick Auto is an application to help people with little time to manage the maintenance of their vehicles and keep the revisions up to date


## 📁Project Structure
```
pickauto
│   README.md
│   start.sh
│   docker-compose.yml    
│
└───motor-services-backend
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───motor-services-frontend
    │   file021.txt
    │   file022.txt
```
## 🖥️ Tech Stack

* Node
* Express
* MariaDB
* Nginx



## API Reference (Endpoints)

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Database Schema

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## 👥 Authors

- [@ricmiber96](https://github.com/ricmiber96)
- [@JuanFran928](https://github.com/JuanFran928)
- [@Marta-ramiro](https://github.com/Marta-ramiro)

