var brfv4Example = {
	
		appId: "facematch", // Choose your own app id. 8 chars minimum.
	
		loader: { queuePreloader: null },	// preloading/example loading
		imageData: {						// image data source handling
			webcam: { stream: null },		// either webcam ...
			picture: {}						// ... or pictures/images
		},
		dom: {},							// html dom stuff
		gui: {},							// QuickSettings elements
		drawing: {},						// drawing the results using createJS
		drawing3d: {						// all 3D engine functions
			t3d: {}//,						// ThreeJS stuff
			//f3d: {}						// Flare3D stuff (coming later)
		},
		stats: {}							// fps meter
	};
	
	var brfv4 = {locateFile: function(fileName) { return "js/libs/brf/BRFv4_JS_trial.js.mem"; }};
	brfv4Example.start = function() {
		brfv4Example.loader.preload([
			"js/libs/brf/BRFv4_JS_trial.js",						// BRFv4 SDK
			"https://webrtc.github.io/adapter/adapter-latest.js",	// webcam polyfill for older browsers
			"js/libs/quicksettings/quicksettings.min.css",			// gui elements
			"js/libs/quicksettings/quicksettings.js",
			"js/libs/createjs/easeljs-0.8.2.min.js",				// canvas drawing lib
			"js/libs/threejs/three.js",								// ThreeJS: a 3D engine
			"js/utils/BRFv4DOMUtils.js",							// DOM handling
			"js/utils/BRFv4DrawingUtils_CreateJS.js",				// BRF result drawing
			"js/utils/BRFv4Drawing3DUtils_ThreeJS.js",				// ThreeJS 3d object placement.
			"js/utils/BRFv4SetupWebcam.js",							// webcam handling
			"js/utils/BRFv4SetupPicture.js",						// picture/image handling
			"js/utils/BRFv4SetupExample.js",						// overall example setup
			"js/utils/BRFv4PointUtils.js"							// some calculation helpers
		], function() {
			brfv4Example.init("webcam");
		});
	};
	
	brfv4Example.trace = function(msg, error) {
		if(typeof window !== 'undefined' && window.console) {
			var now = (window.performance.now() / 1000).toFixed(3);
			if(error) {	window.console.error(now + ': ', msg); }
			else { window.console.log(now + ': ', msg); }
		}
	};
	
	(function () {
		"use strict";
	
		var loader = brfv4Example.loader;
	
		loader.preload = function (filesToLoad, callback) {
	
			if (loader.queuePreloader !== null || !filesToLoad) {
				return;
			}
	
			function onPreloadProgress(event) {
				// loader.setProgressBar(event.loaded, true);
			}
	
			function onPreloadComplete(event) {
				// loader.setProgressBar(1.0, false);
				if(callback) callback();
			}
	
			var queue = loader.queuePreloader = new createjs.LoadQueue(true);
			queue.on("progress", onPreloadProgress);
			queue.on("complete", onPreloadComplete);
			queue.loadManifest(filesToLoad, true);
		};
	
		loader.loadExample = function (filesToLoad, callback) {
			function onComplete(event) {
				if (callback) callback();
			}
			var queue = loader.queueExamples = new createjs.LoadQueue(true);
			queue.on("progress", onProgress);
			queue.on("complete", onComplete);
			queue.loadManifest(filesToLoad, true);
		};
	
	})();
	var smiling = "neutral";
