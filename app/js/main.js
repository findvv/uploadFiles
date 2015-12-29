var co = require('co');
require("babel-polyfill");
function UploadFiles(fileList,fileElem,callback){
  var func = function(){}
  this.fileElem = document.getElementById(fileElem);
  this.fileList = document.getElementById(fileList);
  this.callback = callback || func;
  this.files = [];
}
UploadFiles.prototype.upload = function(file,callback){
  var img = new Image(),reader = new FileReader(),that = this;
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    img.src = reader.result;
    that.fileList.appendChild(img);
    callback();
  }
}
UploadFiles.prototype.promise = function(file){
  var that = this;
  return new Promise(function (resolve, reject){
    that.upload(file,resolve);
  });
}
UploadFiles.prototype.generate = function *(that){
  var files = that.files;
  for (var i = 0; i < files.length; i++) {
    yield that.promise(files[i]); 
  }
}
UploadFiles.prototype.init = function(){
  var that = this;
  that.fileElem.onchange = function(){
    that.files = this.files;
    co(that.generate(that)).then(function (){ 
      that.callback();
    });
  }
}
window.UploadFiles = UploadFiles;
