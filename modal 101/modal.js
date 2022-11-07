(function() {
  
    "use strict";
    
    // Modal window iframe (map) version 1.0 05-04-2016
  
    // Assumption:
    //    First object in modal is the modal title
    //    Last object is the modal close button
    // Therefore to keep tab control inside modal:
    //    listen for tab keypress on close button
    //    listen for shift-tab keypress on title
    // Always listen for the ESC key.
    
    // To do: 
    //    Window resize.
    //    Externalise hard coded attribute values.
    //    Allow multiple instances.
  
    var content = document.getElementById("content");
    var btn_map_open = document.getElementById("btn_map_open");
    var modalDiv;
    var lightboxDiv;
    var modal_title;
    var btn_modal_close;
    var iframeSrc;
  
    var _closeModal = function() {
      var modal_map = document.getElementById("modal_map");
      var lightbox = document.getElementById("lightbox");
      if (modal_map) {
        modal_map.setAttribute("aria-hidden", "true");
        lightbox.className = lightbox.className.replace(" ON", "");
        content.setAttribute("aria-hidden", "false");
        // move focus back to initialising button
        btn_map_open.focus();
      }
    };
  
    var _createiframe = function(image, modalHeight) {
      var iframe = document.createElement("iframe");
      if (image) {
        iframe.id = "mapFrame";
        iframe.src = image.getAttribute("data-iframesrc");
        // iframe.src = image.src;
        iframe.width = image.offsetWidth;
        iframe.height = modalHeight;
        iframe.setAttribute("frameborder", 0);
        iframe.setAttribute("allowfullscreen", true);
      }
      return iframe;
    };
  
    var _modal_title_keypressed = function(e) {
      // if tab key and shift
      if (e.which === 9 && e.shiftKey) {
        e.preventDefault();
        //focus on last object in modal
        btn_modal_close.focus();
      }
    };
  
    var _keypressed = function(e) {
      // only if ESC pressed
      if (e.which === 27) {
        _closeModal();
      }
    };
  
    var _displayModal = function () {
      var modal_map = document.getElementById("modal_map");
      var image = document.getElementById("img2iframe");
      var modalHeight = modal_map.offsetHeight;
  
      if (image) {
        if (modalHeight > image.offsetHeight) {
          modalHeight = image.offsetHeight;
        }
        modal_map.style.maxHeight = modalHeight + "px";
        modal_map.replaceChild(_createiframe(image, modalHeight), image);
        // ESC key check
        modal_map.addEventListener("keydown", _keypressed, false);
      }
    };
  
    var _openModal = function(e) {
  
      e.preventDefault();
  
      var modal_map = document.getElementById("modal_map");
      var lightbox = document.getElementById("lightbox");
  
      if (modal_map && lightbox) {
        if (!lightbox.className.match(" ON")) {
          lightbox.className += " ON";
        }
        modal_map.setAttribute("aria-hidden", "false");
        window.requestAnimationFrame(_displayModal);
        content.setAttribute("aria-hidden", "true");
        modal_title = document.getElementById("modal_title");
        if (modal_title) {
          modal_title.addEventListener("keydown", _modal_title_keypressed, false);
          // move focus to the modal h1
          modal_title.focus();
        }
      }
    };
  
    var _getModalHTML = function() {
      var str;
      var img_map = document.getElementById("img_map");
      str = "<h1 tabindex=0 id=modal_title class=modal-title>Tesco Bags of Help projects interactive map</h1>";
      str += "<div id=modal_desc class=modal-desc>Esc key to leave, tab &amp; shift-tab to move focus.</div>";
      str += "<img id=img2iframe data-iframesrc=\"";
      str += iframeSrc;
      str += "\" class=img-map src=\"" + img_map.src + "\" alt=\"Interactive map\">";
      str += "<button id=btn_modal_close class=\"btn btn-modalClose\"><span>Close</span>";
      // SVG not checked in IE
      str += '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M311.1,250.2L487.2,74c16.9-16.9,16.9-44.2,0-61.1C470.3-3.9,443-3.9,426.1,13L250,189.1L73.9,13C57-3.9,29.7-3.9,12.8,13s-16.8,44.2,0,61l176.1,176.1L12.8,426.3c-16.9,16.9-16.9,44.2,0,61.1c8.4,8.4,19.5,12.6,30.5,12.6s22.1-4.2,30.5-12.6L250,311.2l176.1,176.1c8.4,8.4,19.5,12.6,30.5,12.6s22.1-4.2,30.5-12.6c16.9-16.9,16.9-44.2,0-61.1L311.1,250.2z"></path></svg>';
      str += "</button>";
      return str;
    };
  
    var _addModalBlock = function() {
      modalDiv = document.createElement("div");
      modalDiv.id = "modal_map";
      modalDiv.className = "modal-map"
      modalDiv.setAttribute("aria-hidden", "true");
      modalDiv.setAttribute("aria-labelledby", "modal_title");
      modalDiv.setAttribute("aria-describedby", "modal_desc");
      modalDiv.setAttribute("role", "dialog");
      modalDiv.innerHTML = _getModalHTML();
      document.body.appendChild(modalDiv);
    };
  
    var _btn_modal_close_keypressed = function(e) {
      // if tab key and not shift
      if (e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        //focus on first object in modal
        modal_title.focus();
      }
    };
  
    var _addModalCloseBtn = function() {
      btn_modal_close = document.getElementById("btn_modal_close");
      if (btn_modal_close) {
        btn_modal_close.addEventListener("click", _closeModal, false);
        btn_modal_close.addEventListener("keydown", _btn_modal_close_keypressed, false);
      }
    };
  
    var _addLightbox = function() {
      lightboxDiv = document.createElement("div");
      lightboxDiv.id = "lightbox";
      lightboxDiv.className = "lightbox";
      // optional - should not be able to reach this via keyboard
      lightboxDiv.setAttribute("tabindex", "0");
      document.body.appendChild(lightboxDiv);
      // mouse / touch only
      lightboxDiv.addEventListener("click", _closeModal, false);
    };
  
    if (content && btn_map_open) {
      iframeSrc = btn_map_open.getAttribute("data-iframesrc");
      if (iframeSrc) {
        _addModalBlock();
        _addModalCloseBtn();
        _addLightbox();
        btn_map_open.addEventListener("click", _openModal, false);
      }
    }
  
  })();