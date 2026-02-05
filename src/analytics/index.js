// Public facade for the analytics module
// This is the only file the rest of the application should import from.

import { emitEvent } from "./eventManager";

export default {
    emitEvent
};

export { emitEvent };
