var currentProjectData; //Current iteration of the data
var editedProjectID; //Which ID are we currently editing
var editedProjectData; //Are we currently editing -> did the data get edited?

class Project
{
    showProjects()
    {        
        project.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "Projekte"; //Change header

        //GET-Request for all the project data
        fetch('/project/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showProjectList(data); //Create HTML-Content
            currentProjectData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            project.showFields();
            project.showButtons();
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
        document.getElementById('delete').addEventListener('click', project.confirmDelete);    
        document.getElementById('save').addEventListener('click', project.confirmSave);
        document.getElementById('edit').addEventListener('click', project.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', project.confirmGetByID);

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
            project.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/project/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Das Projekt mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showProjectList(data); //Create HTML-Content
                currentProjectData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let beschreibung = document.getElementById('field2').value;

        if(editedProjectData == true)
        {
            if(beschreibung === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                project.edit(beschreibung);
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
                project.save(beschreibung);
            }
        }
        
    }

    save(beschreibung)
    {
        let projekt = beschreibung;

        fetch('/project' + '/' + projekt, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showProjectList(data); //Create HTML-Content
            currentProjectData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentProjectData[ID])
            {
                document.getElementById('field2').value = currentProjectData[ID].beschreibung;

                editedProjectID = ID;
                editedProjectData = true;
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
        let projekt = editedProjectID + "." + beschreibung;

        fetch('/project' + '/' + projekt, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Das Projekt mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showProjectList(data); //Create HTML-Content
                currentProjectData = data; //Current iteration of the data
                editedProjectData = false;
                editedProjectID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            project.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/project/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Das Projekt mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSingleProject(data, ID); //Create HTML-Content
                currentProjectData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

project = new Project();
document.getElementById('Project').addEventListener('click', project.showProjects);