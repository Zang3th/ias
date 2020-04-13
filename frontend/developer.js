var currentDeveloperData; //Current iteration of the data
var editedDeveloperID; //Which ID are we currently editing
var editedDeveloperData; //Are we currently editing -> did the data get edited?

class Developer
{
    showDevelopers()
    {        
        developer.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "SW-Entwickler"; //Change header

        //GET-Request for all the developer data
        fetch('/developer/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showPersonList(data); //Create HTML-Content
            currentDeveloperData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            developer.showFields();
            developer.showButtons();
        }) 
    }

    showFields()
    {
        //Selects ausblenden
        document.getElementById('ListSelect0').style.display = "none";
        document.getElementById('ListSelect1').style.display = "none";
        document.getElementById('ListSelect2').style.display = "none";

        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Felder einblenden
        document.getElementById('field0').style.display = "inline";
        document.getElementById('field1').style.display = "inline";
        document.getElementById('field2').style.display = "inline";
        document.getElementById('field3').style.display = "inline";
        
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
        document.getElementById('delete').addEventListener('click', developer.confirmDelete);    
        document.getElementById('save').addEventListener('click', developer.confirmSave);
        document.getElementById('edit').addEventListener('click', developer.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', developer.confirmGetByID);

        //Buttons anzeigen
        document.getElementById('edit').style.display="inline";
        document.getElementById('delete').style.display="inline";
        document.getElementById('save').style.display="inline";
        document.getElementById('save2').style.display="none";
        document.getElementById('getSomethingByID').style.display="inline";
    }    

    confirmDelete()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            developer.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/developer/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Der Entwickler mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showPersonList(data); //Create HTML-Content
                currentDeveloperData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let vorname = document.getElementById('field0').value;
        let name = document.getElementById('field1').value;
        let funktion = document.getElementById('field2').value;

        if(editedDeveloperData == true)
        {
            if(vorname === "" || name === "" || funktion === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                developer.edit(vorname, name, funktion);
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
                developer.save(vorname, name, funktion);
            }
        }
        
    }

    save(vorname, name, funktion)
    {
        let entwickler = vorname + "." + name + "." + funktion;

        fetch('/developer' + '/' + entwickler, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showPersonList(data); //Create HTML-Content
            currentDeveloperData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentDeveloperData[ID])
            {
                document.getElementById('field0').value = currentDeveloperData[ID].vorname;
                document.getElementById('field1').value = currentDeveloperData[ID].name;
                document.getElementById('field2').value = currentDeveloperData[ID].funktion;

                editedDeveloperID = ID;
                editedDeveloperData = true;
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
        let entwickler = editedDeveloperID + "." + vorname + "." + name + "." + funktion;

        fetch('/developer' + '/' + entwickler, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Der Entwickler mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showPersonList(data); //Create HTML-Content
                currentDeveloperData = data; //Current iteration of the data
                editedDeveloperData = false;
                editedDeveloperID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            developer.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/developer/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Der Entwickler mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSinglePerson(data, ID); //Create HTML-Content
                currentDeveloperData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

developer = new Developer();
document.getElementById('SW').addEventListener('click', developer.showDevelopers);