var p = 0;
setInterval(function() {
	if (p == 1) {
		p = 0	;
	}
}, 5000);

	(function exampleCode() {
		"use strict";
	
		brfv4Example.initCurrentExample = function(brfManager, resolution) {
	
			// By default everything necessary for a single face tracking app
			// is set up for you in brfManager.init. There is actually no
			// need to configure much more for a jump start.
	
			brfManager.init(resolution, resolution, brfv4Example.appId);

			setTimeout(function() {
				doCamera();
				setInterval(function() {
					doCamera();
				}, 5000);
			}, 300);

		};
	
		brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {
	
			// In a webcam example imageData is the mirrored webcam video feed.
			// In an image example imageData is the (not mirrored) image content.
	
			brfManager.update(imageData);
	
			// Drawing the results:
	
			draw.clear();
	
			// document.querySelector(".bg").style.left = document.querySelector("#_drawing").getBoundingClientRect().x + "px";
			// document.querySelector(".bg").style.top = document.querySelector("#_drawing").getBoundingClientRect().y + "px";
			// document.querySelector(".bg").style.width = document.querySelector("#_drawing").getBoundingClientRect().width + "px";
			// document.querySelector(".bg").style.height = document.querySelector("#_drawing").getBoundingClientRect().height + "px";
	
			// Face detection results: a rough rectangle used to start the face tracking.
	
			// draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
			// draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);
	
			// Get all faces. The default setup only tracks one face.
	
			var faces = brfManager.getFaces();

			var p0              = new brfv4.Point();
			var p1              = new brfv4.Point();
		
			var setPoint        = brfv4.BRFv4PointUtils.setPoint;
			var calcDistance    = brfv4.BRFv4PointUtils.calcDistance;

			var nofaces = 0;

			if (p == 0) {
				// Call onclick function
				p = 1;
			}

			for(var i = 0; i < faces.length; i++) {
	
				var face = faces[i];
				if (face.state === "state_face_detection") {
					var nofaces = 1;
					if (document.querySelector(".facebox")) document.querySelector(".facebox").style.display = "none";
					if (document.querySelector(".infofacebox")) document.querySelector(".infofacebox").style.display = "none";
				}

				// Smile Detection

                setPoint(face.vertices, 48, p0); // mouth corner left
                setPoint(face.vertices, 54, p1); // mouth corner right

                var mouthWidth = calcDistance(p0, p1);

                setPoint(face.vertices, 39, p1); // left eye inner corner
                setPoint(face.vertices, 42, p0); // right eye outer corner

                var eyeDist = calcDistance(p0, p1);
                var smileFactor = mouthWidth / eyeDist;

                smileFactor -= 1.40; // 1.40 - neutral, 1.70 smiling

                if(smileFactor > 0.25) smileFactor = 0.25;
                if(smileFactor < 0.00) smileFactor = 0.00;

                smileFactor *= 4.0;

                if(smileFactor < 0.0) { smileFactor = 0.0; }
				if(smileFactor > 1.0) { smileFactor = 1.0; }
			
				if (smileFactor > 0.5) {
					smiling = "kinda happy";
				}
				if (smileFactor > 0.8) {
					smiling = "very happy";
				}
				document.querySelector(".smilingfac").innerHTML = smiling;

				var color =
				(((0xff * (1.0 - smileFactor) & 0xff) << 16)) +
				(((0xff * smileFactor) & 0xff) << 8);
	
				var box = document.querySelector(".facebox-" + i);
				if (!box) {
					box = document.createElement("div");
					box.classList.add("facebox");
					box.classList.add("facebox-" + i);
					document.body.appendChild(box);
				}
				box.style.left = document.querySelector("#_drawing").getBoundingClientRect().x + face.bounds.x + "px";
				box.style.top = document.querySelector("#_drawing").getBoundingClientRect().y - 20 + face.bounds.y + "px";
				box.style.height = face.bounds.height + "px";
				box.style.width = face.bounds.width + "px";
				if (nofaces === 0) box.style.display = "block";
				/*var box2 = document.querySelector(".facebox2-" + i);
				if (!box2) {
					box2 = document.createElement("div");
					box2.classList.add("facebox2");
					box2.classList.add("facebox2-" + i);
					document.body.appendChild(box2);
				}
				box2.style.left = document.querySelector("#_drawing").getBoundingClientRect().x + face.bounds.x - 50 + "px";
				box2.style.top = document.querySelector("#_drawing").getBoundingClientRect().y + face.bounds.y - 50 + "px";
				box2.style.height = face.bounds.height + 100 + "px";
				box2.style.width = face.bounds.width + 100 + "px";
				box2.style.display = "block";*/

				if (document.querySelector("#name")) document.querySelector("#name").innerHTML = name;
				// if (document.querySelector("#accuracy")) document.querySelector("#accuracy").innerHTML = accuracy;
				if (document.querySelector("#age1")) document.querySelector("#age1").innerHTML = age1;
				if (document.querySelector("#age2")) document.querySelector("#age2").innerHTML = age2;
				if (document.querySelector("#beard")) document.querySelector("#beard").innerHTML = beard;
				if (document.querySelector("#gender")) document.querySelector("#gender").innerHTML = gender;

				var firstName = name.split(" ")[0];
				var lastName = name.split(" ")[1];
				if (linkedin == "unknown") {
					var linkedInlink = "https://www.linkedin.com/pub/dir/" + firstName + "/" + lastName;	
				} else {
					var linkedInlink = linkedin;
				}
				document.querySelector(".linkedinlink").setAttribute("href", linkedInlink);
				
				var info = document.querySelector(".infofacebox-" + i);
				if (!info) {
					info = document.createElement("div");
					info.classList.add("infofacebox");
					info.classList.add("infofacebox-" + i);
					document.body.appendChild(info);
				}
				if (company == "unknown") {
					info.innerHTML = name;
				} else {
					info.innerHTML = name + "<br>" + position + ", " + company;
				}
				// info.style.left = document.querySelector("#_drawing").getBoundingClientRect().x + face.bounds.x + "px";
				// info.style.top = document.querySelector("#_drawing").getBoundingClientRect().y + face.bounds.y + face.bounds.height + "px";
				info.style.left = document.querySelector("#_drawing").getBoundingClientRect().x + face.bounds.x + "px";
				info.style.top = document.querySelector("#_drawing").getBoundingClientRect().y + face.bounds.height + 25 + face.bounds.y + "px";
				if (nofaces === 0) info.style.display = "block";
	
				// document.querySelector(".bg").style.backgroundPosition = document.querySelector("#_drawing").getBoundingClientRect().height + "px";
	
				if( face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
	
					// Face tracking results: 68 facial feature points.
	
					// draw.drawTriangles(	face.vertices, face.triangles, false, 0.3, 0xffffff, 0.35);
					// draw.drawVertices(	face.vertices, 1.5, false, 0xffffff, 0.3);

					// Face Tracking results: 68 facial feature points.

					draw.drawTriangles( face.vertices, face.triangles, false, 0.5, color, 0.4);
					draw.drawVertices(  face.vertices, 2.0, false, color, 0.4);
	
				}
			}
		};
	
	})();

