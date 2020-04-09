import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Developer_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "developer.json")

    def GET(self, parameter_1):     
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
        entwickler_arr = utility.parseData(self, entwickler_p, 3)
        newEntry =  {'name': entwickler_arr[1], 'vorname': entwickler_arr[0], 'funktion': entwickler_arr[2]}
        return self.database_obj.add(newEntry)

    def editEntry(self, entwickler_p):
        entwickler_arr = utility.parseData(self, entwickler_p, 4)
        newEntry =  {'name': entwickler_arr[2], 'vorname': entwickler_arr[1], 'funktion': entwickler_arr[3]}
        return self.database_obj.edit(newEntry, entwickler_arr[0])    