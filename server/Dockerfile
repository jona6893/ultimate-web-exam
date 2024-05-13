# use the Python 3.11.5 image as the base image
FROM python:3.11.5

# set the working directory inside the container to /app
WORKDIR /app/server

# copy the requirements.txt file from the host machine to the /app directory inside the container
COPY requirements.txt ./

# install Python dependencies listed in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# overwrite the bottle.py file in the container with the modified version to allow lists to be returned as JSON
COPY bottle.py /usr/local/lib/python3.11/site-packages

# copy the rest of the application files from the host machine to the /app directory inside the container
COPY . .

# set the command to run when the container starts
CMD python -m bottle --server paste --bind 0.0.0.0:4000 --debug --reload app