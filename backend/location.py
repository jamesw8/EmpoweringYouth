import googlemaps
import os
import time
import pandas as pd
import geopy
from geopy.geocoders import GoogleV3, Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

gmaps = googlemaps.Client(key=os.environ["GOOGLE_API_KEY"])
data_csv = "datdatatho.csv"

def augment_data_with_location():
    df = pd.read_csv(data_csv, sep=",")
    longitude = []
    latitude = []
    for index, row in df.iterrows():
        if isinstance(row[1],str):
            print("row: ", row[1], type(row[1]))
            #response = geolocator.geocode(row[1])
            response = gmaps.geocode(row[1])
            print("response: ", response, type(response), "\n")
            long = response[0]['geometry']['location']['lng']
            lat = response[0]['geometry']['location']['lat']
        else:
            long, lat = "N/A","N/A"
        longitude.append(long)
        latitude.append(lat)
        time.sleep(2)

    df["longitude"] = longitude
    df["latitude"] = latitude
    df.to_csv("data_with_location.csv", sep=",")

def compare_coordinates_for_distance(start_coords, coords_list):
    return geolocator.distance_matrix(start_coords, coords_list)

if __name__ == "__main__":
    print(compare_coordinates_for_distance({'latitude':-73.95410910000001,'longitude':40.7656944},{'latitude':-73.95410910000001,'longitude':40.7656944}))
