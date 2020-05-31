var currentErrorData;

class errorResolve
{
    constructor()
    {
        this.getSelectionData();
    }

    showErrors()
    {        
        errorR.showContent();        
    }

    showContent()
    {
        document.getElementById('mainHeader').innerHTML = "Fehlerbehebung"; //Change header

        //GET-Request for all the error data
        fetch('/error', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            let output = templateEngine.showResolvedErrorList(data); //Create HTML-Content
            currentErrorData = data; //Current iteration of the data
            document.getElementById('select3').options.length = 0;
            utility.createSelectList(currentErrorData, 'select3', 3);

            document.getElementById('mainContent').innerHTML = output;  //Update Content

            errorR.showFields();
            errorR.showButtons();
        })    
        
        errorR.getSelectionData();
    }

    getSelectionData()
    {       
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
        })

        //GET-Request for all the category data
        fetch('/developer/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            currentDeveloperData = data; //Current iteration of the data
            document.getElementById('select4').options.length = 0;
            utility.createSelectList(currentDeveloperData, 'select4', 0);
        }) 

        //GET-Request for all the category data
        fetch('/reason/all', 
        {
            method: 'GET',
            cache: 'no-cache'
        })
        .then((result) => result.json())
        .then((data) => 
        {    
            currentReasonData = data; //Current iteration of the data
            document.getElementById('select5').options.length = 0;
            utility.createSelectList(currentReasonData, 'select5', 2);
        }) 
    }

    showFields()
    {
        //Selects einblenden
        document.getElementById('ListSelect0').style.display = "none";
        document.getElementById('ListSelect1').style.display = "none";
        document.getElementById('ListSelect2').style.display = "none";
        document.getElementById('ListSelect3').style.display = "inline";
        document.getElementById('ListSelect4').style.display = "inline";
        document.getElementById('ListSelect5').style.display = "inline";

        //Felder anzeigen
        document.getElementById('mainUpperArea').style.display="flow";
        document.getElementById('mainLowerArea').style.display="flow";

        //Felder ausblenden
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
        document.getElementById('save2').addEventListener('click', errorR.confirmSave);    

        //Buttons anzeigen
        document.getElementById('edit').style.display="none";
        document.getElementById('delete').style.display="none";
        document.getElementById('save').style.display="none";
        document.getElementById('save2').style.display="inline";
        document.getElementById('getSomethingByID').style.display="none";;
    }

    confirmSave()
    {
        let fehler_id = document.getElementById('select3').value;

        let select4_value = document.getElementById('select4').value;
        let length = Object.keys(currentDeveloperData).length;
        let max_val = Object.keys(currentDeveloperData)[length - 1];
        for(let i = 1; i <= max_val; i++)
        {
            let vorname = currentDeveloperData[i].vorname;
            let name = currentDeveloperData[i].name;
            let entwickler = vorname + " " + name;
            if(entwickler == select4_value)
            {
                var dev_ID = i;
            }
        }

        let select5_value = document.getElementById('select5').value;
        length = Object.keys(currentReasonData).length;
        max_val = Object.keys(currentReasonData)[length - 1];
        for(let i = 1; i <= max_val; i++)
        {
            let beschreibung = currentReasonData[i].beschreibung;
            if(beschreibung == select5_value)
            {
                var reason_ID = i;
            }
        }

        errorR.saveError(fehler_id, dev_ID, reason_ID);
    }

    saveError(fehler_id, dev_ID, reason_ID)
    {
        let d = new Date();
        let month = d.getMonth() + 1;
        let date = d.getDate() + "." + month + "." + d.getFullYear();
        let status = "Behoben";
        let fehler = fehler_id + ":" + status + ":" + dev_ID + ":" + reason_ID + ":" + date;
    
        fetch('/error' + '/' + fehler, 
        {
            method: 'PUT'
        })
        .then((result) => result.json())
        .then((data) => 
        {                
            let output = templateEngine.showResolvedErrorList(data); //Create HTML-Content
            currentErrorData = data; //Current iteration of the data

            document.getElementById('mainContent').innerHTML = output;  //Update Content
        })
    }
}

errorR = new errorResolve();
document.getElementById('ErrorResolve').addEventListener('click', errorR.showErrors);