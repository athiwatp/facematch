!function(){"use strict";var e=brfv4Example,t=e.imageData,a=e.trace,i=t.webcam;i.setupStream=function(e,t,n,o,r){a("webcam.setupStream: isPlaying: "+i.isPlaying),i.video=e,i.constraints={video:{width:t,height:n,frameRate:o,facingMode:"environment"}},i.onCameraReady=r,i.startStream()},i.startStream=function(){i.stopStream(),a("webcam.startStream: try: "+i.constraints.video.width+"x"+i.constraints.video.height),window.navigator.mediaDevices.getUserMedia(i.constraints).then(i.onStreamFetched).catch(i.onStreamError)},i.stopStream=function(){i.isPlaying&&a("webcam.stopStream: isPlaying: "+i.isPlaying),i.isPlaying=!1,null!==i.stream&&(i.stream.getTracks().forEach(function(e){e.stop()}),i.stream=null),null!==i.video&&null!==i.video.srcObject&&(i.video.srcObject=null)},i.onStreamFetched=function(e){i.stream=e,null!==i.video&&(i.video.srcObject=e,i.video.play(),i.onStreamDimensionsAvailable())},i.onStreamDimensionsAvailable=function(){0===i.video.videoWidth?(a("webcam.onStreamDimensionsAvailable: waiting"),clearTimeout(i.onStreamDimensionsAvailable_timeout),i.onStreamDimensionsAvailable_timeout=setTimeout(i.onStreamDimensionsAvailable,100)):(a("webcam.onStreamDimensionsAvailable: "+i.video.videoWidth+"x"+i.video.videoHeight),i.isPlaying=!0,i.onCameraReady&&i.onCameraReady(!0))},i.onStreamError=function(e){a("webcam.onStreamError: "+e),i.isPlaying=!1,i.onCameraReady&&i.onCameraReady(!1)},i.setup=function(e,n,o,r){function s(t){t?r(e.videoWidth,e.videoHeight):alert("No camera found.")}return e&&n?o?(t.type=function(){return"webcam"},t.init=function(){i.setupStream(e,o.width,o.height,30,s)},t.dispose=function(){i.stopStream()},t.isAvailable=function(){return i.isPlaying},t.isStream=function(){return!0},void(t.update=function(){var t=n.getContext("2d");t.setTransform(-1,0,0,1,o.width,0),t.drawImage(e,0,0,o.width,o.height)})):void a("setupWebcam: Please setup a resolution Rectangle.",!0):void a("setupWebcam: Please add a <video> tag with id='_webcam' and a <canvas> tag with id='_imageData' to the DOM.",!0)}}();