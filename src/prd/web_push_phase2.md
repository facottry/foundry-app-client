PRD — Web Push Notifications (Phase 2: Templates + Cron)
1. Objective

Enable scheduled, template-based push notifications using cron schedules stored in the database and managed via an Admin Dashboard UI, so notifications like:

“Top Products Launched Today”

are sent automatically every day at 9:00 AM, without manual triggering.

2. In Scope (Phase 2 Only)

✅ Push notification templates
✅ Cron-based scheduling (stored in DB)
✅ Admin Dashboard UI to:

Create / edit / enable / disable jobs

Attach templates to cron jobs
✅ Automatic execution via server-side scheduler
✅ Uses existing Phase 1 push delivery pipeline

3. Explicitly Out of Scope

❌ Advanced segmentation (topics, cohorts)
❌ A/B testing
❌ Monetization / sponsored push
❌ Delivery analytics dashboard
❌ Retry queues / failure replay
❌ Timezone personalization (single server TZ)

4. Core Concepts (Important)
4.1 Template

A reusable notification definition with placeholders.

4.2 Cron Job

A scheduled task that:

Runs at a defined cron time

Resolves template variables

Sends push to all active subscriptions

5. User Roles
Admin (Internal)

Manages templates

Manages cron jobs

Enables / disables jobs

No public user interaction in Phase 2.

6. Functional Requirements
FR-1: Notification Templates

Admin must be able to create reusable templates.

Template fields

Name (internal)

Title

Body

Click URL

Status (active / inactive)

Example
Name: Daily Top Products
Title: Top Products Launched Today
Body: {{count}} new products went live 🚀
URL: https://clicktory.in/today

FR-2: Cron Job Configuration (DB-Driven)

Admin must be able to create cron jobs via UI.

Cron Job fields

Name

Cron expression (e.g. 0 9 * * *)

Linked template

Enabled / Disabled

Last run timestamp

Next run timestamp

FR-3: Cron Execution Engine

Server must:

Poll DB for enabled cron jobs

Execute jobs at scheduled time

Use template to build payload

Send push using Phase-1 pipeline

Cron execution must not depend on Admin UI being open

FR-4: Template Variable Resolution (Minimal)

Phase 2 supports basic dynamic variables only.

Allowed:

{{date}}

{{count}} (optional, server-calculated)

{{day}}

No complex logic in Phase 2.

FR-5: Admin Dashboard UI

Admin UI must allow:

Templates

Create

Edit

Disable

View list

Cron Jobs

Create

Edit cron expression

Attach template

Enable / disable job

View last run time

No analytics UI required.

7. Non-Functional Requirements

Cron engine must survive server restart

If one job fails, others must continue

No duplicate execution for same schedule window

Server timezone is authoritative

8. Technical Architecture
8.1 High-Level Flow
Admin Dashboard
 ├─ Creates Template
 ├─ Creates Cron Job (0 9 * * *)
 └─ Saves to DB

Server Scheduler
 ├─ Reads enabled cron jobs
 ├─ Triggers at scheduled time
 ├─ Resolves template
 └─ Sends push via Phase 1

9. Data Models (Phase 2)
9.1 Collection: push_templates
{
  "_id": "ObjectId",
  "name": "Daily Top Products",
  "title": "Top Products Launched Today",
  "body": "{{count}} new launches today 🚀",
  "url": "https://clicktory.in/today",
  "isActive": true,
  "createdAt": "ISODate"
}

9.2 Collection: push_cron_jobs
{
  "_id": "ObjectId",
  "name": "Daily 9 AM Push",
  "cron": "0 9 * * *",
  "templateId": "ObjectId",
  "isEnabled": true,
  "lastRunAt": "ISODate",
  "nextRunAt": "ISODate",
  "createdAt": "ISODate"
}

10. Backend APIs
POST /api/admin/templates

Create / update template

POST /api/admin/cron-jobs

Create / update cron job

POST /internal/cron/execute

Internal endpoint triggered by scheduler
(Not public, not UI-accessible)

11. Cron Engine Rules

Use a single scheduler instance

Lock job execution per minute

Skip execution if lastRunAt already matches window

Log execution success / failure

12. Failure Handling

If template missing → job skipped + logged

If push send fails → log only (no retry in Phase 2)

If cron expression invalid → job auto-disabled

13. Acceptance Criteria

✅ Admin can create template
✅ Admin can create cron job with 0 9 * * *
✅ Push is sent daily at 9:00 AM automatically
✅ Works without Admin UI open
✅ Uses Phase-1 push infrastructure
✅ No duplicate sends

14. Phase 2 Definition of Done

Templates stored in DB

Cron jobs stored in DB

Scheduler running reliably

Daily push verified on real browser

Admin UI functional

15. Final Instruction for AI Agent

Implement only Phase 2 on top of existing Phase 1.
Do not add segmentation, analytics, retries, or monetization.
Cron schedule must be DB-driven and editable via Admin UI.
Daily 9:00 AM push must work without manual intervention.