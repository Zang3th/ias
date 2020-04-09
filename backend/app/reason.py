import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Reason_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "reason.json")

    def GET(self, parameter_1):
        if parameter_1 == "all":
            return self.database_obj.data_str
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, ursache):
        return self.createNewEntry(ursache)        

    def PUT(self, ursache):
        return self.editEntry(ursache)

    def DELETE(self, ursache_ID):
        return self.database_obj.delete(ursache_ID)

    def createNewEntry(self, ursache_p):
        ursache_arr = utility.parseData(self, ursache_p, 2)
        newEntry =  {'beschreibung': ursache_arr[0]}
        return self.database_obj.add(newEntry)

    def editEntry(self, ursache_p):
        ursache_arr = utility.parseData(self, ursache_p, 3)
        newEntry =  {'beschreibung': ursache_arr[1]}
        return self.database_obj.edit(newEntry, ursache_arr[0])    