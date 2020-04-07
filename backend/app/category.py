import cherrypy
from . import database

@cherrypy.expose
class Category_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "category.json")

    def GET(self, parameter_1):
        if parameter_1 == "all":
            return self.database_obj.data_str
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, kategorie):
        return self.createNewEntry(kategorie)        

    def PUT(self, kategorie):
        return self.editEntry(kategorie)

    def DELETE(self, kategorie_ID):
        return self.database_obj.delete(kategorie_ID)

    def createNewEntry(self, kategorie_p):
        kategorie_arr = self.parseCategory(kategorie_p, 2)
        newEntry =  {'beschreibung': kategorie_arr[0], 'schweregrad': kategorie_arr[1]}
        return self.database_obj.add(newEntry)

    def editEntry(self, kategorie_p):
        kategorie_arr = self.parseCategory(kategorie_p, 3)
        newEntry =  {'beschreibung': kategorie_arr[1], 'schweregrad': kategorie_arr[2]}
        return self.database_obj.edit(newEntry, kategorie_arr[0])

    def parseCategory(self, kategorie_s, numberOfArraySlots):
        s_len = len(kategorie_s) # Number of characters in the string
        l = 0 # Index for the category array
        entry = "" # The entry that we are pushing into the array

        if numberOfArraySlots == 2:
            kategorie_arr = ["a", "b"] # Array with placeholders
            for i in range(0, s_len):
                if kategorie_s[i] != ".": # Check for separation character
                    entry += kategorie_s[i] # Push character into entry string                
                else:
                    kategorie_arr[l] = entry # Push string into array
                    entry = "" # Reset entry variable
                    l += 1 # Increment "word"-counter

            kategorie_arr[l] = entry # Final push to include last element
            return kategorie_arr

        elif numberOfArraySlots == 3:
            kategorie_arr = ["a", "b", "c"] # Array with placeholders
            for i in range(0, s_len):
                if kategorie_s[i] != ".": # Check for separation character
                    entry += kategorie_s[i] # Push character into entry string               
                else:
                    kategorie_arr[l] = entry # Push string into array
                    entry = "" # Reset entry variable
                    l += 1 # Increment "word"-counter

            kategorie_arr[l] = entry # Final push to include last element
            return kategorie_arr

        else:
            print("Ungültige Anzahl an Array Slots angegeben!")        