function doCamera(){var e=_imageData.toDataURL("image/jpeg");$.ajax({url:"https://api.facematch.gq/api/match_faces_detailed",type:"POST",data:{imageURI:e,name:name},success:function(e){setTimeout(function(){document.querySelector(".bottom-bar div").style.display="block"},1),0==e.FaceMatches.length?(name="Unknown",document.querySelector(".linkedinlink").style.display="none"):(name=e.FaceMatches[0].Face.ExternalImageId.replace(/_/g," "),document.querySelector(".linkedinlink").style.display="block"),document.querySelector(".bounder").style.left=document.querySelector("#_drawing").getBoundingClientRect().width*e.FaceDetails.BoundingBox.Left+"px",document.querySelector(".bounder").style.top=document.querySelector("#_drawing").getBoundingClientRect().height*e.FaceDetails.BoundingBox.Top+"px",document.querySelector(".bounder").style.width=e.FaceDetails.BoundingBox.Width*document.querySelector("#_drawing").getBoundingClientRect().width+"px",document.querySelector(".bounder").style.height=e.FaceDetails.BoundingBox.Height*document.querySelector("#_drawing").getBoundingClientRect().height+"px",document.querySelector(".bounder").style.display="block",document.querySelector(".bounder").style.opacity="1",document.querySelector(".bounder").style.transform="scale(1)",setTimeout(function(){document.querySelector(".bounder").style.transform="scale(1.5)",document.querySelector(".bounder").style.opacity="0"},1),setTimeout(function(){document.querySelector(".bounder").style.display="none",document.querySelector(".bounder").style.transform="scale(1)",document.querySelector(".bounder").style.opacity="1"},501),age1=e.FaceDetails.AgeRange.High,age2=e.FaceDetails.AgeRange.Low,beard=e.FaceDetails.Beard.Value,gender=e.FaceDetails.Gender.Value,document.querySelector(".loader").style.display="none"},complete:function(){document.querySelector(".bottom-bar div").style.display="none"}})}function speakSentence(){var e="";e+="Unknown"==name?"There is an unknown person in the image whose age is between ":name+" is present in the image whose age is between ",e+=age2+" and "+age1,e+=". He is "+gender+" and looks "+smiling,alert(e)}function putAPI(){var e=_imageData.toDataURL("image/jpeg"),t=prompt("Enter your full name");$.ajax({url:"https://api.facematch.gq/api/add_faces_crowd",type:"PUT",data:{imageURI:e,name:t},success:function(e){console.log(e)},complete:function(){console.log("request sent")}})}var brfv4Example={appId:"facematch",loader:{queuePreloader:null},imageData:{webcam:{stream:null},picture:{}},dom:{},gui:{},drawing:{},drawing3d:{t3d:{}},stats:{}},brfv4={locateFile:function(e){return"js/libs/brf/BRFv4_JS_trial.js.mem"}};brfv4Example.start=function(){brfv4Example.loader.preload(["js/libs/brf/BRFv4_JS_trial.js","https://webrtc.github.io/adapter/adapter-latest.js","js/libs/quicksettings/quicksettings.min.css","js/libs/quicksettings/quicksettings.js","js/libs/createjs/easeljs-0.8.2.min.js","js/libs/threejs/three.js","js/utils/BRFv4DOMUtils.js","js/utils/BRFv4DrawingUtils_CreateJS.js","js/utils/BRFv4Drawing3DUtils_ThreeJS.js","js/utils/BRFv4SetupWebcam.js","js/utils/BRFv4SetupPicture.js","js/utils/BRFv4SetupExample.js","js/utils/BRFv4PointUtils.js"],function(){brfv4Example.init("webcam")})},brfv4Example.trace=function(e,t){if("undefined"!=typeof window&&window.console){var n=(window.performance.now()/1e3).toFixed(3);t?window.console.error(n+": ",e):window.console.log(n+": ",e)}},function(){"use strict";var e=brfv4Example.loader;e.preload=function(t,n){function o(e){}function a(e){n&&n()}if(null===e.queuePreloader&&t){var r=e.queuePreloader=new createjs.LoadQueue(!0);r.on("progress",o),r.on("complete",a),r.loadManifest(t,!0)}},e.loadExample=function(t,n){function o(e){n&&n()}var a=e.queueExamples=new createjs.LoadQueue(!0);a.on("progress",onProgress),a.on("complete",o),a.loadManifest(t,!0)}}();var smiling="neutral",p=0;setInterval(function(){1==p&&(p=0)},5e3),function e(){"use strict";brfv4Example.initCurrentExample=function(e,t){e.init(t,t,brfv4Example.appId),setTimeout(function(){doCamera(),setInterval(function(){doCamera()},1e4)},300)},brfv4Example.updateCurrentExample=function(e,t,n){e.update(t),n.clear();var o=e.getFaces(),a=new brfv4.Point,r=new brfv4.Point,i=brfv4.BRFv4PointUtils.setPoint,c=brfv4.BRFv4PointUtils.calcDistance,l=0;0==p&&(p=1);for(var s=0;s<o.length;s++){var u=o[s];if("state_face_detection"===u.state){var l=1;document.querySelector(".facebox")&&(document.querySelector(".facebox").style.display="none"),document.querySelector(".infofacebox")&&(document.querySelector(".infofacebox").style.display="none")}i(u.vertices,48,a),i(u.vertices,54,r);var d=c(a,r);i(u.vertices,39,r),i(u.vertices,42,a);var m=c(a,r),g=d/m;g-=1.4,g>.25&&(g=.25),g<0&&(g=0),g*=4,g<0&&(g=0),g>1&&(g=1),g>.5&&(smiling="kinda happy"),g>.8&&(smiling="very happy"),document.querySelector(".smilingfac").innerHTML=smiling;var y=((255*(1-g)&255)<<16)+((255*g&255)<<8),f=document.querySelector(".facebox-"+s);f||(f=document.createElement("div"),f.classList.add("facebox"),f.classList.add("facebox-"+s),document.body.appendChild(f)),f.style.left=document.querySelector("#_drawing").getBoundingClientRect().x+u.bounds.x+"px",f.style.top=document.querySelector("#_drawing").getBoundingClientRect().y-20+u.bounds.y+"px",f.style.height=u.bounds.height+"px",f.style.width=u.bounds.width+"px",0===l&&(f.style.display="block"),document.querySelector("#name")&&(document.querySelector("#name").innerHTML=name),document.querySelector("#age1")&&(document.querySelector("#age1").innerHTML=age1),document.querySelector("#age2")&&(document.querySelector("#age2").innerHTML=age2),document.querySelector("#beard")&&(document.querySelector("#beard").innerHTML=beard),document.querySelector("#gender")&&(document.querySelector("#gender").innerHTML=gender);var b=name.split(" ")[0],v=name.split(" ")[1],S="https://www.linkedin.com/pub/dir/"+b+"/"+v;document.querySelector(".linkedinlink").setAttribute("href",S);var q=document.querySelector(".infofacebox-"+s);q||(q=document.createElement("div"),q.classList.add("infofacebox"),q.classList.add("infofacebox-"+s),document.body.appendChild(q)),q.innerHTML=name,q.style.left=document.querySelector("#_drawing").getBoundingClientRect().x+u.bounds.x+"px",q.style.top=document.querySelector("#_drawing").getBoundingClientRect().y+u.bounds.height+25+u.bounds.y+"px",0===l&&(q.style.display="block"),u.state!==brfv4.BRFState.FACE_TRACKING_START&&u.state!==brfv4.BRFState.FACE_TRACKING||(n.drawTriangles(u.vertices,u.triangles,!1,.5,y,.4),n.drawVertices(u.vertices,2,!1,y,.4))}}}(),window.onload=brfv4Example.start;var name="",age1="",age2="",beard="",gender="";