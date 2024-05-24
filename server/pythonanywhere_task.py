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
        script_dir = os.path.dirname(os.path.abspath(__file__))
        persons_path = os.path.join(script_dir, "persons.json")

        with open(persons_path) as user_file:
            # file_contents = user_file.read()
            file_contents = json.load(user_file)
        list_of_people = file_contents[person_type]
        chosen = random.choice(list_of_people)

        # check if the chosen person is already in the list
        if chosen not in person_list:
            person_list.append(chosen)
        else:
            generate_person(person_list, person_type)
        # print(suspects)

    ######################## Create ID
    crime_id = faker.uuid4()

    ######################## Create Severity
    severity = random.randint(1, 10)

    ######################## Create lon & lat for Copenhagen
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
    number_of_suspects = random.randint(1, 2)

    for _ in range(number_of_suspects):
        generate_person(suspects, "suspects")
    ######################## Create Victims
    # name, age, cpr
    victims = []
    number_of_victims = random.randint(1, 2)

    for _ in range(number_of_victims):
        generate_person(victims, "victims")
    ######################## Create Witnesses
    # name, age, cpr
    witnesses = []
    number_of_witnesses = random.randint(1, 2)

    for _ in range(number_of_witnesses): # for _ in range(5) means that the loop will run 5 times
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
        "witnesses": witnesses,
    }

    # print("################################################")
    return json.dumps(crime) # json.dumps() converts a Python object into a JSON string


# get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__)) # os.path.abspath(__file__) returns the full path of the current script

# full file path
file_path = os.path.join(script_dir, "crime.json")

# write the generated crime to the file
with open(file_path, "w") as file:
    file.write(generate_crime())
