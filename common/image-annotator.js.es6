import { ajax } from 'discourse/lib/ajax';
import getURL from 'discourse-common/lib/get-url';


  export default function upload(imgBlob){
    const data = new FormData();
    data.append('authenticity_token', Discourse.Session.currentProp("csrfToken"))
    data.append('files[]', imgBlob, "img/png");
    data.append('type', "composer");

    fetch(getURL("/uploads.json"), {
        method: 'POST',
        body: data
    }).then(response => response.json()).then(upload=> {
        const url = window.location.origin + upload.short_url.replace("upload://", getURL('/uploads/short-url/'));
        this.appEvents.trigger(
            "composer:insert-text",
            `\n${url}\n`
          );
          this.sendAction("closeModal");
    });
}


