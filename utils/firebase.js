/**
 * Sends a Firebase Screen View event to log user navigation or screen interaction.
 *
 * @param {String} groupId - The unique identifier for the group associated with the event.
 * @param {String} screenId - The unique identifier of the screen being viewed.
 * @param {Function} callback - Callback if necessary.
 * 
 * @description
 * This function is used to send screen view events to Firebase, which helps track user interactions 
 * and navigation across different screens in the application.
 * 
 * The `groupId` can represent a category or organization identifier, while the `screenId` uniquely identifies 
 * the screen being tracked.
 *
 * @example
 * // Example usage:
 * firebaseScreenView("pfm", "homeScreen");
 */
export function firebaseScreenView(groupId, screenId, callback = ()=>{}) {
  my.call("firebaseScreenView", {
    GroupId: groupId,
    ScreenId: screenId
  },callback);
}

/**
 * Sends a Firebase Event with the specified group ID and event details.
 *
 * @param {String} groupId - The unique identifier for the group.
 * @param {Any} event - An array of event objects to send.
 * @param {String} event.name - Get from "Type".
 * @param {String} event.value - Get from "Event Name".
 * @param {Function} callback - Callback if necessary.
 * 
 * @example
 * // Example usage with multiple event objects:
 * firebaseEvent("pfm", [
 *   { name: "buttonClick", value: "submit" },
 *   { name: "pageView", value: "home" }
 * ]);
 */
export function firebaseEvent(groupId, events, callback = ()=>{}) {
  const arryaOfEvents = Array.isArray(events) ? events : [events];
  const eventData = JSON.stringify({
    groupId,
    event: arryaOfEvents
  })

  my.call("firebaseEvent", { data:eventData },callback);
}