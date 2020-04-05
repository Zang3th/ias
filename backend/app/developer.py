import cherrypy
from . import database

@cherrypy.expose
class Developer_cl():
    def __init__(self, currDir):
        print("Dev erstellt")
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "developer.json")

    def GET(self, parameter_1):        
        print("GET dev")
        if parameter_1 == "all":
            return self.database_obj.data_str
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, entwickler):
        return self.createNewEntry(entwickler)        

    def PUT(self, entwickler):
        return self.editEntry(entwickler)

    def DELETE(self, entwickler_ID):
        return self.database_obj.delete(entwickler_ID)

    def createNewEntry(self, entwickler_p):
        entwickler_arr = self.parseDeveloper(entwickler_p, 3)
        newEntry =  {'name': entwickler_arr[1], 'vorname': entwickler_arr[0], 'funktion': entwickler_arr[2]}
        return self.database_obj.add(newEntry)

    def editEntry(self, entwickler_p):
        entwickler_arr = self.parseDeveloper(entwickler_p, 4)
        newEntry =  {'name': entwickler_arr[2], 'vorname': entwickler_arr[1], 'funktion': entwickler_arr[3]}
        return self.database_obj.edit(newEntry, entwickler_arr[0])

    def parseDeveloper(self, entwickler_s, numberOfArraySlots):
        s_len = len(entwickler_s) # Number of characters in the string
        l = 0 # Index for the developer array
        entry = "" # The entry that we are pushing into the array

        if numberOfArraySlots == 3:
            entwickler_arr = ["a", "b", "c"] # Array with placeholders
            for i in range(0, s_len):
                if entwickler_s[i] != ".": # Check for separation character
                    entry += entwickler_s[i] # Push character into entry string                
                else:
                    entwickler_arr[l] = entry # Push string into array
                    entry = "" # Reset entry variable
                    l += 1 # Increment "word"-counter

            entwickler_arr[l] = entry # Final push to include last element
            return entwickler_arr

        elif numberOfArraySlots == 4:
            entwickler_arr = ["a", "b", "c", "d"] # Array with placeholders
            for i in range(0, s_len):
                if entwickler_s[i] != ".": # Check for separation character
                    entry += entwickler_s[i] # Push character into entry string               
                else:
                    entwickler_arr[l] = entry # Push string into array
                    entry = "" # Reset entry variable
                    l += 1 # Increment "word"-counter

            entwickler_arr[l] = entry # Final push to include last element
            return entwickler_arr

        else:
            print("Ungültige Anzahl an Array Slots angegeben!")        