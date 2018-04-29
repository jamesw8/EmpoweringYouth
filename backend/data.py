import pandas as pd
data_csv = "data_with_location.csv"

def get_info(matching_catagory):
    if not isinstance(matching_catagory, str):
        matching_catagory = matching_catagory[-1]
    matching_catagory = matching_catagory.strip("%").split(",")
    retval = []
    df = pd.read_csv(data_csv)
    df = df[df['Type'].str.match(matching_catagory[0])]
    df = df[df['Subtype'].str.match(matching_catagory[1])]
    for index, row in df.iterrows():
        retval.append({ "Name":row["Name"],
                        "Address":row["Address"],
                        "Telephone":row["Telephone"]})
    return retval

if __name__ == "__main__":
    print(get_info("%%Medical,Free Clinic%%"))
