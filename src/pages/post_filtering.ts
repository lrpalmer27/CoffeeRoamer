type FilterPost = {
    id: string;
    data: {
        mapvis: boolean;
        OverallRanking: number;
        pubDate: string;
    };
};

const filterChips: Record<string, string> = {
    VisOnMap: 'vizActiveFilter',
    Rating: 'RatingActiveFilter',
    Date: 'DateActiveFilter',
    WishlistPins: 'wishlistActiveFilter',
};

const activeFilterButton = (id: string) =>
    document.getElementById(id) as HTMLButtonElement | null;

const updateChip = (filterId: string, isActive: boolean) => {
    const chip = document.getElementById(filterChips[filterId]);
    if (chip) chip.style.display = isActive ? '' : 'none';
};

const setFilterActive = (filterId: string, isActive: boolean) => {
    const button = activeFilterButton(filterId);
    if (!button) return;

    if (filterId === 'WishlistPins') {
        window.wishlistMapVisible = isActive;
        window.setWishlistVisible?.(isActive);
    }

    if (!isActive && filterId === 'Date') {
        const fromInput = document.getElementById('visitDateFrom') as HTMLInputElement | null;
        const throughInput = document.getElementById('visitDateThrough') as HTMLInputElement | null;
        if (fromInput) fromInput.value = '';
        if (throughInput) throughInput.value = '';
    }

    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    updateChip(filterId, isActive);

    const options = document.getElementById(`${filterId}Options`);
    if (options) options.toggleAttribute('hidden', !isActive);
};

export function updateFeaturedCardsList() {
    const posts = (window as Window & { posts?: FilterPost[] }).posts ?? [];
    const showVisibleOnly = activeFilterButton('VisOnMap')?.classList.contains('active') ?? false;
    const mapVisibilityReady = window.mapVisibilityReady ?? false;
    const ratingActive = activeFilterButton('Rating')?.classList.contains('active') ?? false;
    const dateActive = activeFilterButton('Date')?.classList.contains('active') ?? false;
    const minRating = Number((document.getElementById('minRating') as HTMLSelectElement | null)?.value ?? 0);
    const fromDate = (document.getElementById('visitDateFrom') as HTMLInputElement | null)?.value ?? '';
    const throughDate = (document.getElementById('visitDateThrough') as HTMLInputElement | null)?.value ?? '';
    posts.forEach((post) => {
        const card = document.getElementById(post.id);
        if (!card) return;

        const visitedDate = post.data.pubDate.slice(0, 10);
        const matches =
            (!showVisibleOnly || !mapVisibilityReady || post.data.mapvis) &&
            (!ratingActive || post.data.OverallRanking >= minRating) &&
            (!dateActive || (
                Boolean(visitedDate) &&
                (!fromDate || visitedDate >= fromDate) &&
                (!throughDate || visitedDate <= throughDate)
            ));

        card.style.display = matches ? '' : 'none';
    });
}

if (typeof document !== 'undefined') {
    const filterButton = document.getElementById('filtr');
    const filterWindow = document.getElementById('popupfiltermenu');
    const filterControls = document.getElementById('filterclickbuttons');
    const activeFilters = document.getElementById('mapfilters');

    filterButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        filterWindow?.classList.toggle('visible');
    });

    filterWindow?.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', () => filterWindow?.classList.remove('visible'));

    filterControls?.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const button = target.closest('button');
        if (!button || !filterChips[button.id]) return;

        setFilterActive(button.id, !button.classList.contains('active'));
        updateFeaturedCardsList();
    });

    activeFilters?.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const chip = target.closest('button');
        if (!chip) return;

        const filterId = Object.keys(filterChips).find((id) => filterChips[id] === chip.id);
        if (!filterId) return;

        setFilterActive(filterId, false);
        updateFeaturedCardsList();
    });

    document.getElementById('minRating')?.addEventListener('change', (event) => {
        const rating = Number((event.target as HTMLSelectElement).value);
        setFilterActive('Rating', rating > 0);
        updateFeaturedCardsList();
    });

    ['visitDateFrom', 'visitDateThrough'].forEach((inputId) => {
        document.getElementById(inputId)?.addEventListener('change', () => {
            const hasDateRange = Boolean(
                (document.getElementById('visitDateFrom') as HTMLInputElement | null)?.value ||
                (document.getElementById('visitDateThrough') as HTMLInputElement | null)?.value,
            );
            setFilterActive('Date', hasDateRange);
            updateFeaturedCardsList();
        });
    });

    window.updateFeaturedCardsList = updateFeaturedCardsList;
    setFilterActive('VisOnMap', true);
    document.addEventListener('DOMContentLoaded', updateFeaturedCardsList, { once: true });
}

declare global {
    interface Window {
        updateFeaturedCardsList: typeof updateFeaturedCardsList;
        mapVisibilityReady?: boolean;
        setWishlistVisible?: (visible: boolean) => void;
    }
}
