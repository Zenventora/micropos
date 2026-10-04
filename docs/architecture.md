# Puravigal POS Engineering Foundation

## Core rule
Scope = Micro. Quality = Professional.

## Architecture
Web and future mobile clients -> versioned API -> authentication and tenant boundary -> domain services -> PostgreSQL.

Core domains:
- identity, sessions and social login
- organizations, stores, users, roles and permissions
- business and regional configuration
- catalog
- inventory ledger
- sales, invoices, payments, returns and refunds
- purchases, supplier payments and returns
- customers and suppliers
- reports and analytics
- invoice delivery
- plans and entitlements
- imports and exports
- audit
- notifications and background jobs

## Non-negotiable data rules
1. Every tenant-owned query is scoped by organization membership.
2. Money is persisted as decimal/numeric plus ISO currency code.
3. Inventory is ledger based and every movement has a reason and reference.
4. Finalized invoices are immutable financial records.
5. Historical transactions retain the tax context used at transaction time.
6. Server authorization is the security boundary; frontend checks are only UX.
7. Import and export are first-class data portability features.

## Regional strategy
India-first implementation, globally extensible core. Country, state, currency, timezone, tax, invoice rules and compliance adapters stay separate from the common POS core.

## Vertical strategy
Vertical configuration is independent from region. Example: India + Mobile Shop and UAE + Restaurant share the core but use different vertical and localization modules.

## Offline direction
If offline billing is enabled for production, every device transaction needs a device id, idempotency key, local sequence/version, sync queue and deterministic conflict/reconciliation rules.

## Security baseline
HTTPS, password hashing, secure sessions, rate limiting, validation, secure file uploads, tenant isolation, least privilege, audit logging, CSRF protection where applicable and recovery controls.

## Current repository state
The static workspace is a functional browser prototype using localStorage. It is not a production cloud backend. The database schema here is the production-domain foundation that will back the API implementation.
