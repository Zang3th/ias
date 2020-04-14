import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Project_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "project.json")

    def GET(self, parameter_1):
        if parameter_1 == "all":
            return self.database_obj.data_str
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, projekt):
        return self.createNewEntry(projekt)        

    def PUT(self, projekt):
        return self.editEntry(projekt)

    def DELETE(self, projekt_ID):
        return self.database_obj.delete(projekt_ID)

    def createNewEntry(self, projekt_p):
        projekt_arr = utility.parseData(self, projekt_p, 2)
        newEntry =  {'beschreibung': projekt_arr[0]}
        return self.database_obj.add(newEntry)

    def editEntry(self, projekt_p):
        projekt_arr = utility.parseData(self, projekt_p, 3)
        newEntry =  {'beschreibung': projekt_arr[1]}
        return self.database_obj.edit(newEntry, projekt_arr[0])    