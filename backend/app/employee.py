import cherrypy
from . import database
from . import utility

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
        mitarbeiter_arr = utility.parseData(self, mitarbeiter_p, 3)
        newEntry =  {'name': mitarbeiter_arr[1], 'vorname': mitarbeiter_arr[0], 'funktion': mitarbeiter_arr[2]}
        return self.database_obj.add(newEntry)

    def editEntry(self, mitarbeiter_p):
        mitarbeiter_arr = utility.parseData(self, mitarbeiter_p, 4)
        newEntry =  {'name': mitarbeiter_arr[2], 'vorname': mitarbeiter_arr[1], 'funktion': mitarbeiter_arr[3]}
        return self.database_obj.edit(newEntry, mitarbeiter_arr[0])      