import os, os.path
import json
import string

class Database_cl():
    def __init__(self, currDir, filename):
        self.currDir = currDir # Directory filepath
        self.filename = filename 
        self.filepath = os.path.join(self.currDir, r"backend\data", self.filename) # Filepath (where the .json is)
        self.readInFile() # Read in of the data

    def readInFile(self):        
        try:
            with open(self.filepath, 'r', encoding='utf-8') as file:  
                file = open(self.filepath)
                self.data_json = json.load(file) # Data as json            
                self.data_str = json.dumps(self.data_json) # Data as string
                file.close()
                print(self.filename, "read in successfully")

        except:
            print("Can't open File:", self.filename, "at", self.filepath)  

    def writeToFile(self):
        try:            
            with open(self.filepath, 'w', encoding='utf-8') as file:                 
                json.dump(self.data_json, file, indent=3)        
                print(self.filename, "dumped successfully")
                file.close()

        except:
            print("Can't open File:", self.filename, "at", self.filepath, "for dumping!")  

    def add(self, newEntry_p):
        self.readInFile() # Check for updates or changes 
        currentKey = len(self.data_json.keys()) # Number of keys in use
        self.data_json[currentKey + 1] = newEntry_p # Save new entry in json object
        self.data_str = json.dumps(self.data_json) # Data as string
        self.writeToFile() # Update json file

    def getByID(self, ID):
        self.readInFile() # Check for updates or changes
        if ID in self.data_json:
            data_json = self.data_json[ID]
            data_str = json.dumps(data_json)
            return data_str
        else:
            print("Entry", ID, "in", self.filename, "was not found!")
            return json.dumps("ERROR")      

    def delete(self, ID):
        self.readInFile() # Check for updates or changes
        if ID in self.data_json:
            del self.data_json[ID] # Delete employee     
            self.data_str = json.dumps(self.data_json) # Data as string
            self.writeToFile() # Update json file
            return self.data_str
        else:
            print("Entry", ID, "in", self.filename, "was not found!")
            return json.dumps("ERROR")        