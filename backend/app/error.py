import cherrypy
from . import database
from . import utility

@cherrypy.expose
class Error_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.database_obj = database.Database_cl(self.currDir, "error.json")

    def GET(self):
        return self.database_obj.data_str

    def POST(self, error):
        return self.createNewEntry(error)

    def PUT(self, changedError):
        return self.changeExistingEntry(changedError)

    def createNewEntry(self, error_p):
        error_arr = utility.parseData(self, error_p, 8, ":")
        newEntry =  {'datum': error_arr[0], 'mitarbeiter': error_arr[1], 'komponente': error_arr[2], 'kategorie': error_arr[3], 'status': error_arr[4], 'entwickler': error_arr[5], 'ursache': error_arr[6], 'datum_2': error_arr[7]}
        return self.database_obj.add(newEntry)        

    def changeExistingEntry(self, error_p):
        error_arr = utility.parseData(self, error_p, 5, ":")        
        oldEntry = self.database_obj.data_json[error_arr[0]]
        newEntry =  {'datum': oldEntry["datum"], 'mitarbeiter': oldEntry["mitarbeiter"], 'komponente': oldEntry["komponente"], 'kategorie': oldEntry["kategorie"], 'status': error_arr[1], 'entwickler': error_arr[2], 'ursache': error_arr[3], 'datum_2': error_arr[4]} 
        return self.database_obj.edit(newEntry, error_arr[0])