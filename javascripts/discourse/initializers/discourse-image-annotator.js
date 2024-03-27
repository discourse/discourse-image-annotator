/* global markerjs2, cropro */

import getURL from "discourse-common/lib/get-url";
import { iconHTML } from "discourse-common/lib/icon-library";

export default {
  name: "discourse-image-annotator",

  initialize(container) {
    let loadingDataUri =
      "data:image/gif;base64,R0lGODlh4AEQAfftALy8vAAAABMTE0FBQcfHx8jIyO/v79ra2nBwcLu7u0BAQGpqamtra76+vhQUFOfn5wMDA9LS0rq6usPDw5WVlT4+Pnx8fDg4OC8vL3FxcSgoKF9fX4aGhgICAmRkZBISEgEBAd3d3YqKigYGBq+vr25ubj8/P9zc3KqqqhUVFXNzc8nJycvLy8bGxqOjo2xsbNnZ2RkZGRYWFkVFRQQEBGNjY+bm5m1tbUJCQrm5ucTExMXFxYKCgoGBgURERLe3t15eXq2trTo6OoWFhaysrLi4uDU1NSsrKxgYGHJycm9vbzw8PDk5ORoaGg0NDQUFBT09PSoqKkNDQ8rKyhcXF3V1dQ8PD9HR0YODg3R0dA4ODnd3dzQ0NEZGRjExMQsLC7a2thAQEL29vYSEhAgICNXV1cHBwQcHB3p6ektLS9PT0+7u7gkJCampqTAwMGVlZWJiYnl5eUlJSQwMDCkpKREREa6urrOzs6enp7W1tdTU1M/Pz7KysrCwsHZ2dpKSkpOTk3h4eC4uLtvb25eXl1ZWVrS0tN/f301NTVFRUe3t7R4eHjc3Nzs7O6urq2lpaXt7e4eHh9fX12BgYEhISKamprGxsRsbG1VVVV1dXVdXV39/f8zMzKWlpTMzMx8fH+np6dDQ0H19fYCAgEpKStbW1pSUlB0dHYmJiVpaWkdHRy0tLRwcHKSkpDY2NgoKClxcXFJSUqGhocDAwFBQUCIiIuvr6+Tk5DIyMiYmJoiIiI+Pj2hoaN7e3ujo6GZmZpqamuLi4ltbWyEhIYuLi+Dg4ExMTH5+fo6OjiAgIMLCwoyMjGFhYVNTU9jY2L+/vywsLOHh4ZiYmM3NzaCgoJaWlqioqGdnZ5mZmZCQkOXl5VlZWU5OTiUlJSQkJJubm1hYWJ6eniMjIycnJ09PT1RUVJGRkY2Njerq6p2dnfDw8JycnP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjEyOjE4ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzQgV2luZG93cyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMDktMDYtMjBUMTQ6NTk6MDcrMDI6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDA5LTA2LTIwVDE0OjU5OjA3KzAyOjAwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDA5LTA2LTIwVDE0OjU5OjA3KzAyOjAwIgogICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIvPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg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";
    const appEvents = container.lookup("service:app-events");

    //Display markerjs when image is clicked
    function showMarkerJs(img) {
      let mark = new markerjs2.MarkerArea(img);

      //Exec after marker's toolbar checkmark is clicked
      mark.settings.displayMode = "popup";
      mark.addRenderEventListener((dataUrl) => {
        if (mark.getState().markers.length > 0) {
          saveNewImg(img, dataUrl);
        }
      });
      mark.show();
    }

    function showCropro(img) {
      // create an instance of CropArea and pass the target image reference as a parameter
      let cropArea = new cropro.CropArea(img);

      cropArea.displayMode = "popup";
      cropArea.zoomToCropEnabled = false;

      // register an event listener for when user clicks OK/save in the CROPRO UI
      cropArea.addRenderEventListener((dataUrl) => {
        // we are setting the cropping result to replace our original image on the page
        // but you can set a different image or upload it to your server
        saveNewImg(img, dataUrl);
      });

      // finally, call the show() method and CROPRO UI opens
      cropArea.show();
    }

    function saveNewImg(img, dataUrl) {
      let editor = document.querySelector(
        "#reply-control textarea.d-editor-input"
      ).value;
      let imagesMarker = document.querySelectorAll(".d-editor-preview img");
      let oldImgUrl;
      let imageIndex;

      for (let i = 0; i < imagesMarker.length; i++) {
        if (imagesMarker[i] === img) {
          imageIndex = i;
          break;
        }
      }

      const regex = /(upload:\/\/)[^\)]*/g;
      const matches = editor.match(regex);

      oldImgUrl = matches[imageIndex];
      // if (validation) {
      img.src = loadingDataUri;

      //generating dataurl into blob
      dataUrl = dataUrl.split(",").pop();
      const byteChar = atob(dataUrl);
      const byteNum = new Array(byteChar.length);

      for (let i = 0; i < byteChar.length; i++) {
        byteNum[i] = byteChar.charCodeAt(i);
      }
      const byteArr = new Uint8Array(byteNum);
      const blob = new Blob([byteArr], { type: "img/png" });

      // upload
      const data = new FormData();
      data.append(
        "authenticity_token",
        document.querySelector('meta[name="csrf-token"]').content
      );
      data.append("file", blob, "png");
      data.append("type", "composer");

      fetch(getURL("/uploads.json"), {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((upload) => {
          //Replace old image url with modified image url in composer
          appEvents.trigger(
            "composer:replace-text",
            oldImgUrl,
            upload.short_url
          );
        });
      // }
    }

    // returns true if the element or one of its parents has the class classname
    function hasParentWithClass(element, classname) {
      if (!element.classList) {
        return false;
      }
      if (element.classList.contains(classname)) {
        return true;
      }
      return (
        element.parentNode && hasParentWithClass(element.parentNode, classname)
      );
    }

    //Exec when image is clicked
    document.addEventListener("click", function (e) {
      const img = e.target;
      if (
        img.tagName === "IMG" &&
        img.classList.contains("resizable") &&
        hasParentWithClass(img, "d-editor-preview")
      ) {
        e.preventDefault();
        const showingBtns = img.classList.contains("showing-annotation-btns");

        if (showingBtns) {
          removeControlsFromImage(img);
        } else {
          img.setAttribute("crossorigin", "anonymous");
          addControlsToImage(img);
          img.classList.add("showing-annotation-btns");
        }
      }
    });

    function addControlsToImage(image) {
      let btnContainer = document.createElement("div");
      btnContainer.classList.add("image-annotator-hovering-wrapper");
      let annotateBtn = document.createElement("BUTTON");
      let cropBtn = document.createElement("BUTTON");
      annotateBtn.innerHTML = iconHTML("pencil-alt");
      cropBtn.innerHTML = iconHTML("compress");
      annotateBtn.classList.add("image-annotator-hovering-button");
      cropBtn.classList.add("image-annotator-hovering-button");

      btnContainer.appendChild(annotateBtn);
      btnContainer.appendChild(cropBtn);
      image.parentNode.appendChild(btnContainer);

      annotateBtn.addEventListener("click", function () {
        showMarkerJs(image);
        removeControlsFromImage(image);
      });

      cropBtn.addEventListener("click", function () {
        showCropro(image);
        removeControlsFromImage(image);
      });

      const offsetTop = image.parentNode.classList.contains("image-wrapper")
        ? 10
        : image.parentNode.offsetTop;
      btnContainer.style.top = `${offsetTop}px`;

      return btnContainer;
    }

    function removeControlsFromImage(image) {
      image.classList.remove("showing-annotation-btns");
      let btnContainer = image.parentNode.querySelector(
        ".image-annotator-hovering-wrapper"
      );
      btnContainer.parentNode.removeChild(btnContainer);
    }
  },
};
