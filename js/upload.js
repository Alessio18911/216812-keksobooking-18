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

  function uploadFiles(files, cb) {
    var matchedFiles = Array.from(files).filter(filterUploadedFiles);

    function onReaderLoad(evt) {
      cb(evt.target.result);
    }

    if (matchedFiles) {
      matchedFiles.forEach(function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      });
    }
  }

  function uploadAvatar(src) {
    avatarImg.src = src;
  }

  function uploadLocationPhotos(src) {
    var template = document.querySelector('#photo').content;
    var adPhoto = template.cloneNode(true);
    var photo = adPhoto.querySelector('img');
    photo.src = src;
    adFormPhotoContainer.appendChild(adPhoto);

    if (dummy) {
      dummy.remove();
    }

    fileChooser.value = '';
  }

  function onAvatarFileChooserChange(evt) {
    uploadFiles(evt.target.files, uploadAvatar);
  }

  function onFileChooserChange(evt) {
    uploadFiles(evt.target.files, uploadLocationPhotos);
  }

  avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
  fileChooser.addEventListener('change', onFileChooserChange);
})();
