# Vite + React + TypeScript + Python Bottle + ArangoDB + Docker

This project is built with Vite React & TypeScript in the front-end, Python Bottle in the back-end, and ArangoDB as a document/graph database.

Bottle is slightly modified to allow lists (arrays) to be passed as valid JSON.
```python
if isinstance(rv, dict) or isinstance(rv, list):
```

## Getting started

1. First, make sure you have Docker Desktop running.

2. Open your terminal and clone the repository.
    ```sh
    git clone https://github.com/vlysium/ultimate-web-exam
    ```

3. In the root of the repository, run the `start.sh` shell script from your terminal.
    ```sh
    ./start.sh
    ```
    or
    ```sh
    sh ./start.sh
    ```
    The script will install the npm dependencies for development, build the Docker images and run `docker-compose up` for you.

And that's it - now you are all set to begin developing!

## Connecting Python Bottle to ArangoDB

I created a class `ArangoDB` with two methods `execute()` and `transaction()` to handle database connections.
`execute()` takes in an AQL query as argument, along with optional `bindVars` if needed.
Similarly, `transaction()` does the same, only difference is that `transaction()` will do a transaction instead as the name suggests, so that all queries will either success or fail as one.

```python
class ArangoDB:
  def __init__(self):
    self.base_url = "http://host.docker.internal:8529"

  def execute(self, query, bindVars={}):
    return self.__send_request("/_api/cursor", query, bindVars)

  def transaction(self, query, bindVars={}):
    return self.__send_request("/_api/transaction", query, bindVars)

  def __send_request(self, endpoint, query, bindVars):
    url = self.base_url + endpoint
    payload = {
      "query": query,
      "bindVars": bindVars
    }
    response = requests.post(url, json=payload)
    result = response.json()
    return result["result"][0]

db = ArangoDB()
```

Instead of copying and repeating the same multiple lines every single time you query the database, you can instead shorten it down to `db.execute()` with your query.

### Example usage
Here is an example usage:

```python
all_users = db.execute("FOR user IN users RETURN user")
```

Here, `execute` takes `"FOR user IN users RETURN user"` as an argument, and assigns the results to the `all_users` variable.

## Quick links

Quick links for live server URLs:
- [Vite](http://127.0.0.1:8080) - running on port `8080`
- [Python Bottle](http://127.0.0.1:4000) - running on port `4000`
- [ArangoDB](http://127.0.0.1:8529) - running on port `8529`