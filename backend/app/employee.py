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