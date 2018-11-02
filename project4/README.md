## Project overview

Your web service will provide a few new features to your users. The goal is to allow users to notarize star ownership using their blockchain identity.

## Project specification 

https://review.udacity.com/#!/rubrics/2098/view

---

## Framework used

Express.js

## Getting started

Open a command prompt or shell terminal after install node.js and execute:

```
npm install
```

## Testing

```
npm test
```

## Endpoint description

### 1. Blockchain ID validation request

**Method**

```
POST
```

**Endpoint**

```
http://localhost:8000/requestValidation
```

**Parameters**

```
address - A bitcoin address, you can take it from your project1
```

**Example**

````bash
$ curl -X "POST" "http://localhost:8000/requestValidation" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR"
}'
````

`Response`
````json
{
  "address":"14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
  "message":"14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR:1541158973868:starRegistry",
  "requestTimeStamp":1541158973868,
  "validationWindow":300
}
````

### 2. Blockchain ID message signature validation

**Method**

```
POST
```

**Endpoint**

```
http://localhost:8000/message-signature/validate
```

**Parameters**

```
address - The addres that you used in last step
signature - You can take it from the Electrum wallet (see below) or make it by code (see test/index.test.js)
```

**Example**

````bash
$ curl -X "POST" "http://localhost:8000/message-signature/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
  "signature": "H3LrXBbalzgxqpbbhChgNkN5cLIGORzQxQwb2WXgyZ/efxE7DiGL6CkcotVWsDqeH4iOQ5vz+ZOvQ+hbmZ6XgGk="
}'
````

`Response`

````json
{
  "registerStar":true,
  "status": {
    "address":"14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
    "message":"14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR:1541159974311:starRegistry",
    "requestTimeStamp":1541159974311,
    "validationWindow":211,
    "messageSignature":"valid"
  }
}
````

### 3. Star registration

**Method**

```
POST
```

**Endpoint**

```
http://localhost:8000/block
```

**Parameters**

```
address - The addres that you used in last step
star - Containing dec, ra and story (max 500 bytes)
```

**Example**
````bash
$ curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
  "star": {
    "dec": "-26° 29'\'' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
}'
````
`Response`
````json
{
  "hash": "56bc82e0380d465d2931f2d3ed2f02eab7db607993e064eaf2c495d65094f282",
  "height": 1,
  "body": {
    "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
    "star": { 
      "dec": "-26° 29' 24.9",
      "ra": "16h 29m 1.0s",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
    }
  },
  "time":"1541160381",
  "previousBlockHash":"9fd57f8eff4cd0520887b458330f4c2ef6e7f33864942d40fc1c76918e0f0b0f"
}
````                        

### 4. Get block by height

**Method**

```
GET
```

**Endpoint**

```
http://localhost:8000/block/:height
```

**Parameters**

```
height - The height of block
```

**Example**

```bash
$ curl "http://localhost:8000/block/1"
```

`Response`
```json
{
  "hash": "56bc82e0380d465d2931f2d3ed2f02eab7db607993e064eaf2c495d65094f282",
  "height": 1,
  "body": {
    "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
    "star": {
      "dec": "-26° 29' 24.9",
      "ra": "16h 29m 1.0s",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time": "1541160381",
  "previousBlockHash":"9fd57f8eff4cd0520887b458330f4c2ef6e7f33864942d40fc1c76918e0f0b0f"
}
```

### 6. Get block by address

**Method**

```
GET
```

**Endpoint**

```
http://localhost:8000/stars/address:address
```

**Parameters**

```
address - The address used so far
```

**Example**

````bash
$ curl "http://localhost:8000/stars/address:14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR"
````
```json
[
  {
    "hash": "56bc82e0380d465d2931f2d3ed2f02eab7db607993e064eaf2c495d65094f282",
    "height": 1,
    "body": {
      "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR", 
      "star": {
        "dec": "-26° 29' 24.9",
        "ra": "16h 29m 1.0s",
        "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
        "storyDecoded": "Found star using https://www.google.com/sky/",
      }
    },
    "time": "1541160381",
    "previousBlockHash": "9fd57f8eff4cd0520887b458330f4c2ef6e7f33864942d40fc1c76918e0f0b0f",
  }
]
```

### 5. Get block by hash

**Method**

```
GET
```

**Endpoint**

```
http://localhost:8000/stars/hash:hash
```

**Parameters**

```
hash - The hash of one block created before
```

**Example**

````bash
$ curl "http://localhost:8000/stars/hash:56bc82e0380d465d2931f2d3ed2f02eab7db607993e064eaf2c495d65094f282"
````
`Response`
````json
{
  "hash": "56bc82e0380d465d2931f2d3ed2f02eab7db607993e064eaf2c495d65094f282",
  "height": 1,
  "body": {
    "address": "14TwaGf3yy8F2E99f2kWmU34n2PmdrV7tR",
    "star": {
      "dec": "-26° 29' 24.9",
      "ra": "16h 29m 1.0s",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time":"1541160381",
  "previousBlockHash":"9fd57f8eff4cd0520887b458330f4c2ef6e7f33864942d40fc1c76918e0f0b0f",
}
````

## Udacity honor code

Giving credits for places that helped me to do this project

- Udacity Project4 Concepts section
- https://github.com/bitcoinjs/bitcoinjs-message
- https://bitcoin.stackexchange.com/questions/49946/understanding-signing-messages-with-bitcoinjs-lib
