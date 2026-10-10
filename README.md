# DBH Agent Portal

Agent-only portal for **D Banjus Homes Nig Ltd (DBH)**.

## Purpose

This repository contains the agent-side experience for the DBH multi-agent property marketplace. It is kept separate from the public customer website so agent permissions, workflows, and dashboard features can be developed independently.

## Agent workflow

1. Agent submits an application.
2. Agent verifies their email with an OTP.
3. Agent provides a WhatsApp number.
4. DBH contacts the submitted WhatsApp number.
5. Agent submits required identity/business documents.
6. Application remains **Pending Admin Review**.
7. DBH administrator approves, rejects, requests more information, or suspends the agent.
8. Approved agents receive access to the agent dashboard.
9. Agents submit properties for DBH review.
10. Only approved/public properties are published to the marketplace.
11. Agents manage their own properties, enquiries, notifications, and applicable payments.

## Dashboard

The dashboard is designed with a clean DBH white-and-blue interface and a responsive sidebar containing:

- Overview
- My Properties
- Add Property
- Customer Enquiries
- Payments
- Verification
- Notifications
- Settings

The interface is intended to use recognizable UI icons rather than text-only symbols, with accessible labels/tooltips for important actions.

## Social account connections

The agent settings page lists the currently available provider options (X/Twitter, GitHub, and GitLab) and clearly marks Instagram, Facebook, TikTok, and LinkedIn as unavailable for now. Public profile URLs and authenticated account connections are different data and must never be presented as interchangeable.

**Current implementation status:** the frontend connection options are present, but a secure provider account-linking callback is still required before any connection may be marked as connected. Do not set connected status from browser input or from a generic OAuth sign-in. A production integration must preserve the signed-in DBH user, validate OAuth state, exchange tokens on the server, bind the returned provider account ID to that DBH agent, store provider tokens securely server-side, and provide a disconnect/revoke flow. OAuth login alone can switch the Supabase-authenticated identity and is not proof that a social account has been linked to the existing agent.

Social account connection is optional and must not block agent registration, fee payment, or admin verification. Website URL entry is optional and does not imply website ownership verification. Automatic social-content import is a separate capability that requires platform permissions, API access, appropriate scopes, and a safe server-side synchronization job. No frontend-only implementation should claim automatic content display is operational.

## Verification

The agent area is designed around these statuses:

- **Pending Verification**
- **Approved / Verified**
- **Rejected**
- **More Information Required**
- **Suspended**

Verification is separate from payment and property approval.

### Email OTP

Agent email verification uses an OTP before the application can proceed.

### WhatsApp

The agent submits a WhatsApp number and DBH can send a message to that number. Sending the message does **not** automatically approve the agent; final approval remains an administrator decision.

### Documents

The final required document list is controlled by DBH. The portal is designed to support identity documents and, where applicable, business registration documents.

## Property management

Agents can submit:

- Property title
- Property type
- Sale/listing information
- Price and currency
- State, city, area and address
- Bedrooms and bathrooms
- Property size
- Description and features
- Images
- Relevant documents
- Property code

Agent submissions remain pending until DBH reviews them.

Each property is associated with its owning agent. Agents must never be able to access or modify another agent's private records.

## Customer enquiries

Approved agents can receive enquiries associated with their properties. Public listings can expose the contact methods approved by DBH, including phone and WhatsApp where enabled.

## Payments

The payment provider is **Flutterwave**. The current agent registration checkout is connected to Flutterwave **v4 Sandbox/Test Mode** and uses the DBH-controlled registration fee from `agent_settings`.

Payment status is separate from agent approval. A successful payment must not automatically approve an agent.

The current registration fee is **$50 USD**. Payment is separate from verification and admin approval. The payment Edge Function uses `FLW_CLIENT_ID`, `FLW_CLIENT_SECRET`, and `FLW_ENCRYPTION_KEY` as server-side secrets. The webhook function is `dbh-flutterwave-webhook`; configure a Flutterwave webhook secret hash as `FLW_SECRET_HASH` before relying on webhook updates. Test mode uses Flutterwave's sandbox environment; switch to production credentials/endpoints only after DBH is ready for live payments.

## Account enforcement

Temporary payment failures should be handled with appropriate reminders/grace periods rather than immediate permanent deletion.

For confirmed policy violations or unresolved obligations, DBH administrators can restrict an agent, prevent new uploads, unpublish properties, suspend the account, and record the reason.

## SEO relationship

The agent portal does not replace the public DBH website.

Approved/public properties can be exposed by the main DBH website as crawlable property pages with appropriate SEO metadata, structured data, sitemap inclusion, and optimized images.

Pending, rejected, private, or restricted properties should not be publicly indexed.

## Smart search

The public DBH website can use an AI-assisted search layer to understand natural-language property searches. If AI is unavailable, the site should fall back to database filtering and similar-property recommendations.

## Security principles

- Role-based access for agents.
- Agents can manage only their own records.
- Server-side authorization must enforce ownership.
- Sensitive identity documents must not be publicly exposed.
- Payment confirmation must be verified server-side/webhook.
- Admin actions should be auditable.
- Agent suspension can restrict associated properties without deleting historical records.

## Development note

This repository is the **agent portal only**. Customer-facing DBH pages, the main marketplace, and the administrator portal remain separate systems.

Before production activation, connect the portal to the approved DBH authentication, database, notification, WhatsApp provider, document storage, and Flutterwave server-side payment/webhook configuration. Never place private API keys or service-role credentials in browser code.
