// Opening filter window
if (typeof document !== "undefined") {
    const filter_button = document.getElementById('filtr');
    const filterwindow = document.getElementById('popupfiltermenu');

    filter_button?.addEventListener('click', () =>
        filterwindow?.classList?.toggle('visible')
    );
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
                
                // alert(`Visible on map filter wip -> ${ids}`);
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
