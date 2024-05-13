from faker import Faker
from datetime import datetime
import json
import random
import os

faker = Faker("da_DK")

def generate_crime():
  ######################## General create person 
  # name, age, cpr, gender
  def generate_person(person_list, person_type): 
    
    with open("persons.json") as user_file:
      #file_contents = user_file.read()
      file_contents = json.load(user_file)
    list_of_people = file_contents[person_type]
    chosen = random.choice(list_of_people)

    # check if the chosen person is already in the list
    if chosen not in person_list:
      person_list.append(chosen)
    else:
      generate_person(person_list, person_type)
    #print(suspects)
    
    """
    # person_key
    person["_key"] = faker.uuid4()
    
    # person gender
    person["gender"] = faker.random_element(elements = ("male", "female"))
    
    # person name based on gender
    def generate_name(gender):
      match gender:
        case "male":
          return faker.first_name_male()
        case "female":
          return faker.first_name_female()
    # generate name based on gender by calling funtion generate_name()
    person["name"] = generate_name(person["gender"]) + " " + faker.last_name()

    ## CPR - Find person fødelsedato og om de er mand (ulige slut tal) eller kvinde (lige slut tal)
    # person date of brith 
    date_of_birth = faker.date_of_birth(minimum_age=16, maximum_age=100)

    
    # Generere et tilfældigt nummer på 10 tegn. I string format
    # OPTIONAL få cpr første 6 tal til at være fødelsedato
    fake_cpr = str(faker.random_int(min=1000000000, max=9999999999))
    # Spilt string 
    def add_dash_to_cpr(string):
      return "-".join([string[:6],string[6:]])
    person["cpr"] = add_dash_to_cpr(fake_cpr)
    
    # person age
    today = datetime.today()
    age = today.year - date_of_birth.year - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
    person["age"] = age
    

    return person_type.append(person)
    """

  ######################## Create ID
  crime_id = faker.uuid4()

  ######################## Create Severity
  severity = random.randint(1,10)

  ######################## Create lon & lat
  copenhagen_lat_min = 55.57
  copenhagen_lat_max = 55.72
  copenhagen_lon_min = 12.48
  copenhagen_lon_max = 12.65

  random_lat = random.uniform(copenhagen_lat_min, copenhagen_lat_max)
  random_lon = random.uniform(copenhagen_lon_min, copenhagen_lon_max)

  ######################## Get time
  fake_datetime = faker.date_time_this_decade()
  epoch_time = int(fake_datetime.timestamp())

  ######################## Create Type of Crime
  type_of_crime = [
    "Organized crime",
    "Homicide",
    "Assault",
    "Robbery",
    "Cybercrime",
    "Arson",
    "Gang violence",
    "Drug crime",
    "Kidnapping", 
    "Theft",
  ]
  fake_crime_type = random.choice(type_of_crime)

  ######################## OPTIONAL Create description


  ######################## Create Suspects
  # name, age, cpr
  suspects = []
  number_of_suspects = random.randint(1,2)

  for _ in range (number_of_suspects):
    generate_person(suspects, "suspects")
  ######################## Create Victims
  # name, age, cpr
  victims = []
  number_of_victims = random.randint(1,2)

  for _ in range (number_of_victims):
    generate_person(victims, "victims")
  ######################## Create Witnesses
  # name, age, cpr
  witnesses = []
  number_of_witnesses = random.randint(1,2)

  for _ in range (number_of_witnesses):
    generate_person(witnesses, "witnesses")

  ######################## Crime
  crime = {
    "_key": crime_id,
    "severity": severity,
    "crime_type": fake_crime_type,
    "time": epoch_time,
    "lon": random_lon,
    "lat": random_lat,
    "suspects": suspects,
    "victims": victims,
    "witnesses": witnesses
  }

  # print("################################################")
  return (json.dumps(crime))

# get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# full file path
file_path = os.path.join(script_dir, "crime.json")

# write the generated crime to the file
with open(file_path, "w") as file:
  file.write(generate_crime())