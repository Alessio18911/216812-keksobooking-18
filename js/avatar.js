'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var fileChooser = adFormPhotoContainer.querySelector('#images');
  var adFormPhotoDummy = adFormPhotoContainer.querySelector('.ad-form__photo');
  var avatarFileChooser = document.querySelector('#avatar');
  var avatarImg = document.querySelector('.ad-form-header__preview img');

  function createReader(img, file) {
    var reader = new FileReader();
    reader.addEventListener('load', function (evt) {
      img.src = evt.target.result;
    });

    reader.readAsDataURL(file);
  }

  function filterUploadedFiles(file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (ext) {
      return fileName.endsWith(ext);
    });
  }

  function createLocationImages(fileArray, tempHtml, container) {
    var template = document.querySelector(tempHtml).content;
    var documentFragment = document.createDocumentFragment();

    fileArray.forEach(function (file) {
      var adPhoto = template.cloneNode(true);
      var photo = adPhoto.querySelector('img');

      createReader(photo, file);

      documentFragment.appendChild(adPhoto);
    });

    container.appendChild(documentFragment);
  }

  function uploadPhotos(chooser, imageElem, tempHtml, container, dummy) {
    chooser.addEventListener('change', function () {
      var files = Array.from(chooser.files);
      var matchedFiles = files.filter(filterUploadedFiles);

      if (matchedFiles.length) {
        if (chooser.matches('#images')) {
          createLocationImages(matchedFiles, tempHtml, container);
          dummy.remove();
        }

        if (chooser.matches('#avatar')) {
          createReader(imageElem, matchedFiles[0]);
        }
      }
    });
  }

  uploadPhotos(fileChooser, null, '#photo', adFormPhotoContainer, adFormPhotoDummy);
  uploadPhotos(avatarFileChooser, avatarImg);
})();
