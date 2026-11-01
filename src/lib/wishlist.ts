export type WishlistPlace = {
    id: string;
    name: string;
    location: string;
    notes: string;
    coords: [number, number];
};

declare global {
    interface Window {
        wishlistPlaces?: WishlistPlace[];
        wishlistMapVisible?: boolean;
        setWishlistVisible?: (visible: boolean) => void;
    }
}

const storageKey = 'coffee-roamer-wishlist';

const isWishlistPlace = (value: unknown): value is WishlistPlace => {
    if (!value || typeof value !== 'object') return false;

    const place = value as Partial<WishlistPlace>;
    return typeof place.id === 'string' &&
        typeof place.name === 'string' &&
        typeof place.location === 'string' &&
        typeof place.notes === 'string' &&
        Array.isArray(place.coords) &&
        place.coords.length === 2 &&
        typeof place.coords[0] === 'number' &&
        Number.isFinite(place.coords[0]) &&
        place.coords[0] >= -90 &&
        place.coords[0] <= 90 &&
        typeof place.coords[1] === 'number' &&
        Number.isFinite(place.coords[1]) &&
        place.coords[1] >= -180 &&
        place.coords[1] <= 180;
};

export function readWishlist(): WishlistPlace[] {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isWishlistPlace)) {
        throw new Error('Saved wishlist data is invalid. Export or remove it from this browser to continue.');
    }

    return parsed;
}

export function saveWishlist(places: WishlistPlace[]) {
    localStorage.setItem(storageKey, JSON.stringify(places));
    window.wishlistPlaces = places;
    window.dispatchEvent(new CustomEvent<WishlistPlace[]>('coffee-roamer:wishlist-changed', {
        detail: places,
    }));
}
