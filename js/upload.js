'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarImg = document.querySelector('.ad-form-header__preview img');
  var avatarFileChooser = document.querySelector('#avatar');

  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var fileChooser = adFormPhotoContainer.querySelector('#images');
  var dummy = adFormPhotoContainer.querySelector('.ad-form__photo');

  function filterUploadedFiles(file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (ext) {
      return fileName.endsWith(ext);
    });
  }

  function uploadAvatar() {
    avatarFileChooser.addEventListener('change', function () {
      var matchedFiles = Array.from(avatarFileChooser.files).files.filter(filterUploadedFiles);

      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        avatarImg.src = evt.target.result;
      });

      reader.readAsDataURL(matchedFiles[0]);
    });
  }

  function uploadLocationPhotos() {
    fileChooser.addEventListener('change', function () {
      var matchedFiles = Array.from(fileChooser.files).filter(filterUploadedFiles);

      function renderLocationPhotos(file) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          var template = document.querySelector('#photo').content;
          var adPhoto = template.cloneNode(true);
          var photo = adPhoto.querySelector('img');
          photo.src = evt.target.result;
          adFormPhotoContainer.appendChild(adPhoto);
        });

        reader.readAsDataURL(file);
      }

      if (matchedFiles.length) {
        dummy.remove();

        matchedFiles.forEach(function (file) {
          renderLocationPhotos(file);
        });

        fileChooser.value = '';
      }
    });
  }

  uploadLocationPhotos();
  uploadAvatar();
})();
