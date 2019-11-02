'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarImg = document.querySelector('.ad-form-header__preview img');
  var avatarImgSrc = 'img/muffin-grey.svg';
  var avatarFileChooser = document.querySelector('#avatar');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var fileChooser = adFormPhotoContainer.querySelector('#images');
  var dummy = adFormPhotoContainer.querySelector('.ad-form__photo');

  function clearPreviews(chooser, elemsId, gag) {
    chooser.value = '';

    if (gag) {
      document.querySelectorAll(elemsId).forEach(function (preview) {
        preview.remove();
      });

      adFormPhotoContainer.appendChild(dummy);
    } else {
      avatarImg.src = avatarImgSrc;
    }
  }

  function filterUploadedFiles(file) {
    return FILE_TYPES.some(function (ext) {
      return file.name.toLowerCase().endsWith(ext);
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
    adPhoto.querySelector('img').src = src;
    adFormPhotoContainer.appendChild(adPhoto);

    if (dummy) {
      dummy.remove();
    }
  }

  function onAvatarFileChooserChange(evt) {
    uploadFiles(evt.target.files, uploadAvatar);
  }

  function onFileChooserChange(evt) {
    uploadFiles(evt.target.files, uploadLocationPhotos);
  }

  avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
  fileChooser.addEventListener('change', onFileChooserChange);

  window.upload = {
    avatarImg: avatarImg,
    avatarImgSrc: avatarImgSrc,
    avatarFileChooser: avatarFileChooser,
    fileChooser: fileChooser,
    adFormPhotoContainer: adFormPhotoContainer,
    dummy: dummy,
    clearPreviews: clearPreviews
  };
})();
