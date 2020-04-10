var currentEmployeeData; //Current iteration of the data
var editedEmployeeID; //Which ID are we currently editing
var editedEmployeeData; //Are we currently editing -> did the data get edited?

class Employee
{
    showEmployees()
    {        
        employee.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "QS-Mitarbeiter"; //Change header

        //GET-Request for all the employee data
        fetch('/employee/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showPersonList(data); //Create HTML-Content
            currentEmployeeData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            employee.showFields();
            employee.showButtons();
        }) 
    }

    showFields()
    {
        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Felder einblenden
        document.getElementById('field0').style.display = "inline";
        document.getElementById('field1').style.display = "inline";

        //Placeholder anpassen
        document.getElementById('field0').placeholder = "Vorname";
        document.getElementById('field1').placeholder = "Name";
        document.getElementById('field2').placeholder = "Funktion";
        document.getElementById('field3').placeholder = "ID";

        //Alte Werte löschen
        document.getElementById('field0').value = "";
        document.getElementById('field1').value = "";
        document.getElementById('field2').value = "";
        document.getElementById('field3').value = "";
    }

    showButtons()
    {
        //Die alten Eventlistener von den Buttons entfernen
        utility.recreateNode(document.getElementById('delete'));
        utility.recreateNode(document.getElementById('save'));
        utility.recreateNode(document.getElementById('edit'));
        utility.recreateNode(document.getElementById('getSomethingByID'));

        //Den Buttons neue Eventlistener zuteilen
        document.getElementById('delete').addEventListener('click', employee.confirmDelete);    
        document.getElementById('save').addEventListener('click', employee.confirmSave);
        document.getElementById('edit').addEventListener('click', employee.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', employee.confirmGetByID);

        //Buttons anzeigen
        document.getElementById('edit').style.display="inline";
        document.getElementById('delete').style.display="inline";
        document.getElementById('save').style.display="inline";
        document.getElementById('getSomethingByID').style.display="inline";
    }    

    confirmDelete()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            employee.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/employee/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Der Mitarbeiter mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showPersonList(data); //Create HTML-Content
                currentEmployeeData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let vorname = document.getElementById('field0').value;
        let name = document.getElementById('field1').value;
        let funktion = document.getElementById('field2').value;

        if(editedEmployeeData == true)
        {
            if(vorname === "" || name === "" || funktion === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                employee.edit(vorname, name, funktion);
            }
        }
        else
        {
            if(vorname === "" || name === "" || funktion === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                employee.save(vorname, name, funktion);
            }
        }
        
    }

    save(vorname, name, funktion)
    {
        let mitarbeiter = vorname + "." + name + "." + funktion;

        fetch('/employee' + '/' + mitarbeiter, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showPersonList(data); //Create HTML-Content
            currentEmployeeData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentEmployeeData[ID])
            {
                document.getElementById('field0').value = currentEmployeeData[ID].vorname;
                document.getElementById('field1').value = currentEmployeeData[ID].name;
                document.getElementById('field2').value = currentEmployeeData[ID].funktion;

                editedEmployeeID = ID;
                editedEmployeeData = true;
            }
            else
            {
                alert("Angegebene ID ist nicht gültig!");
            }
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    edit(vorname, name, funktion)
    {
        let mitarbeiter = editedEmployeeID + "." + vorname + "." + name + "." + funktion;

        fetch('/employee' + '/' + mitarbeiter, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Der Mitarbeiter mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showPersonList(data); //Create HTML-Content
                currentEmployeeData = data; //Current iteration of the data
                editedEmployeeData = false;
                editedEmployeeID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            employee.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/employee/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Der Mitarbeiter mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSinglePerson(data, ID); //Create HTML-Content
                currentEmployeeData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

employee = new Employee();
document.getElementById('QS').addEventListener('click', employee.showEmployees);