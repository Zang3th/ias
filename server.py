import os, os.path
import string
import cherrypy

from backend.app import application

class Generator_cl():
   def __init__(self, currDir):
       self.app = application.Application_cl(currDir)
       
if __name__ == '__main__':

    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './frontend',
            'tools.staticdir.index': 'index.html'
        },         
        '/template': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },       
        '/employee': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },       
        '/developer': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },       
        '/category': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },       
        '/reason': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },       
        '/component': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        }
    }

    currDir = os.path.abspath(os.getcwd()) # Aktuellen Dateipfad ziehen
    webapp = Generator_cl(currDir) # Erstellen der Webapp

    # Zuweisen der Dispatcherklassen
    webapp.template = webapp.app.template_obj
    webapp.employee = webapp.app.employee_obj
    webapp.developer = webapp.app.developer_obj  
    webapp.category = webapp.app.category_obj
    webapp.reason = webapp.app.reason_obj
    webapp.component = webapp.app.component_obj

    cherrypy.quickstart(webapp, '/', conf) # Server starten    