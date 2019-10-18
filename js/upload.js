'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        avatarImg.src = evt.target.result;
      });

      reader.readAsDataURL(matchedFiles[0]);
    });
  }

  function uploadLocationPhotos() {
    var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
    var fileChooser = adFormPhotoContainer.querySelector('#images');
    var dummy = adFormPhotoContainer.querySelector('.ad-form__photo');

    fileChooser.addEventListener('change', function () {
      var uploadedFiles = Array.from(fileChooser.files);
      var matchedFiles = uploadedFiles.filter(filterUploadedFiles);

      function onReaderLoad(evt) {
        var template = document.querySelector('#photo').content;
        var adPhoto = template.cloneNode(true);
        var photo = adPhoto.querySelector('img');
        photo.src = evt.target.result;
        documentFragment.appendChild(adPhoto);
      }

      if (matchedFiles.length) {
        var documentFragment = document.createDocumentFragment();

        matchedFiles.forEach(function (file) {
          var reader = new FileReader();
          reader.addEventListener('load', onReaderLoad);
          reader.readAsDataURL(file);
        });

        adFormPhotoContainer.appendChild(documentFragment);
        dummy.remove();
      }
    });
  }

  uploadLocationPhotos();
  uploadAvatar();
})();
