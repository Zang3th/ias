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
}

utility = new Utility();