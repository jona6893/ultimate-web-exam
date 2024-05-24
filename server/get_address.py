import requests

# Get Crime Address from mapbox
def get_address(lon, lat, token):
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{lon},{lat}.json?types=address&access_token={token}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # check for features in the response
        if data.get('features'):
            # look for the place_name key in the first object in the features array, then return address
            return data['features'][0]['place_name']
        else:
            return "Address not found"
    else:
        return "Failed to retrieve address"
