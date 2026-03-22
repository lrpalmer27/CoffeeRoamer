import type { CollectionEntry } from "astro:content";

// Opening filter selection window
if (typeof document !== "undefined") {
    const filter_button = document.getElementById('filtr');
    const filterwindow = document.getElementById('popupfiltermenu');
    
    // open;
    filter_button?.addEventListener('click', (e) => {
        e.stopPropagation();
        filterwindow?.classList?.toggle('visible');
    });

    // Prevent clicks inside the popup from closing it
    filterwindow?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        filterwindow?.classList?.remove('visible');
    });
}

// activating filter status to be read by list generator
if (typeof document !== "undefined") {
    const filters = document.getElementById('filterclickbuttons');

    filters?.addEventListener('click', (e)=>{
        const target = e.target as HTMLElement;
        const button = target.closest('button');

        if (!button) return;

        switch (button.id) {
            case 'VisOnMap':
                button.classList?.toggle('active');
                updateFeaturedCardsList();
                document.getElementById('vizActiveFilter').style.display='';
                break;

            case 'Rating':
                button.classList?.toggle('active');
                updateFeaturedCardsList();
                document.getElementById('RatingActiveFilter').style.display='';
                alert('This doesnt work yet! , please check back later');
                break;

            case 'Date':
                button.classList?.toggle('active');
                updateFeaturedCardsList();
                document.getElementById('DateActiveFilter').style.display='';
                alert('This doesnt work yet! , please check back later');
                break;

            case 'plcholder':
                button.classList?.toggle('active')
                updateFeaturedCardsList();
                document.getElementById('plcholderActiveFilter').style.display='';
                alert('This doesnt work yet! , please check back later');
                break;
                
        }
    });
}

// this removes active filters from list when they get clicked
if (typeof document !== "undefined") {
    const filters = document.getElementById('mapfilters');

    filters?.addEventListener('click', (e)=>{
        const target = e.target as HTMLElement;
        const actfiltrbutton = target.closest('button');
        if (!actfiltrbutton) return;
        //this hides the active filter button
        document.getElementById(actfiltrbutton.id).style.display='none';

        // this disables the filtering of that category
        switch (actfiltrbutton.id) {
            case 'vizActiveFilter':
                actfiltrbutton.classList?.toggle('active');
                document.getElementById('VisOnMap')?.classList.remove('active');
                updateFeaturedCardsList();
            case 'DateActiveFilter':
                actfiltrbutton.classList?.toggle('active');
                document.getElementById('Date')?.classList.remove('active');
                updateFeaturedCardsList();
            case 'RatingActiveFilter': 
                actfiltrbutton.classList?.toggle('active');
                document.getElementById('Rating')?.classList.remove('active');
                updateFeaturedCardsList();
            case 'plcholderActiveFilter':
                actfiltrbutton.classList?.toggle('active');
                document.getElementById('plcholder')?.classList.remove('active');
                updateFeaturedCardsList();
        }
    });
}

// this loads the featured card list when the page loads
// and after applying filters
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function() {
        updateFeaturedCardsList();
    });
}

// function to filter featured posts
export function updateFeaturedCardsList(){
    const filters = document.getElementById('filterclickbuttons');
    const activefilters = filters?.querySelectorAll('button.active');

    if (activefilters?.length == 0) {
        // no filters applied case handling -> all shown by default on server rendering
        var posts = (window as any).posts;
        // first show all
        posts.forEach(p => {
            document.getElementById(p.id).style.display='';
        });
    }
    else {
        // apply filters
        if (!activefilters) return;

        activefilters.forEach(e => {
            if (e.id == 'VisOnMap'){
                // hide posts that are not visible on the map view screen
                // TODO: clean this up. There is definitely a more efficient
                // way to do this.
                var posts = (window as any).posts;
                // first show all
                posts.forEach(p => {
                    document.getElementById(p.id).style.display='';
                });

                // second hide all that arent on the map.
                const tohide = posts.filter(p => p.data.mapvis === false);
                tohide.forEach(p => {
                    const temp = document.getElementById(p.id);
                    temp.style.display ='none';
                });
            }
            if (e.id == 'Date'){

            }
            if (e.id == 'Rating'){
                
            }
            if (e.id == 'plcholder'){
                
            }
        }); 
         
    };
// Make fcns global
(window as any).updateFeaturedCardsList = updateFeaturedCardsList;
};


