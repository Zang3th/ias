from . import employee

class Application_cl():
    def __init__(self, currDir):        
        self.currDir = currDir # Current filepath

        # Erstellen der Dispatcherklassen
        self.employee_obj = employee.Employee_cl(self.currDir) 