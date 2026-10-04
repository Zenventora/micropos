# Puravigal POS — Master Development Specification

## 1. Purpose
This repository is now the product repository for **Puravigal POS (Micro POS)**. The previous static Puravigal website is retired from this repository.

**Product principle: Scope = Micro. Quality = Professional.**

The application is mobile-first, React-based, cloud-ready, multi-tenant, India-first and globally extensible. Future native mobile clients will use React Native against the same API/domain model.

## 2. Reference captured before reset
The retired site was used only as visual/brand reference:
- Puravigal logo and icon variants.
- Existing blue/pink visual direction and gradient language.
- Existing image/OG/fav assets.
- Existing typography/layout inspiration.
- Existing static HTML/CSS/JS/Sass implementation is retired and must not be reused as application architecture.
- Provisional colors observed: Primary #235BDE and Accent #E60063. Final brand assets override these values.

## 3. Product scope
Authentication; business/organization setup; country/region/currency/timezone/locale; users/roles/permissions; products/categories/catalog; customers/suppliers; billing; payments; tax; invoices/delivery; inventory; purchases/returns; sales returns/refunds; dashboard/reports; import/export; subscriptions; notifications; audit; settings; security; tenant isolation; data integrity.

Architecture-ready/future: multi-store, vertical modules, offline sync, advanced payment/printer integrations, batch/expiry/serial/IMEI, restaurant tables/KDS, React Native Android/iOS, additional country compliance.

## 4. End-to-end flow
Sign up/Login → Business setup → Country/region → Currency/tax/locale → Organization → Owner/Admin → Users/Roles → Dashboard → Products/Inventory/Purchases/Customers/Suppliers → Billing → Payment → Invoice → Print/Share/WhatsApp/Email/SMS → Reports/Analytics.

## 5. Architecture
React Web (mobile-first/PWA-ready) → API → Auth/Authorization → Domain services → Tax/Localization/Entitlement engines → PostgreSQL.
Future React Native Android/iOS clients use the same API/domain contracts.
Frontend layering: UI → hooks/state → domain/services → API.

## 6. UI/UX contract
Every screen must define normal, loading, empty, validation error, server error, permission denied, network failure, success, confirmation, unsaved changes, duplicate/conflict, session expiry and large-data states. Touch-first controls, readable typography, minimal typing, fast search, safe destructive actions and one-hand-friendly layouts are required.

## 7. Core business rules
- Strict organization/tenant isolation.
- Foreign keys, indexes and transactional consistency.
- Precise money arithmetic; never floating-point business calculations.
- Store currency code with monetary context.
- Preserve historical invoice/tax/pricing context.
- Inventory is driven by traceable stock movements.
- Audit important mutations.
- Unique invoice/reference numbers.
- Idempotency for retryable financial operations.
- Never silently lose user data.

## 8. Tax/localization
Tax is a jurisdiction/effective-date-aware engine, not billing hard-code. India is first implementation target; country adapters must keep the core extensible. Compliance claims require actual implementation and testing.

## 9. Roles
Initial roles: Owner/Admin, Manager, Cashier, Inventory Staff. Permissions cover billing, products, inventory, purchases, customers, suppliers, reports, settings and users.

## 10. Billing
Product → Cart → Discount → Tax → Total → Payment → Invoice → Inventory update → Customer history → Reporting. Support full/partial payments, payment status, configured payment methods, refunds and transaction history.

## 11. Inventory
Opening stock → Purchases/adjustments → Current stock → Sale → Reduction. Every movement records item, quantity, time, reason, user and reference. Support low-stock/out-of-stock and history.

## 12. Returns/refunds
Sale → full/partial return → refund/credit outcome → inventory adjustment → customer history → reporting. Preserve original sale reference and reason.

## 13. Import/export
CSV/Excel import: Upload → Detect → Map → Validate → Preview → Confirm → Import → Result/errors. Export products, customers, suppliers, sales, purchases, inventory and reports where applicable.

## 14. Invoice delivery
Invoice → print / WhatsApp / email / SMS / secure share link. Delivery failure must be visible and retryable without duplicating the financial transaction.

## 15. Security
HTTPS; strong password hashing; secure sessions/tokens; authorization on protected API paths; tenant isolation; validation; rate limiting; safe uploads; secret management; recovery protection; audit logs; XSS/SQLi/CSRF protections as applicable.

## 16. Testing
Every feature requires unit/domain, API, authorization, database/integrity, UI/component and end-to-end tests plus responsive/mobile and regression coverage. Financial/inventory flows require idempotency, concurrency and retry tests.

## 17. QA matrix
Chrome, Safari, Edge, Firefox where supported; representative phones/tablets and secondary desktop. Test slow network, offline/reconnect where enabled, expired sessions, duplicate taps/requests, invalid input, large datasets, permission bypass, failed payments, failed invoice delivery and import errors.

## 18. Development order
1. Reset/documentation
2. React/Vite foundation
3. Design system/app shell
4. Auth/session
5. Business onboarding
6. Organization/users/permissions
7. Catalog
8. Customers/suppliers
9. Inventory
10. Purchases
11. Billing/payments
12. Invoices/delivery
13. Returns/refunds
14. Dashboard/reports
15. Import/export
16. Plans/entitlements
17. Audit/security hardening
18. Offline/native readiness
19. Full QA/regression
20. Production release

## 19. Definition of done
A feature is complete only when happy path, UI states, validation, API contract, authorization, persistence, error handling, audit/data integrity and relevant automated/manual tests are covered.

## 20. Non-goals
Do not turn Micro POS into an enterprise ERP. Complexity must be justified by a real micro-business use case.

## 21. Living specification
Update this master document whenever a product/architecture decision changes, before implementing dependent work.
