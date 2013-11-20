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
            notification.ondisplay = function() {
                setTimeout(function(){notification.cancel()}, 4000);
            };
            notification.onclick = function() {
                chrome.tabs.query({ url: '*://grove.io/app/*' }, function(tabs) {
                    chrome.tabs.update(tabs[0].id, { highlighted: true }, function() {
                        // tab updated. :)
                    });
                });
            };
            notification.show();
        });
    });
};