window.onload = brfv4Example.start;

var name = "";
// var accuracy = "";
var age1 = "";
var age2 = "";
var beard = "";
var gender = "";
var position = "";
var linkedin = "unknown";
var company = "";

function doCamera() {
	var image = _imageData.toDataURL("image/jpeg");
	$.ajax({
		url: "https://api.facematch.gq/api/match_faces_detailed",
		type: "POST",
		data: {
			imageURI: image,
			name: name
		},
		success: function(result) {
			setTimeout(function() {
				document.querySelector(".bottom-bar div").style.display = "block";
			}, 1);
			if (result.FaceMatches.length == 0) {
				name = "Unknown";
				// accuracy = "100%";
				document.querySelector(".linkedinlink").style.display = "none";
			} else {
				name = result.FaceMatches[0].Face.ExternalImageId.replace(/_/g, " ").trim().replace(/\s\s+/g, ' ');
				document.querySelector(".linkedinlink").style.display = "block";
				// accuracy = parseInt(result.FaceMatches[0].Face.Confidence) + "%";
			}
			switch (name) {
				case "Anand Chowdhary":
					position = "CEO/Product";
					company = "Oswald Foundation";
					linkedin = "https://www.linkedin.com/in/anandchowdhary/";
					break;
				case "mohit ahuja":
					position = "Student";
					company = "University of Twente";
					linkedin = "https://www.linkedin.com/in/ahujamoh/";
					break;
				case "Hendrik Koopmans":
					position = "Student Entrepreneur";
					company = "Novel-T";
					linkedin = "https://www.linkedin.com/in/hendrik-koopmans-43247262/";
					break;
				case "Julian Sotscheck":
					position = "Jr. Business Developer";
					company = "Novel-T";
					linkedin = "https://www.linkedin.com/in/julian-sotscheck-63949b139/";
					break;
				case "Rogier Ikink":
					position = "20Creathon Manager";
					company = "Novel-T";
					break;
				case "Jose Manuel Rodriguez Martinez":
					position = "Business Development";
					company = "Amazon Web Services";
					linkedin = "https://www.linkedin.com/in/jmrven/";
					break;
				case "Mike Verkouter":
					position = "CEO/Product";
					company = "Oswald Foundation";
					linkedin = "https://www.linkedin.com/in/mikeverkouter/";
					break;
				default:
					position = "Unknown";
					company = "Unknown";
					break;
			};
			document.querySelector(".bounder").style.left = document.querySelector("#_drawing").getBoundingClientRect().width * result.FaceDetails.BoundingBox.Left + "px";
			document.querySelector(".bounder").style.top = document.querySelector("#_drawing").getBoundingClientRect().height * result.FaceDetails.BoundingBox.Top + "px";
			document.querySelector(".bounder").style.width = result.FaceDetails.BoundingBox.Width * document.querySelector("#_drawing").getBoundingClientRect().width + "px";
			document.querySelector(".bounder").style.height = result.FaceDetails.BoundingBox.Height * document.querySelector("#_drawing").getBoundingClientRect().height + "px";
			document.querySelector(".bounder").style.display = "block";
			document.querySelector(".bounder").style.opacity = "1";
			document.querySelector(".bounder").style.transform = "scale(1)";
			setTimeout(function() {
				document.querySelector(".bounder").style.transform = "scale(1.5)";
				document.querySelector(".bounder").style.opacity = "0";
			}, 1);
			setTimeout(function() {
				document.querySelector(".bounder").style.display = "none";
				document.querySelector(".bounder").style.transform = "scale(1)";
				document.querySelector(".bounder").style.opacity = "1";
			}, 501);
			age1 = result.FaceDetails.AgeRange.High;
			age2 = result.FaceDetails.AgeRange.Low;
			beard = result.FaceDetails.Beard.Value;
			gender = result.FaceDetails.Gender.Value;
			document.querySelector(".loader").style.display = "none";
		},
		complete: function() {
			document.querySelector(".bottom-bar div").style.display = "none";
		}
	});
}

