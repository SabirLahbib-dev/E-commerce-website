# Sabir E-Commerce Web Project

A lightweight static e-commerce storefront built with HTML, CSS, and JavaScript. The project includes a product catalog, shopping cart, checkout flow, order history, and shipment tracking pages.

## Features

- Product grid with category filtering and search
- Shopping cart with quantity updates
- Checkout page for delivery and payment selection
- Order listing page
- Tracking page for shipment status
- Responsive static UI built from reusable HTML/CSS/JS modules

## Project structure

- `sabir.html` – storefront landing page
- `checkout.html` – cart and checkout flow
- `orders.html` – order history page
- `tracking.html` – delivery tracking page
- `data/` – product and cart data logic
- `scripts/` – behavior for each page
- `styles/` – page-specific styling
- `images/` – branding, icons, and product images

## Getting started

Because this is a static front-end project, you can run it in any browser without a build step.

Option 1: Open the HTML files directly in a browser.

Option 2: Serve the folder locally:

```bash
cd "C:\Users\HP\OneDrive\Desktop\Sabir e-commerce web project"
python -m http.server 8000
```

Then visit:

- `http://localhost:8000/sabir.html`
- `http://localhost:8000/checkout.html`
- `http://localhost:8000/orders.html`
- `http://localhost:8000/tracking.html`

## Notes

This project uses local browser storage for cart persistence and mock product data stored in the `data/` folder. It is designed as a front-end demo and does not include a backend or database.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
