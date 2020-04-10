var currentComponentData; //Current iteration of the data
var editedComponentID; //Which ID are we currently editing
var editedComponentData; //Are we currently editing -> did the data get edited?

class Component
{
    showComponents()
    {        
        component.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "Komponenten"; //Change header

        //GET-Request for all the component data
        fetch('/component/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showComponentList(data); //Create HTML-Content
            currentComponentData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            component.showFields();
            component.showButtons();
        }) 
    }

    showFields()
    {
        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Field0 ausblenden
        document.getElementById('field0').style.display = "none";

        //Field1 einblenden
        document.getElementById('field1').style.display = "inline";

        //Placeholder anpassen        
        document.getElementById('field1').placeholder = "Beschreibung";
        document.getElementById('field2').placeholder = "Projekt-ID";
        document.getElementById('field3').placeholder = "ID";

        //Alte Werte löschen
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
        document.getElementById('delete').addEventListener('click', component.confirmDelete);    
        document.getElementById('save').addEventListener('click', component.confirmSave);
        document.getElementById('edit').addEventListener('click', component.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', component.confirmGetByID);

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
            component.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/component/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Komponente mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showComponentList(data); //Create HTML-Content
                currentComponentData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let beschreibung = document.getElementById('field1').value;
        let projektID = document.getElementById('field2').value;

        if(editedComponentData == true)
        {
            if(beschreibung === "" || projektID === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                component.edit(beschreibung, projektID);
            }
        }
        else
        {
            if(beschreibung === "" || projektID === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                component.save(beschreibung, projektID);
            }
        }
        
    }

    save(beschreibung, projektID)
    {
        let komponente = beschreibung + "." + projektID;

        fetch('/component' + '/' + komponente, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showComponentList(data); //Create HTML-Content
            currentComponentData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentComponentData[ID])
            {
                document.getElementById('field1').value = currentComponentData[ID].beschreibung;
                document.getElementById('field2').value = currentComponentData[ID].projektID;

                editedComponentID = ID;
                editedComponentData = true;
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

    edit(beschreibung, projektID)
    {
        let komponente = editedComponentID + "." + beschreibung + "." + projektID;

        fetch('/component' + '/' + komponente, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Die Komponente mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showComponentList(data); //Create HTML-Content
                currentComponentData = data; //Current iteration of the data
                editedComponentData = false;
                editedComponentID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            component.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/component/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Komponente mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSingleComponent(data, ID); //Create HTML-Content
                currentComponentData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

component = new Component();
document.getElementById('Component').addEventListener('click', component.showComponents);