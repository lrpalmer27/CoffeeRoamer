# Coffee Roamer
See scratchpad for more information for the objective of this project

Dev URL: https://lrpalmer27.github.io/CoffeeRoamer/

## Map

The map style is maintained locally in `public/mapstyle.json`, and MapLibre GL JS and its CSS are bundled from npm. The style uses OpenFreeMap's OpenMapTiles vector data, sprite, and glyph endpoints, so the basemap is more detailed but still requires a network connection. Map attribution is shown in the map controls.

To remove the runtime map-data dependency as well, the required vector tiles, sprites, and glyphs would need to be packaged with the static site. GitHub Pages cannot run a tile server, so a self-hosted version would need to be a static regional tile bundle (or use a separate tile server).

# wishlist features
- Make backend more robust for post filtering / sorting based on parameters on main screen
- add 'restaurants' section, and wishlist items to populate with new food/coffee recommendations that I want to try.

** existing issues, smaller features are tracked on issues page on github **
