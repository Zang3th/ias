class Employee
{
    showEmployees()
    {        
        employee.showContent();        
    }

    showContent()
    {
        //Change header
        document.getElementById('mainHeader').innerHTML = "QS-Mitarbeiter";

        //GET-Request for all the employee data
        fetch('/employee/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {      
            //Create HTML-Content
            let output = templateEngine.showEmployeeList(data);

            //Update Content
            document.getElementById('mainContent').innerHTML = output;

            employee.showFields();
            employee.showButtons();
        }) 
    }

    showFields()
    {
        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

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
        //GET-Request for one single employee
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
                //Create HTML-Content
                let output = templateEngine.showEmployeeList(data);

                //Update Content
                document.getElementById('mainContent').innerHTML = output;
            }
            
        })
    }

    confirmSave()
    {
        let vorname = document.getElementById('field0').value;
        let name = document.getElementById('field1').value;
        let funktion = document.getElementById('field2').value;

        if(vorname === "" || name === "" || funktion === "")
        {
            alert("Bitte füllen Sie alle Felder aus!");
        }
        else
        {
            employee.save(vorname, name, funktion);
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
    
            //Create HTML-Content
            let output = templateEngine.showEmployeeList(data);

            //Update Content
            document.getElementById('mainContent').innerHTML = output;
        }) 
    }

    confirmEdit()
    {

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
        //GET-Request for one single employee
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
                //Create HTML-Content
                let output = templateEngine.showSingleEmployee(data, ID);

                //Update Content
                document.getElementById('mainContent').innerHTML = output;
            }
            
        })
    }
}

employee = new Employee();
document.getElementById('QS').addEventListener('click', employee.showEmployees);