// Opening filter window
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

// applying filters to top div
if (typeof document !== "undefined") {
    const clickbuttons = document.getElementById('clickbuttons');

    clickbuttons?.addEventListener('click', (e)=>{
        const target = e.target as HTMLElement;
        const button = target.closest('button');

        if (!button) return;

        switch (button.id) {
            case 'VisOnMap':
                const posts = (window as any).posts;
                // alert(`Visible on map filter wip -> ${ids}`);
                console.dir('checking if posts is accessible')
                console.dir(posts)
                // this works. now need to do some filtering with it.
                break;

            case 'Rating':
                alert('rating filter wip');
                break;

            case 'Date':
                alert('Date filter wip');
                break;

            case 'plcholder':
                alert('Placeholder , please check back later');
                break;
        }
    });
}

export function updateFeaturedCardsList(){

}
