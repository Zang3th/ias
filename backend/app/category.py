import cherrypy
from . import database
from . import utility

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
        kategorie_arr = utility.parseData(self, kategorie_p, 2)
        newEntry =  {'beschreibung': kategorie_arr[0], 'schweregrad': kategorie_arr[1]}
        return self.database_obj.add(newEntry)

    def editEntry(self, kategorie_p):
        kategorie_arr = utility.parseData(self, kategorie_p, 3)
        newEntry =  {'beschreibung': kategorie_arr[1], 'schweregrad': kategorie_arr[2]}
        return self.database_obj.edit(newEntry, kategorie_arr[0])     