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
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, mitarbeiter):
        return self.createNewEntry(mitarbeiter)        

    def PUT(self, mitarbeiter):
        return self.editEntry(mitarbeiter)

    def DELETE(self, mitarbeiter_ID):
        return self.database_obj.delete(mitarbeiter_ID)

    def createNewEntry(self, mitarbeiter_p):
        mitarbeiter_arr = self.parseEmployee(mitarbeiter_p, 3)
        newEntry =  {'name': mitarbeiter_arr[1], 'vorname': mitarbeiter_arr[0], 'funktion': mitarbeiter_arr[2]}
        return self.database_obj.add(newEntry)

    def editEntry(self, mitarbeiter_p):
        mitarbeiter_arr = self.parseEmployee(mitarbeiter_p, 4)
        newEntry =  {'name': mitarbeiter_arr[2], 'vorname': mitarbeiter_arr[1], 'funktion': mitarbeiter_arr[3]}
        return self.database_obj.edit(newEntry, mitarbeiter_arr[0])

    def parseEmployee(self, mitarbeiter_s, numberOfArraySlots):
        s_len = len(mitarbeiter_s) # Number of characters in the string
        l = 0 # Index for the employee array
        entry = "" # The entry that we are pushing into the array

        if numberOfArraySlots == 3:
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

        elif numberOfArraySlots == 4:
            mitarbeiter_arr = ["a", "b", "c", "d"] # Array with placeholders
            for i in range(0, s_len):
                if mitarbeiter_s[i] != ".": # Check for separation character
                    entry += mitarbeiter_s[i] # Push character into entry string               
                else:
                    mitarbeiter_arr[l] = entry # Push string into array
                    entry = "" # Reset entry variable
                    l += 1 # Increment "word"-counter

            mitarbeiter_arr[l] = entry # Final push to include last element
            return mitarbeiter_arr

        else:
            print("Ungültige Anzahl an Array Slots angegeben!")        