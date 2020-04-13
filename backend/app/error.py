import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Error_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "error.json")

    def POST(self, error):
        self.createNewEntry(error)

    def createNewEntry(self, error_p):
        error_arr = utility.parseData(self, error_p, 7)
        newEntry =  {'datum': error_arr[0], 'mitarbeiter': error_arr[1], 'komponente': error_arr[2], 'kategorie': error_arr[3], 'status': error_arr[4], 'entwickler': error_arr[5], 'ursache': error_arr[6]}
        print(newEntry)
        #return self.database_obj.add(newEntry)        