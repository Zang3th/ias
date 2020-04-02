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
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')]
        },       
        '/employee': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')]
        }
    }

    currDir = os.path.abspath(os.getcwd()) # Aktuellen Dateipfad ziehen
    webapp = Generator_cl(currDir) # Erstellen der Webapp

    # Zuweisen der Dispatcherklassen
    webapp.template = webapp.app.template_obj
    webapp.employee = webapp.app.employee_obj
    

    cherrypy.quickstart(webapp, '/', conf) # Server starten    