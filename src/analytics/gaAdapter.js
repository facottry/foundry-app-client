/**
 * GA Adapter
 * 
 * Responsible for pushing normalized events to the GTM dataLayer.
 * It does NOT decide what to push (EventManager does that).
 * It ONLY handles the mechanics of the push.
 */

/**
 * Pushes a canonical event to the window.dataLayer
 * @param {Object} event - The canonical event object
 */
export function sendToGA(event) {
    if (!window.dataLayer) {
        console.warn("[GAAdapter] GTM dataLayer missing. Is GTM loaded?");
        return;
    }

    console.log("[GAAdapter] Pushing to dataLayer:", event.name);

    // Flattens the payload for GTM consumption
    window.dataLayer.push({
        event: event.name,                // Standard GTM 'event' field
        event_category: event.category,

        // Actor details (safe only, NO PII)
        actor_type: event.actor?.type,
        actor_id: event.actor?.id,

        // Object details
        object_type: event.object?.type,
        object_id: event.object?.id,

        // Custom properties spread at root level for easier GTM variables
        ...(event.properties || {}),

        // Timestamp mainly for debugging/ordering if needed, though GA has its own
        occurred_at: event.occurredAt
    });
}
