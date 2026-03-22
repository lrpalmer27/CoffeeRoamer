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
                break;

            case 'Rating':
                button.classList?.toggle('active');
                updateFeaturedCardsList();
                break;

            case 'Date':
                button.classList?.toggle('active');
                updateFeaturedCardsList();
                break;

            case 'plcholder':
                button.classList?.toggle('active')
                updateFeaturedCardsList();
                alert('Placeholder , please check back later');
                break;
                
        }
    });
}

// this loads the featured card list when the page loads
// and after applying filters
document.addEventListener("DOMContentLoaded", function() {
    updateFeaturedCardsList();
});

// function to filter featured posts
export function updateFeaturedCardsList(){
    const filters = document.getElementById('filterclickbuttons');
    const activefilters = filters?.querySelectorAll('button.active');

    if (activefilters?.length == 0) {
        // no filters applied case handling -> all shown by default on server rendering
        // console.dir('no filters applied');
    }
    else {
        // apply filters
        console.dir('filters applied!');
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
};

// Make globally available
(window as any).updateFeaturedCardsList = updateFeaturedCardsList;
