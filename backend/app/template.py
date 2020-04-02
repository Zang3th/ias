import cherrypy
import os, os.path
import string

@cherrypy.expose
class Template_cl():
    def __init__(self, currDir):
        self.currDir = currDir
        self.path_template = os.path.join(self.currDir, r"backend\templates", "list_tpl.html")
        self.readInTemplate()

    def readInTemplate(self):
        try:
            with open(self.path_template, 'r') as file_t:          
                file_t = open(self.path_template)
                self.template_str = file_t.read()
                file_t.close()
                print("list_tpl.html read in successfully")

        except:
            print("Can't open File: list_tpl.html")

    def GET(self):
        return self.template_str