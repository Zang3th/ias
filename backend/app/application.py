from . import template
from . import employee
from . import developer
from . import category
from . import reason
from . import component

class Application_cl():
    def __init__(self, currDir):        
        self.currDir = currDir # Current filepath

        # Erstellen der Dispatcherklassen
        self.template_obj = template.Template_cl(self.currDir)
        self.employee_obj = employee.Employee_cl(self.currDir)
        self.developer_obj = developer.Developer_cl(self.currDir)
        self.category_obj = category.Category_cl(self.currDir)
        self.reason_obj = reason.Reason_cl(self.currDir)
        self.component_obj = component.Component_cl(self.currDir)