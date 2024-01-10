// GA4 Event Tracking helper function
export const cymPortalEventsGA = (eventName, eventDetail) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'CymCommunityEvent',
      cymCommunityEventName: eventName,
      cymCommunityEventMeta: eventDetail,
      cymEventCategory: 'CymCommunity',
    });
  }
};
