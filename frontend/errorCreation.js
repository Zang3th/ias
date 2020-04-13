class errorCreation
{
    showErrors()
    {
        errorC.showContent();
    }

    showContent()
    {
        document.getElementById('mainHeader').innerHTML = "Fehlererfassung"; //Change header
        document.getElementById('mainContent').innerHTML = "Content";  //Update Content


        errorC.getCreationData();
        errorC.showFields();
        errorC.showButtons();
    }

    getCreationData()
    {
        //GET-Request for all the employee data
        fetch('/employee/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            currentEmployeeData = data; //Current iteration of the data
            utility.createSelectList(currentEmployeeData, 'select0', 0);
        }) 

        //GET-Request for all the component data
        fetch('/component/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            currentComponentData = data; //Current iteration of the data
            utility.createSelectList(currentComponentData, 'select1', 1);
        })

        //GET-Request for all the category data
        fetch('/category/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            currentCategoryData = data; //Current iteration of the data
            utility.createSelectList(currentCategoryData, 'select2', 2);
        }) 
    }

    showFields()
    {
        //Selects einblenden
        document.getElementById('ListSelect0').style.display = "inline";
        document.getElementById('ListSelect1').style.display = "inline";
        document.getElementById('ListSelect2').style.display = "inline";

        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Felder einblenden
        document.getElementById('field0').style.display = "none";
        document.getElementById('field1').style.display = "none";
        document.getElementById('field2').style.display = "none";
        document.getElementById('field3').style.display = "none";
    }

    showButtons()
    {
        //Die alten Eventlistener von den Buttons entfernen
        utility.recreateNode(document.getElementById('save2'));

        //Den Buttons neue Eventlistener zuteilen
        document.getElementById('save2').addEventListener('click', errorC.confirmSave);    

        //Buttons anzeigen
        document.getElementById('edit').style.display="none";
        document.getElementById('delete').style.display="none";
        document.getElementById('save').style.display="none";
        document.getElementById('save2').style.display="inline";
        document.getElementById('getSomethingByID').style.display="none";;
    }

    confirmSave()
    {
        let select0_value = document.getElementById('select0').value;
        let length = Object.keys(currentEmployeeData).length;
        let max_val = Object.keys(currentEmployeeData)[length - 1];
        for(let i = 1; i <= max_val; i++)
        {
            let vorname = currentEmployeeData[i].vorname;
            let name = currentEmployeeData[i].name;
            let mitarbeiter = vorname + " " + name;
            if(mitarbeiter == select0_value)
            {
                var mit_ID = i;
            }
        }

        let select1_value = document.getElementById('select1').value;
        length = Object.keys(currentComponentData).length;
        max_val = Object.keys(currentComponentData)[length - 1];
        for(let i = 1; i <= max_val; i++)
        {
            let beschreibung = currentComponentData[i].beschreibung;
            if(beschreibung == select1_value)
            {
                var komp_ID = i;
            }
        }

        let select2_value = document.getElementById('select2').value;
        length = Object.keys(currentCategoryData).length;
        max_val = Object.keys(currentCategoryData)[length - 1];
        for(let i = 1; i <= max_val; i++)
        {
            let beschreibung = currentCategoryData[i].beschreibung;
            if(beschreibung == select2_value)
            {
                var kat_ID = i;
            }
        }

        errorC.saveError(mit_ID, komp_ID, kat_ID);
    }

    saveError(mitarbeiter, komponente, kategorie)
    {
        let d = new Date();
        let month = d.getMonth() + 1;
        let date = d.getDate() + "-" + month + "-" + d.getFullYear();
        let status = "Offen";
        let entwickler = "Nicht zugewiesen";
        let ursache = "Nicht zugewiesen";
        let fehler = date + "." + mitarbeiter + "." + komponente + "." + kategorie + "." + status + "." + entwickler + "." + ursache;
    
        fetch('/error' + '/' + fehler, 
        {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((data) => {                
    
            console.log(data);
        })
    }
}

errorC = new errorCreation();
document.getElementById('ErrorCreation').addEventListener('click', errorC.showErrors);