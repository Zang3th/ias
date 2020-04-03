import cherrypy
from . import database

@cherrypy.expose
class Employee_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "employee.json")

    def GET(self, parameter_1):
        if parameter_1 == "all":
            return self.database_obj.data_str

    def POST(self, mitarbeiter):
        self.createNewEntry(mitarbeiter)
        return self.database_obj.data_str

    def createNewEntry(self, mitarbeiter_p):
        mitarbeiter_arr = self.parseEmployee(mitarbeiter_p)
        newEntry =  {'name': mitarbeiter_arr[1], 'vorname': mitarbeiter_arr[0], 'funktion': mitarbeiter_arr[2]}
        self.database_obj.add(newEntry)

    def parseEmployee(self, mitarbeiter_s):
        s_len = len(mitarbeiter_s) # Number of characters in the string
        l = 0 # Index for the employee array
        entry = "" # The entry that we are pushing into the array
        mitarbeiter_arr = ["a", "b", "c"] # Array with placeholders
        for i in range(0, s_len):
            if mitarbeiter_s[i] != ".": # Check for separation character
                entry += mitarbeiter_s[i] # Push character into entry string                
            else:
                mitarbeiter_arr[l] = entry # Push string into array
                entry = "" # Reset entry variable
                l += 1 # Increment "word"-counter

        mitarbeiter_arr[l] = entry # Final push to include last element
        return mitarbeiter_arr               