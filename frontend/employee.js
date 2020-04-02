class Employee
{
    showEmployees()
    {        
        employee.showContent();
        employee.showFields();
        employee.showSelect();
        employee.showButtons();
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
            let output = templateEngine.createEmployeeList(data);

            //Update Content
            document.getElementById('mainContent').innerHTML = output;
        }) 
    }

    showFields()
    {
        //Felder anzeigen
        document.getElementById('field0').style.display="inline";
        document.getElementById('field1').style.display="inline";
        document.getElementById('field2').style.display="inline";

        //Placeholder anpassen
        document.getElementById('field0').placeholder = "Vorname";
        document.getElementById('field1').placeholder = "Name"
        document.getElementById('field2').placeholder = "Funktion";

        //Alte Werte löschen
        document.getElementById('field0').value = "";
        document.getElementById('field1').value = ""
        document.getElementById('field2').value = "";
    }

    showSelect()
    {
        document.getElementById('select1').style.display="inline";
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

    }

    confirmSave()
    {

    }

    confirmEdit()
    {

    }

    confirmGetByID()
    {

    }
}

employee = new Employee();
document.getElementById('QS').addEventListener('click', employee.showEmployees);