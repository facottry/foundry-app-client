Unsubscribe Flow Improvement – Friction + Feedback
Objective

Reduce accidental and impulse unsubscribes by:

Adding a 2-step confirmation

Emotionally slowing the user down

Redirecting energy toward feedback instead of exit

Still respecting user intent and compliance

Flow Overview (truth-first)

User clicks Unsubscribe

Intercept → Soft friction screen

Ask for feedback (primary action)

Require explicit second confirmation to unsubscribe

Process unsubscribe only after ACK

UX Rules (non-negotiable)

No guilt-tripping

No hiding unsubscribe

No dark patterns

Clear, honest language

User can still unsubscribe in ≤ 2 clicks

Step 1: Intercept Screen (Friction Layer)

Route

/unsubscribe


UI copy

Before you go — can you help us improve?

Subtext

We send emails to build useful things.
If something’s not working for you, tell us.

Primary CTA (highlighted)

“Give feedback (30 seconds)”

Secondary CTA (muted)

“Continue to unsubscribe”

Step 2: Feedback Capture (Preferred Path)

Route

/feedback


Form fields

Reason (radio)

Too many emails

Not relevant

Content quality

Already unsubscribed elsewhere

Other

Optional text area

Email (prefilled, read-only)

Primary CTA

“Send feedback”

Secondary CTA

“Unsubscribe anyway”

Step 3: Explicit Confirmation (Final Gate)

Trigger
Only when user chooses to unsubscribe after feedback OR skips feedback.

Copy (calm, respectful)

Are you sure you want to unsubscribe?

Subtext

You won’t receive updates from us anymore.

Buttons

Primary (destructive): “Yes, unsubscribe”

Secondary: “Keep me subscribed”

Backend / Routing Design
Routes
GET  /unsubscribe
GET  /feedback
POST /feedback        → internally calls Contact Us
POST /unsubscribe/confirm

Important rule

/feedback must reuse the Contact Us pipeline

Same DB

Same notification

Same admin inbox

Tag source = "unsubscribe_flow"

Data model (minimal)
Feedback {
  email: string
  reason: string
  message?: string
  source: "unsubscribe_flow"
  createdAt: Date
}

Compliance Notes

Unsubscribe must complete immediately after final confirmation

No additional steps after confirmation

Works from email clients and browsers

Clear success message:

You’ve been unsubscribed.

Copy tone guidelines

Human

Short sentences

Calm

No manipulation

No marketing voice

Success metrics (what this should improve)

Lower instant unsubscribes

Higher feedback submission rate

Better insight into churn reasons

Fewer rage-click exits

One-line build prompt (if tool prefers short)

Improve unsubscribe flow with a 2-step confirmation, soft friction, feedback-first UX, and a /feedback route that internally reuses the Contact Us pipeline. Respect compliance, avoid dark patterns, and keep unsubscribe ≤2 clicks.