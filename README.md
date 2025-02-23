# Custom-Blocks

The following blocks are based around Bootstrap 5 components.

That being said, you could change the classes being used inside the data folder to work with the framework of your choice!

These blocks are set up and created using `@wordpress/create-block` and the `dynamic` variant.

## Admin settings

The plugin includes an option to yes or now to using Bootstrap 5.  If you select Bootstrap, it will add the Bootstrap 5 JS/CSS to the admin. You'll notice when you use blocks like `accordion`, it will work in the admin.

This plugin currently add's the css/js to the FE as well, but only for testing purposes.

### Currently includes

- Container
- Row
- Column
- Accordions
- Modals
- Alerts
- Cover Block v2 (lazy loading for images and video backgrounds)
- Alerts
- tabbed panels (horizontal)
  - working on a responsive state when on mobile you can choose to use an accordion instead of the tabs
- swiper carousel
  - slide
  - crossfade
  - slide preview
  - minor ada updates
    - play/pause
   	- pagination is buttons instead of spans

### Road Map

- Add an option to add the js/css or them individually to the FE of the site.
- More blocks types
- ADA enhancements.
- Other frameworks (Tailwind, Material, etc).

### Node

- v20
- `npm ci`
- `npm run start` (see package.json for additional commands)

Not on v20? Thats ok, `npx -p node@20 npm ci`. You'll then use that `npx -p node@20` prefix for all commands.

#### PR's welcome

Feel free to chime in, we are better together.

### In progress

- Tabbed panel accordion on mobile
- Swiper Carousel logic refinements and more clear requirements for specific settings
  - switch to render.php for easier admin editing and maintance.
