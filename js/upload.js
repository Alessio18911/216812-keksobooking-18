'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

  function uploadAvatar() {
    var avatarImg = document.querySelector('.ad-form-header__preview img');
    var avatarFileChooser = document.querySelector('#avatar');

    avatarFileChooser.addEventListener('change', function () {
      var files = Array.from(avatarFileChooser.files);
      var matchedFiles = files.filter(filterUploadedFiles);

      createReader(avatarImg, matchedFiles[0]);
    });
  }

  function createLocationImages(filesArray, listContainer) {
    var template = document.querySelector('#photo').content;
    var documentFragment = document.createDocumentFragment();

    filesArray.forEach(function (file) {
      var adPhoto = template.cloneNode(true);
      var photo = adPhoto.querySelector('img');

      createReader(photo, file);

      documentFragment.appendChild(adPhoto);
    });

    listContainer.appendChild(documentFragment);
  }

  function uploadLocationPhotos() {
    var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
    var fileChooser = adFormPhotoContainer.querySelector('#images');
    var dummy = adFormPhotoContainer.querySelector('.ad-form__photo');

    fileChooser.addEventListener('change', function () {
      var uploadedFiles = Array.from(fileChooser.files);
      var matchedFiles = uploadedFiles.filter(filterUploadedFiles);

      if (matchedFiles.length) {
        if (fileChooser.matches('#images')) {
          createLocationImages(matchedFiles, adFormPhotoContainer);
          dummy.remove();
        }
      }
    });
  }

  uploadLocationPhotos();
  uploadAvatar();
})();
