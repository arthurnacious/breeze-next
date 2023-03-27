export function getExtension(filename) {
    if (filename == undefined) return false
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
  
export function isImage(filename) {
    if (filename == undefined) return false
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
}
  
export function isVideo(filename) {
    if (filename == undefined) return false
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        // etc
        return true;
    }
    return false;
}

export function isPDF(filename) {
    if (filename == undefined) return false
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'pdf':
        // etc
        return true;
    }
    return false;
}
  