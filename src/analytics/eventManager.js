import { EVENT_CLASSIFICATION } from "./eventClassification";
import { sendToGA } from "./gaAdapter";

/**
 * Central Event Manager allow-list and routing logic.
 * 
 * @param {Object} event - The raw event to emit
 * @param {string} event.name - Event name (e.g. 'product_viewed')
 * @param {string} event.category - Event category
 * @param {Object} [event.actor] - Who performed the action
 * @param {Object} [event.object] - What was acted upon
 * @param {Object} [event.properties] - Additional context
 */
export function emitEvent(event) {
    try {
        // 1. Validate / Normalize (Basic check)
        if (!event || !event.name) {
            console.warn("[EventManager] Dropped invalid event:", event);
            return;
        }

        const canonicalEvent = {
            ...event,
            occurredAt: event.occurredAt || new Date().toISOString()
        };

        // 2. Classify
        const rule = EVENT_CLASSIFICATION[canonicalEvent.name];

        if (!rule) {
            // Unknown event -> Drop it to prevent pollution
            console.log(`[EventManager] Dropped unclassified event: ${canonicalEvent.name}`);
            return;
        }

        console.log(`[EventManager] Processing event: ${canonicalEvent.name}`, canonicalEvent);

        // 3. Dispatch to GA (Tier 2)
        if (rule.ga) {
            sendToGA(canonicalEvent);
        }

        // 4. Dispatch to Internal Analytics (Tier 1) - Future Placeholder
        if (rule.analytics) {
            // persistExample(canonicalEvent);
        }

    } catch (err) {
        // Fail-safe: Analytics errors must NEVER crash the application
        console.error("[EventManager] Error dispatching event:", err);
    }
}
