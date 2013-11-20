// http://code.google.com/chrome/extensions/content_scripts.html#host-page-communication
// http://code.google.com/chrome/extensions/messaging.html#connect
var port = chrome.extension.connect({name: "grove-notification"});

document.getElementById('groveNotificationEventDiv').addEventListener('groveNotificationEvent', function() {
    var eventData = document.getElementById('groveNotificationEventDiv').innerText;
    port.postMessage(JSON.parse(eventData));
});

/* Drag and drop */
window.ondragover = function(e) {
    e.preventDefault();
};

window.ondrop = function(e) {
    e.preventDefault();
    upload(e.dataTransfer.files[0]);
};

function upload(file) {
    var imageLink ="";
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;
    document.body.className = "uploading";
    var fd = new FormData();
    fd.append("image", file); // Append the file
    // Note: I can't find how to get a key that works, only OAuth2 id and secret...
    fd.append("key", "6528448c258cff474ca9701c5bab6927"); // Get your own key http://api.imgur.com/
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://api.imgur.com/2/upload.json");
    xhr.onload = function() {
        var link = JSON.parse(xhr.responseText).upload.links.imgur_page;
        var imageLink = ""+link.replace("http://imgur.com/", "http://i.imgur.com/")+".jpg";

        var messageField = document.getElementsByClassName('message-field')[0];
        messageField.value = messageField.value + ' ' + imageLink;

        /* Image Preview */
        //document.getElementById("result").style.display = "inline";
        //document.getElementById("link-to-image").style.background = "url(" + imageLink + ") center center no-repeat";

        document.body.className = "uploaded";
    };

    /* Send the formdata */
    xhr.send(fd);
};