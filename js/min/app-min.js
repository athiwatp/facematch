function doCamera(){var e=_imageData.toDataURL("image/jpeg");$.ajax({url:"https://api.facematch.gq/api/match_faces_detailed",type:"POST",data:{imageURI:e,name:name},success:function(e){switch(setTimeout(function(){document.querySelector(".bottom-bar div").style.display="block"},1),0==e.FaceMatches.length?(name="Unknown",document.querySelector(".linkedinlink").style.display="none"):(name=e.FaceMatches[0].Face.ExternalImageId.replace(/_/g," ").trim().replace(/\s\s+/g," "),document.querySelector(".linkedinlink").style.display="block"),name){case"Anand Chowdhary":position="CEO/Product",company="Oswald Foundation",linkedin="https://www.linkedin.com/in/anandchowdhary/";break;case"mohit ahuja":position="Student",company="University of Twente",linkedin="https://www.linkedin.com/in/ahujamoh/";break;case"Hendrik Koopmans":position="Student Entrepreneur",company="Novel-T",linkedin="https://www.linkedin.com/in/hendrik-koopmans-43247262/";break;case"Julian Sotscheck":position="Jr. Business Developer",company="Novel-T",linkedin="https://www.linkedin.com/in/julian-sotscheck-63949b139/";break;case"Rogier Ikink":position="20Creathon Manager",company="Novel-T";break;case"Jose Manuel Rodriguez Martinez":position="Business Development",company="Amazon Web Services",linkedin="https://www.linkedin.com/in/jmrven/";break;case"Mike Verkouter":position="CEO/Product",company="Oswald Foundation",linkedin="https://www.linkedin.com/in/mikeverkouter/";break;default:position="Unknown",company="Unknown"}document.querySelector(".bounder").style.left=document.querySelector("#_drawing").getBoundingClientRect().width*e.FaceDetails.BoundingBox.Left+"px",document.querySelector(".bounder").style.top=document.querySelector("#_drawing").getBoundingClientRect().height*e.FaceDetails.BoundingBox.Top+"px",document.querySelector(".bounder").style.width=e.FaceDetails.BoundingBox.Width*document.querySelector("#_drawing").getBoundingClientRect().width+"px",document.querySelector(".bounder").style.height=e.FaceDetails.BoundingBox.Height*document.querySelector("#_drawing").getBoundingClientRect().height+"px",document.querySelector(".bounder").style.display="block",document.querySelector(".bounder").style.opacity="1",document.querySelector(".bounder").style.transform="scale(1)",setTimeout(function(){document.querySelector(".bounder").style.transform="scale(1.5)",document.querySelector(".bounder").style.opacity="0"},1),setTimeout(function(){document.querySelector(".bounder").style.display="none",document.querySelector(".bounder").style.transform="scale(1)",document.querySelector(".bounder").style.opacity="1"},501),age1=e.FaceDetails.AgeRange.High,age2=e.FaceDetails.AgeRange.Low,beard=e.FaceDetails.Beard.Value,gender=e.FaceDetails.Gender.Value,document.querySelector(".loader").style.display="none"},complete:function(){document.querySelector(".bottom-bar div").style.display="none"}})}function speakSentence(){var e="";e+="Unknown"==name?"There is an unknown person in the image whose age is between ":name+" is present in the image whose age is between ",e+=age2+" and "+age1,e+=". "+name+" is "+gender+" and looks "+smiling,e+="unknown"==company?".":". He is "+position+" at "+company+".",alert(e),responsiveVoice.speak(e)}function putAPI(){var e=_imageData.toDataURL("image/jpeg"),n=prompt("Enter your full name");$.ajax({url:"https://api.facematch.gq/api/add_faces_crowd",type:"PUT",data:{imageURI:e,name:n},success:function(e){console.log(e)},complete:function(){console.log("request sent")}})}function surrAPI(){var e=_imageData.toDataURL("image/jpeg");$.ajax({url:"https://api.facematch.gq/api/get_metadata",type:"POST",data:{imageURI:e},success:function(e){console.log(e);for(var n="Your surroundings may contain ",t=0;t<e.Labels.length;t++)n+=e.Labels[t].Name+", ";responsiveVoice.speak(n)},complete:function(){console.log("request sent")}})}var brfv4Example={appId:"facematch",loader:{queuePreloader:null},imageData:{webcam:{stream:null},picture:{}},dom:{},gui:{},drawing:{},drawing3d:{t3d:{}},stats:{}},brfv4={locateFile:function(e){return"js/libs/brf/BRFv4_JS_trial.js.mem"}};brfv4Example.start=function(){brfv4Example.loader.preload(["js/libs/brf/BRFv4_JS_trial.js","https://webrtc.github.io/adapter/adapter-latest.js","js/libs/quicksettings/quicksettings.min.css","js/libs/quicksettings/quicksettings.js","js/libs/createjs/easeljs-0.8.2.min.js","js/libs/threejs/three.js","js/utils/BRFv4DOMUtils.js","js/utils/BRFv4DrawingUtils_CreateJS.js","js/utils/BRFv4Drawing3DUtils_ThreeJS.js","js/utils/BRFv4SetupWebcam.js","js/utils/BRFv4SetupPicture.js","js/utils/BRFv4SetupExample.js","js/utils/BRFv4PointUtils.js"],function(){brfv4Example.init("webcam")})},brfv4Example.trace=function(e,n){if("undefined"!=typeof window&&window.console){var t=(window.performance.now()/1e3).toFixed(3);n?window.console.error(t+": ",e):window.console.log(t+": ",e)}},function(){"use strict";var e=brfv4Example.loader;e.preload=function(n,t){function o(e){}function a(e){t&&t()}if(null===e.queuePreloader&&n){var i=e.queuePreloader=new createjs.LoadQueue(!0);i.on("progress",o),i.on("complete",a),i.loadManifest(n,!0)}},e.loadExample=function(n,t){function o(e){t&&t()}var a=e.queueExamples=new createjs.LoadQueue(!0);a.on("progress",onProgress),a.on("complete",o),a.loadManifest(n,!0)}}();var smiling="neutral",p=0;setInterval(function(){1==p&&(p=0)},5e3),function e(){"use strict";brfv4Example.initCurrentExample=function(e,n){e.init(n,n,brfv4Example.appId),setTimeout(function(){doCamera(),setInterval(function(){doCamera()},5e3)},300)},brfv4Example.updateCurrentExample=function(e,n,t){e.update(n),t.clear();var o=e.getFaces(),a=new brfv4.Point,i=new brfv4.Point,r=brfv4.BRFv4PointUtils.setPoint,s=brfv4.BRFv4PointUtils.calcDistance,c=0;0==p&&(p=1);for(var l=0;l<o.length;l++){var u=o[l];if("state_face_detection"===u.state){var c=1;document.querySelector(".facebox")&&(document.querySelector(".facebox").style.display="none"),document.querySelector(".infofacebox")&&(document.querySelector(".infofacebox").style.display="none")}r(u.vertices,48,a),r(u.vertices,54,i);var d=s(a,i);r(u.vertices,39,i),r(u.vertices,42,a);var m=s(a,i),g=d/m;g-=1.4,g>.25&&(g=.25),g<0&&(g=0),g*=4,g<0&&(g=0),g>1&&(g=1),g>.5&&(smiling="kinda happy"),g>.8&&(smiling="very happy"),document.querySelector(".smilingfac").innerHTML=smiling;var y=((255*(1-g)&255)<<16)+((255*g&255)<<8),f=document.querySelector(".facebox-"+l);f||(f=document.createElement("div"),f.classList.add("facebox"),f.classList.add("facebox-"+l),document.body.appendChild(f)),f.style.left=document.querySelector("#_drawing").getBoundingClientRect().x+u.bounds.x+"px",f.style.top=document.querySelector("#_drawing").getBoundingClientRect().y-20+u.bounds.y+"px",f.style.height=u.bounds.height+"px",f.style.width=u.bounds.width+"px",0===c&&(f.style.display="block"),document.querySelector("#name")&&(document.querySelector("#name").innerHTML=name),document.querySelector("#age1")&&(document.querySelector("#age1").innerHTML=age1),document.querySelector("#age2")&&(document.querySelector("#age2").innerHTML=age2),document.querySelector("#beard")&&(document.querySelector("#beard").innerHTML=beard),document.querySelector("#gender")&&(document.querySelector("#gender").innerHTML=gender);var b=name.split(" ")[0],w=name.split(" ")[1];if("unknown"==linkedin)var v="https://www.linkedin.com/pub/dir/"+b+"/"+w;else var v=linkedin;document.querySelector(".linkedinlink").setAttribute("href",v);var h=document.querySelector(".infofacebox-"+l);h||(h=document.createElement("div"),h.classList.add("infofacebox"),h.classList.add("infofacebox-"+l),document.body.appendChild(h)),"unknown"==company?h.innerHTML=name:h.innerHTML=name+"<br>"+position+", "+company,h.style.left=document.querySelector("#_drawing").getBoundingClientRect().x+u.bounds.x+"px",h.style.top=document.querySelector("#_drawing").getBoundingClientRect().y+u.bounds.height+25+u.bounds.y+"px",0===c&&(h.style.display="block"),u.state!==brfv4.BRFState.FACE_TRACKING_START&&u.state!==brfv4.BRFState.FACE_TRACKING||(t.drawTriangles(u.vertices,u.triangles,!1,.5,y,.4),t.drawVertices(u.vertices,2,!1,y,.4))}}}(),window.onload=brfv4Example.start;var name="",age1="",age2="",beard="",gender="",position="",linkedin="unknown",company="";String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});