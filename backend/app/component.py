import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Component_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "component.json")

    def GET(self, parameter_1):
        if parameter_1 == "all":
            return self.database_obj.data_str
        else:
            return self.database_obj.getByID(parameter_1)

    def POST(self, komponente):
        return self.createNewEntry(komponente)        

    def PUT(self, komponente):
        return self.editEntry(komponente)

    def DELETE(self, komponente_ID):
        return self.database_obj.delete(komponente_ID)

    def createNewEntry(self, komponente_p):
        komponente_arr = utility.parseData(self, komponente_p, 2)
        newEntry =  {'beschreibung': komponente_arr[0], 'projektID': komponente_arr[1]}
        return self.database_obj.add(newEntry)

    def editEntry(self, komponente_p):
        komponente_arr = utility.parseData(self, komponente_p, 3)
        newEntry =  {'beschreibung': komponente_arr[1], 'projektID': komponente_arr[2]}
        return self.database_obj.edit(newEntry, komponente_arr[0])