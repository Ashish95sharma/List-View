# Product Listing & View

A product listing and product detail app built on DummyJSON. Users can browse paginated products, filter by category / brand / price, search from the header, and open a product detail page. Filters stay applied when navigating back to the list.

Stack: **React 19**, **TypeScript**, **Vite**, **MUI**, **Redux Toolkit**, **RTK Query**, **React Router**.

---

## Setup instructions

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install

```bash
git clone https://github.com/Ashish95sharma/List-View.git
cd List-View
npm install
```

No API keys are required. DummyJSON is public. Copy `.env.example` to `.env` — `VITE_APP_BASE_URL` defaults to `https://dummyjson.com`.

### Run locally

```bash
npm run dev
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Other scripts

| Command | Purpose |
| --- | --- |
| `npm run build` | Typecheck (`tsc`) and production build |
| `npm run preview` | Serve the production build locally |
| `npm run eslint` | Lint (needs an ESLint config; see improvements) |

---

## Assumptions made

- **DummyJSON is the source of truth.** Only the required endpoints are used: `GET /products`, `GET /products/categories`, `GET /products/category/{category}`, and `GET /products/{id}`.
- **Category is a server filter.** “All Categories” hits `/products`. A specific category hits `/products/category/{slug}`. Pagination uses `limit` + `skip` (DummyJSON has no `page` param).
- **Brand, min/max price, and header search are not first-class DummyJSON filters.** DummyJSON does not document `brand`, `minPrice`, or `maxPrice`. Search exists at `/products/search?q=`, but that was outside the required endpoint list, so search is applied on the current result set in the browser by default.
- **Brands come from the current fetch**, not a dedicated brands API. The brand list is the unique `brand` values on the products already loaded. `brand` is optional on products.
- **Price inputs are strings until Apply.** Invalid / empty values are ignored. There is no min > max validation yet.
- **Listing filters live in Redux**, not the URL. That keeps category, brands, price, search, and page when the user opens a product and presses Back. Reloading the page resets filters.
- **The “Server filters” toggle is a diagnostic control**, not a production requirement. OFF = filter in the browser. ON = attach `brand`, `minPrice`, `maxPrice`, and `q` as query params so the network call can be inspected. DummyJSON may ignore those fields.
- **Header cart / account icons are visual only**, matching the listing mock. There is no auth or cart backend.
- **The existing MUI theme and folder aliases were kept** from the starter template after unused auth / toast / form code was removed.

---

## Architectural decisions

### Feature-based UI, shared API layer

```text
src/
  features/list          listing page + list.helper
  features/details       detail page + details.helper
  components/            reusable UI (card, grid, filters, header, states)
  store/api/productApi   DummyJSON via RTK Query
  store/slices           listing filter UI state only
  types/                 Product / API contracts
  utils/                 params, client filters, formatting
```

Features own screens and their helpers. Shared widgets live in `components/`. Routes lazy-load features (`/` and `/product/:id`).

### Server state vs UI state

- **RTK Query** owns products, categories, loading, errors, and cache. There is no manual `fetch` / axios layer and no Redux slice for product lists.
- **`listingFilters` slice** owns sidebar filters, header search, and page. That is client UI state that must survive the detail round-trip.
- Feature files stay presentational. Data wiring lives in `list.helper.ts` / `details.helper.ts`.

### Query params

`createParamsPayload` is a shared helper that drops empty values (`undefined`, `null`, `''`, empty arrays) so every request can build a clean query object. The list helper uses it for `limit` / `skip` (and optional server-filter fields). `productApi` uses the same helper instead of a product-only mapper.

### Filtering split

| Filter | Where it runs |
| --- | --- |
| Category | Server (path) |
| Pagination | Server (`limit` / `skip`) |
| Brand, price, search | Client on the current page (default) |

This matches DummyJSON’s real capabilities without pretending the API supports combined multi-filters.

### UI

MUI is the component library (theme, layout primitives, form controls). Feature SCSS handles page layout. Loading, error, empty, and retry are first-class shared states.

---

## Improvements if given more time

### UI fixes (polish beyond the current screens)

- **Desktop header.** Hide the hamburger when the filter sidebar is already visible. On the detail page the menu button currently does nothing.
- **Listing heading.** The main column title is “Filters” with a search icon; it should reflect the product results (count, active filters, or “Products”).
- **Filter sidebar.** Show all categories (only the first six are listed). Add a clear-all control, validate min/max price, and keep brand checkboxes from disappearing when the current page has few brands.
- **Product cards.** Align price vs rating on narrow cards, show truncated titles with tooltips more consistently, and add image placeholders / skeletons instead of a blank spinner.
- **Detail gallery.** Replace page-number pagination with image thumbnails or dots. Show original price + discount, stock/availability, and larger image zoom.
- **Header actions.** Two similar account icons look like a mock leftover. Either implement cart/profile or drop the unused control. Searching from the detail header should return to the listing with that query.
- **Mobile.** Keep the floating “Server filters” control from covering pagination. Give the filter drawer a title and Apply/Close actions. Tighten spacing to match the Figma mock more closely.
- **Accessibility.** Focus trap in the filter drawer, visible focus rings, `aria-current` on pagination, and keyboard-friendly cards.

### Extra features (not in the assignment)

- **Sort** by price, rating, or name, plus a page-size selector (`10 / 25 / 50` constants already exist).
- **Shareable filters** via URL query params (`?category=&q=&page=`), with Redux still as the source of truth.
- **Debounced search** against DummyJSON `/products/search?q=` so search is server-side without extra keystrokes per request.
- **Cart / wishlist** using the existing header icons, with a simple Redux slice (still no DummyJSON write API).
- **Related products** on the detail page (same category).
- **Tests** for `createParamsPayload`, client filter helpers, and listing/detail flows.
- **ESLint flat config** so `npm run eslint` works, plus CI for lint + `npm run build`.
- **Remove or hide the server-filters debug toggle** in a production build.
