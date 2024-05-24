import random
from bottle import get, post, delete, response
import requests
from get_address import get_address
import json
##############################
"""
reusable functions to execute AQL queries
db.execute()
db.transaction()
"""

class ArangoDB:
  # constructor to set the base URL of the database
  def __init__(self):
    self.base_url = "http://host.docker.internal:8529"

  # execute a standard query
  def execute(self, query, bindVars={}):
    url = self.base_url + "/_api/cursor"
    
    payload = {
      "query": query,
      "bindVars": bindVars
    }
    response = requests.post(url, json=payload)
    result = response.json()
    
    # ternary operator to return data if it exists, otherwise return the error message
    return result["result"] if result.get("result") and result["result"] else result


  # execute a transaction
  def transaction(self, collections, action):
    url = self.base_url + "/_api/transaction"

    payload = {
      "collections": collections,
      "action": "function() { const db = require('@arangodb').db; " + action + " }"
    }
    response = requests.post(url, json=payload)
    result = response.json()
    
    # ternary operator to return data if it exists, otherwise return the error message
    return result["result"] if result.get("result") and result["result"] else result


# instantiate the ArangoDB class
db = ArangoDB()

##############################
"""
user endpoints (example)
"""

@get("/api/user")
def get_all_users():
  # return db.execute("FOR user IN users RETURN user")
  return [ { "id": 1 }, { "id": 2 }, { "id": 3 } ]

@get("/api/user/<id>")
def get_one_user(id):
  try:
    id = int(id)
    return { "id": id }
  except ValueError:
    return { "error": "Invalid ID" }

##############################

@get("/")
def index():
  query = """
  INSERT { name: "John Doe" } INTO users
  RETURN NEW
  """
  # return db.execute(query)
  return { "message": "Hello World" }

##############################
# here we need to visit the API URL to fetch the JSON data
# can we make it fetch the data from pythonAmyWhere automatically?
@get("/crimes-server")
def get_crime():

    # fetch crimes from pythonanywwhere
    def get_data():
        try:
            url = "https://jona6893.pythonanywhere.com/crimes-server"
            headers = {"token": "2963cdf9-85f2-4102-86e8-eb6548a803a8"}
            res = requests.get(url, headers=headers)

            res.raise_for_status()
            data = res.json()

            # Add key Address
            lon = data.get("lon")
            lat = data.get("lat")
            address = get_address(
                lon,
                lat,
                "pk.eyJ1IjoiaGVsYm9iIiwiYSI6ImNsdGVkdWQxbzBmaWgya212OW40bTV3cHUifQ.xYokffDfUCRs-p454SCz7g",
            )
            data["address"] = address
            return data
        except requests.exceptions.RequestException as e:
            return {"error": e}

    crime = get_data()
    # Create a new array called persons
    persons_list = []
    # Add suspects, victims, and witnesses to persons
    persons_list.extend(crime["suspects"])
    persons_list.extend(crime["victims"])
    persons_list.extend(crime["witnesses"])

    # get a random person from the persons list
    def get_random_person():
        random_person = random.choice(persons_list)
        return random_person["_key"]

    from_person = get_random_person()
    to_person = get_random_person()

    # reassign to_person if it is the same as from_person
    while from_person == to_person:
        to_person = get_random_person()

    # chose a random relationship
    relationship = random.choice(["family", "friends"])

    collections = {
    "read": ["persons"],
    "write": ["persons_related_to_persons", "persons", "crimes"]
  }

    action = f"""
  // Insert new Crime in the crimes collection
  const crime = db.crimes.save({crime}, {{ overwrite: true }});
  
  // Insert new persons into the persons collection
  const personsList = {persons_list};
  const insertedPersons = [];
  
  // Loop through the personsList and insert each person into the persons collection
  for (const person of personsList) {{
    const newPerson = db.persons.save(person, {{ overwrite: true }});
    // Push added person to the insertedPersons array
    insertedPersons.push(newPerson);
  }}

  // Validate if a reverse relationship already exists
  function validateEdge(newEdge) {{
    // Check if the reverse relation already exists
    const existingEdges = db.persons_related_to_persons.edges({{
      _from: newEdge._to,
      _to: newEdge._from
    }});

    // if the reverse relation already exists, throw an error - if existingEdges is greater than 0
    if (existingEdges.count() > 0) {{
      throw "Error: Reverse relation already exists.";
    }}
  }}

  // Create a relation between the two persons
  const fromPerson = db._document("persons/{from_person}");
  const toPerson = db._document("persons/{to_person}");
  const relation = db.persons_related_to_persons.save({{
    _from:fromPerson._id,
    _to:toPerson._id,
    relation: "{relationship}",
  }}, {{ overwrite: true, validate: validateEdge}});
 
  return {{crime, insertedPersons, relation}};
  """

    data = db.transaction(collections, action)

    return data
##############################


@get("/api/get-crimes")
def get_all_crimes():
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Content-Type"] = "application/json"

  query = """
  FOR crime IN crimes
  RETURN crime
  """

  crimes = db.execute(query)

  return crimes

# get people related to a person _key
@get("/api/relations/<key>")
def get_relations(key):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Content-Type"] = "application/json"

  query = """
  FOR v, e, p IN 0..0
  ANY @key
  GRAPH "relations"
  LET data = v
  LET family = (
    FOR related_v, related_e IN 1..1
      ANY v._id
      GRAPH "relations"
      FILTER related_e.relation == "family"
      RETURN DISTINCT MERGE(related_v, { relation: related_e.relation })
  )
  LET friends = (
    FOR related_v, related_e IN 1..1
      ANY v._id
      GRAPH "relations"
      FILTER related_e.relation == "friends"
      RETURN DISTINCT MERGE(related_v, { relation: related_e.relation })
  )
  RETURN MERGE(data, { family: family, friends: friends })
  """
  bindVars = { "key": "persons/" + key }
  crimes = db.execute(query, bindVars)

  return crimes

@get("/api/test")
def test():
  response.headers["Access-Control-Allow-Origin"] = "*"
  return "x"


## from persons/240585-9824 , to persons/010299-7332 relation: family


## http://localhost:4000/api/get-crimes/relations
### FOR edge IN persons_related_to_persons RETURN edge


# For every person create a edge document with a random person in persons collection
