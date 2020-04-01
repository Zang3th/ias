import os, os.path
import string
import cherrypy

class Generator_cl():
   def __init__(self, currDir):
       print("WEB-App created!")
       
if __name__ == '__main__':

    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './frontend',
            'tools.staticdir.index': 'index.html'
        }
    }

    currDir = os.path.abspath(os.getcwd()) # Aktuellen Dateipfad ziehen
    webapp = Generator_cl(currDir) # Erstellen der Webapp
    cherrypy.quickstart(webapp, '/', conf) # Server starten    