
**上传多张图片并实现在线预览**

用法：

/**
第一个参数是加入预览图片容器的id，
第二个参数是上传按钮id
第三个参数是上传完的回调(可选)
**/

var uploadFiles = new UploadFiles('fileList','fileElem',function(){
  alert('上传完毕');
});
uploadFiles.init();