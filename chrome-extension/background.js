window.onload = function() {
    chrome.extension.onConnect.addListener(function(port) {
        console.assert(port.name == "grove-notification");
        port.onMessage.addListener(function(msg) {
            // Show desktop notification
            var notification = webkitNotifications.createNotification(
                msg.icon,
                msg.title,
                msg.body
            );
            notification.show();
            notification.ondisplay = function() {
                setTimeout(function(){notification.cancel()}, 4000);
            }
        });
    });
};
