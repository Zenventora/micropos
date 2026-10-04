# Puravigal POS

**Micro POS for micro and small businesses.**

> Scope = Micro. Quality = Professional.

The repository is being rebuilt as a complete Puravigal POS product foundation. The old static site is no longer the product blueprint.

## Implemented now
- Reworked public product landing page
- Responsive POS workspace
- Dashboard and business KPIs
- Billing/cart/payment selection
- Product catalogue and CRUD form
- Inventory visibility and low-stock status
- Purchases
- Customers
- Suppliers
- Reports
- Team and roles surface
- Business settings and regional currency selection
- CSV export
- Responsive mobile navigation
- Browser-persistent demo data
- PostgreSQL multi-tenant domain schema
- Architecture and security rules

## Prototype vs production
The workspace currently runs as a static browser prototype and stores demo data in localStorage. It is deliberately useful for UI/UX validation, but it is not a production cloud POS yet.

Production work still requires:
- real authentication and social login
- PostgreSQL API and tenant authorization
- server-side tax engine
- immutable invoice service
- inventory ledger transactions
- returns/refunds
- import validation and migration
- invoice PDF/print/WhatsApp/email/SMS delivery
- subscriptions and entitlements
- audit pipeline
- backups and recovery
- observability
- offline sync if enabled
- India compliance implementation
- automated tests and deployment

## Design tokens
The working visual baseline uses the existing Puravigal blue/pink gradient. Replace the CSS tokens when the final approved HD logo/gradient asset is supplied.

## Quality bar
No module is considered complete without loading, empty, validation, success, error, permission, duplicate, network, large-data and unsaved-change states where applicable.
