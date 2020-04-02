import cherrypy

@cherrypy.expose
class Employee_cl():
    def __init__(self, currDir):
        print("Employee erstellt!")