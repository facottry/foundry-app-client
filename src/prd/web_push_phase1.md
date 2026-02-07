PRD — Web Push Notifications (Phase 1)
1. Objective

Enable browser push notifications for users who have visited the website once or twice and explicitly allowed notifications, so that the platform can send notifications even when the website is not open or running, e.g.:

“Top Products Launched This Week”

2. In-Scope (Phase 1 Only)

✅ Browser-based Web Push Notifications
✅ Works when:

Website tab is closed

User is on another site

Browser is running in background

✅ Manual or API-triggered push from server
✅ Chrome + Firefox desktop support
✅ Stateless UI (no dashboard required)

3. Out of Scope (Explicitly NOT in Phase 1)

❌ No segmentation
❌ No scheduling UI
❌ No analytics dashboard
❌ No retries / batching
❌ No topic preferences
❌ No monetization
❌ No iOS Safari optimization
❌ No Firebase Console UI

4. User Flow
4.1 Permission Flow

User visits website

Sees single, non-intrusive CTA:

“Get weekly top product launches”

User clicks Allow

Browser permission modal appears

If accepted → subscription is created

Subscription is sent to backend and stored

5. Functional Requirements
FR-1: Permission Request

Must only trigger after user interaction

Must not auto-trigger on page load

FR-2: Service Worker Registration

A single Service Worker at /sw.js

Must persist across sessions

FR-3: Push Subscription

Use Push API

Must generate a valid subscription object:

endpoint

keys.p256dh

keys.auth

FR-4: Subscription Storage

Backend must store subscription payload

No deduplication logic required in Phase 1

FR-5: Push Sending

Backend must expose API to send push

Payload supports:

title

body

click URL

FR-6: Notification Click

Clicking notification must open target URL in new tab

6. Non-Functional Requirements

Notifications must comply with browser policy:

userVisibleOnly = true

Service Worker must not crash on malformed payload

Push send failure must not crash server

7. Technical Architecture
7.1 High-Level Flow
Browser
 ├─ Permission Granted
 ├─ Service Worker Registered
 ├─ Push Subscription Created
 └─ Subscription POSTed to Server

Server
 ├─ Stores Subscription
 └─ Sends Push via Web Push Protocol

8. Frontend Requirements
8.1 Browser Support

Chrome Desktop (mandatory)

Firefox Desktop (mandatory)

8.2 Service Worker

Location: /public/sw.js

Responsibilities:

Listen for push

Show notification

Handle click

8.3 Notification Payload Schema
{
  "title": "string",
  "body": "string",
  "url": "string"
}

9. Backend Requirements
9.1 APIs
POST /api/push/subscribe

Stores push subscription

Request Body

{
  "endpoint": "string",
  "keys": {
    "p256dh": "string",
    "auth": "string"
  }
}


Response

{ "status": "ok" }

POST /api/push/send

Sends notification to all stored subscriptions

Request Body

{
  "title": "Top Products Launched This Week",
  "body": "5 new launches you should see",
  "url": "https://clicktory.in/top-products"
}

9.2 VAPID

Generate VAPID public/private key pair

Public key exposed to frontend

Private key stays server-side

10. Data Storage (Phase 1 Minimal)
Collection: push_subscriptions
{
  "_id": "ObjectId",
  "endpoint": "string",
  "keys": {
    "p256dh": "string",
    "auth": "string"
  },
  "createdAt": "ISODate"
}


No indexing required in Phase 1.

11. Security Constraints

Do NOT expose VAPID private key

Accept subscriptions only via HTTPS

No authentication required (Phase 1)

12. Failure Handling

If push fails:

Log error

Do NOT delete subscription

If notification payload is invalid:

Ignore and continue

13. Acceptance Criteria

✅ User can allow notifications once
✅ User receives notification when site is closed
✅ Clicking notification opens correct URL
✅ Server can send notification manually via API
✅ No UI or dashboard dependency

14. Phase 1 Definition of Done

Service Worker deployed

Subscription stored successfully

Push delivered on Chrome desktop

End-to-end tested with real browser

15. Final Instruction for AI Agent (Execution Mode)

Build only Phase 1 as specified above.
Do not add segmentation, scheduling, analytics, or monetization.
Assume Node.js backend, MongoDB storage, static frontend.
Prioritize correctness over optimization.