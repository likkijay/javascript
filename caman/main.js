const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('filter-btn')) {
    switch (event.target.classList.value) {
      case 'filter-btn brightness-add btn btn-info':
        Caman('#canvas', img, function() {
          this.brightness(5).render();
        });
        break;
      case 'filter-btn brightness-remove btn btn-info':
        Caman('#canvas', img, function() {
          this.brightness(-5).render();
        });
        break;
      case 'filter-btn contrast-add btn btn-info':
        Caman('#canvas', img, function() {
          this.contrast(5).render();
        });
        break;
      case 'filter-btn contrast-remove btn btn-info':
        Caman('#canvas', img, function() {
          this.contrast(-5).render();
        });
        break;
      case 'filter-btn saturation-add btn btn-info':
        Caman('#canvas', img, function() {
          this.saturation(100).render();
        });
        break;
      case 'filter-btn saturation-remove btn btn-info':
        Caman('#canvas', img, function() {
          this.saturation(-100).render();
        });
        break;
      case 'filter-btn vibrance-add btn btn-info':
        Caman('#canvas', img, function() {
          this.vibrance(100).render();
        });
        break;
      case 'filter-btn vibrance-remove btn btn-info':
        Caman('#canvas', img, function() {
          this.vibrance(-100).render();
        });
        break;
      case 'filter-btn lomo-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.lomo().render();
        });
        break;
      case 'filter-btn clarity-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.clarity().render();
        });
        break;
      case 'filter-btn sincity-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.sinCity().render();
        });
        break;
      case 'filter-btn crossprocess-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.crossProcess().render();
        });
        break;
      case 'filter-btn pinhole-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.pinhole().render();
        });
        break;
      case 'filter-btn nostalgia-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.nostalgia().render();
        });
        break;
      case 'filter-btn hermajesty-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.herMajesty().render();
        });
        break;
      case 'filter-btn vintage-add btn btn-dark btn-block':
        Caman('#canvas', img, function() {
          this.vintage().render();
        });
        break;
    }
  }
});

revertBtn.addEventListener('click', () => {
  Caman('#canvas', img, function() {
    this.revert();
  });
});

uploadFile.addEventListener('change', (event) => {
  const file = document.getElementById('upload-file').files[0];
  const reader = new FileReader();

  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }

  reader.addEventListener('load', () => {
    img = new Image();
    img.src = reader.result;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      canvas.removeAttribute('data-caman-id');
    }
  }, false);
});

downloadBtn.addEventListener('click', () => {
  const fileExtension = fileName.slice(-4);
  let newFileName;
  if (fileExtension === '.jpg' || fileExtension === '.png') {
    newFileName = fileName.substring(0, fileName.length - 4) + '-edited' + fileExtension;
  }

  download(canvas, newFileName);
});

function download(canvas, filename) {
  let event;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', 0.8);

  event = new MouseEvent('click');
  link.dispatchEvent(event);
}