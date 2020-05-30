var currentCategoryData; //Current iteration of the data
var editedCategoryID; //Which ID are we currently editing
var editedCategoryData; //Are we currently editing -> did the data get edited?

class Category
{
    showCategories()
    {        
        category.showContent();      
    }

    showContent()
    {        
        document.getElementById('mainHeader').innerHTML = "Fehlerkategorien"; //Change header

        //GET-Request for all the category data
        fetch('/category/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showCategoryList(data); //Create HTML-Content
            currentCategoryData = data; //Current iteration of the data
           
            document.getElementById('mainContent').innerHTML = output;  //Update Content

            category.showFields();
            category.showButtons();
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

        //Felder einblenden
        document.getElementById('field1').style.display = "inline";
        document.getElementById('field2').style.display = "inline";
        document.getElementById('field3').style.display = "inline";

        //Placeholder anpassen        
        document.getElementById('field1').placeholder = "Beschreibung";
        document.getElementById('field2').placeholder = "Schweregrad";
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
        document.getElementById('delete').addEventListener('click', category.confirmDelete);    
        document.getElementById('save').addEventListener('click', category.confirmSave);
        document.getElementById('edit').addEventListener('click', category.confirmEdit);
        document.getElementById('getSomethingByID').addEventListener('click', category.confirmGetByID);

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
            category.delete(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }  
    }

    delete(ID)
    {
        fetch('/category/' + ID, 
        {
            method: 'DELETE'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Kategorie mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {
                
                let output = templateEngine.showCategoryList(data); //Create HTML-Content
                currentCategoryData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }

    confirmSave()
    {
        let beschreibung = document.getElementById('field1').value;
        let schweregrad = document.getElementById('field2').value;

        if(editedCategoryData == true)
        {
            if(beschreibung === "" || schweregrad === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                category.edit(beschreibung, schweregrad);
            }
        }
        else
        {
            if(beschreibung === "" || schweregrad === "")
            {
                alert("Bitte füllen Sie alle Felder aus!");
            }
            else
            {
                category.save(beschreibung, schweregrad);
            }
        }
        
    }

    save(beschreibung, schweregrad)
    {
        let kategorie = beschreibung + "." + schweregrad;

        fetch('/category' + '/' + kategorie, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showCategoryList(data); //Create HTML-Content
            currentCategoryData = data; //Current iteration of the data
            
            document.getElementById('mainContent').innerHTML = output; //Update Content
        }) 
    }

    confirmEdit()
    {
        let ID = document.getElementById('field3').value;        
        if(ID)
        {
            if(currentCategoryData[ID])
            {
                document.getElementById('field1').value = currentCategoryData[ID].beschreibung;
                document.getElementById('field2').value = currentCategoryData[ID].schweregrad;

                editedCategoryID = ID;
                editedCategoryData = true;
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

    edit(beschreibung, schweregrad)
    {
        let kategorie = editedCategoryID + "." + beschreibung + "." + schweregrad;

        fetch('/category' + '/' + kategorie, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {         
            if(data === "ERROR")
            {
                alert("Die Kategorie mit der ID " + ID + "konnte nicht editiert werden!");
            }
            else
            {                
                let output = templateEngine.showCategoryList(data); //Create HTML-Content
                currentCategoryData = data; //Current iteration of the data
                editedCategoryData = false;
                editedCategoryID = 0;

                document.getElementById('mainContent').innerHTML = output; //Update Content
            }           
        }) 
    }

    confirmGetByID()
    {
        let ID = document.getElementById('field3').value;
        if(ID)
        {
            category.getByID(ID);
        }
        else
        {
            alert("Bitte geben Sie eine ID an!");
        }        
    }

    getByID(ID)
    {
        fetch('/category/' + ID, 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {       
            if(data === "ERROR")
            {
                alert("Die Kategorie mit der ID " + ID + " wurde nicht gefunden!");
            }
            else
            {                
                let output = templateEngine.showSingleCategory(data, ID); //Create HTML-Content
                currentCategoryData = data; //Current iteration of the data
                
                document.getElementById('mainContent').innerHTML = output; //Update Content
            }
            
        })
    }
}

category = new Category();
document.getElementById('Category').addEventListener('click', category.showCategories);