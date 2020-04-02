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