function speakSentence() {
	var sentence = "";
	if (name == "Unknown") {
		sentence += "There is an unknown person in the image whose age is between ";
	} else {
		sentence += name + " is present in the image whose age is between ";
	}
	sentence += age2 + " and " + age1;
	sentence += ". " + name + " is " + gender + " and looks " + smiling;
	if (company == "unknown") {
		sentence += ".";
	} else {
		sentence += ". He is " + position + " at " + company + ".";
	}
	alert(sentence);
	responsiveVoice.speak(sentence);
}

function putAPI() {
	var image = _imageData.toDataURL("image/jpeg");
	var name = prompt("Enter your full name");
	$.ajax({
		url: "https://api.facematch.gq/api/add_faces_crowd",
		type: "PUT",
		data: {
			imageURI: image,
			name: name
		},
		success: function(result) {
			console.log(result);
		},
		complete: function() {
			console.log("request sent");
		}
	});
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
	  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
  }

function surrAPI() {
	var image = _imageData.toDataURL("image/jpeg");
	$.ajax({
		url: "https://api.facematch.gq/api/get_metadata",
		type: "POST",
		data: {
			imageURI: image
		},
		success: function(result) {
			console.log(result);
			var p = "Your surroundings may contain ";
			for (var i = 0; i < result.Labels.length; i++) {
				p += result.Labels[i].Name + ", ";
			}
			responsiveVoice.speak(p);
		},
		complete: function() {
			console.log("request sent");
		}
	});
}