var currentReasonData; //Current iteration of the data
var editedReasonID; //Which ID are we currently editing
var editedReasonData; //Are we currently editing -> did the data get edited?

class Reason
{
    showReasons()
    {        
        reason.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "Fehlerursachen"; //Change header

        //GET-Request for all the reason data
        fetch('/reason/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showReasonList(data); //Create HTML-Content
            currentReasonData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            reason.showFields();
            reason.showButtons();
        }) 
    }

    showFields()
    {
        //Selects ausblenden
        document.getElementById('ListSelect0').style.display = "none";
        document.getElementById('ListSelect1').style.display = "none";
        document.getElementById('ListSelect2').style.display = "none";
        document.getElementById('ListSelect3').style.display = "none";
        document.getElementById('ListSelect4').style.display = "none";
        document.getElementById('ListSelect5').style.display = "none";

        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Felder ausblenden
        document.getElementById('field0').style.display = "none";
        document.getElementById('field1').style.display = "none";

        //Felder einblenden
        document.getElementById('field2').style.display = "inline";
        document.getElementById('field3').style.display = "inline";

        //Placeholder anpassen        
        document.getElementById('field2').placeholder = "Beschreibung";
        document.getElementById('field3').placeholder = "ID";

        //Alte Werte löschen
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
        document.getElementById('delete').addEventListener('click', reason.confirmDelete);    
        document.getElementById('save').addEventListener('click', reason.confirmSave);
        document.getElementById('edit').addEventListener('click', reason.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', reason.confirmGetByID);

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
            reason.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/reason/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Ursache mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showReasonList(data); //Create HTML-Content
                currentReasonData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let beschreibung = document.getElementById('field2').value;

        if(editedReasonData == true)
        {
            if(beschreibung === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                reason.edit(beschreibung);
            }
        }
        else
        {
            if(beschreibung === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                reason.save(beschreibung);
            }
        }
        
    }

    save(beschreibung)
    {
        let ursache = beschreibung;

        fetch('/reason' + '/' + ursache, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showReasonList(data); //Create HTML-Content
            currentReasonData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentReasonData[ID])
            {
                document.getElementById('field2').value = currentReasonData[ID].beschreibung;

                editedReasonID = ID;
                editedReasonData = true;
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

    edit(beschreibung)
    {
        let ursache = editedReasonID + "." + beschreibung;

        fetch('/reason' + '/' + ursache, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Die Ursache mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showReasonList(data); //Create HTML-Content
                currentReasonData = data; //Current iteration of the data
                editedReasonData = false;
                editedReasonID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            reason.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/reason/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Ursache mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSingleReason(data, ID); //Create HTML-Content
                currentReasonData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

reason = new Reason();
document.getElementById('Reason').addEventListener('click', reason.showReasons);