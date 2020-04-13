class Utility
{
    //Function to delete all eventlisteners of a node
    recreateNode(el, withChildren)
    {
        if (withChildren) 
        {
            el.parentNode.replaceChild(el.cloneNode(true), el);
        }
        else 
        {
            var newEl = el.cloneNode(false);
            while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
            el.parentNode.replaceChild(newEl, el);
        }
    }   
    
    //Function to create a Selectlist out of given Data
    createSelectList(data, select_field, opt = 0)
    {
        let length = Object.keys(data).length;
        let max_val = Object.keys(data)[length - 1];

        for(let i = 1; i <= max_val; i++)
        {
            if(data[i])
            {
                let select_elem = document.getElementById(select_field);
                let option = document.createElement('option');
                if (opt === 0)
                {
                    option.innerHTML = data[i].vorname + ' ' + data[i].name;
                }
                else if (opt === 1)
                {
                    option.innerHTML = data[i].beschreibung;
                }
                else if (opt === 2)
                {                    
                    option.innerHTML = data[i].beschreibung;
                }
                select_elem.appendChild(option);
            }
        }
    }
}

utility = new Utility();