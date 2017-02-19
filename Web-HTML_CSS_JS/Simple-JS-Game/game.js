 "use strict";
           
            var image_source = "catface.png"; //for submission
            var playername = null;
            var image_height = 50;
            var image_width = 50;
            var div_height = 500;
            var div_width = 500;
            var vertical_range = (div_height - image_height);
            var horizontal_range = (div_width - image_width);
            var numberOfFaces = 0;
            var theLeftSide = document.createElement("div");
            theLeftSide.style.position = "absolute";
            theLeftSide.style.height = div_height.toString() + "px";
            theLeftSide.style.width = div_width.toString() + "px";
            var theRightSide = theLeftSide.cloneNode(true);
            theRightSide.style.position = "absolute";
            theRightSide.style.left = "500px";
            theRightSide.style.borderLeft = "1px solid black";
        
        function startGame(){
                var startname = window.prompt("Please enter your name", "Harry Potter");
                playername = startname;
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(theLeftSide);
                body.appendChild(theRightSide);
                body.onclick = function gameOver() {
                    alert("Game Over!" + " " + playername);
                    body.onclick = null;
                    theLeftSide.lastChild.onclick = null;
                }
                generateFaces();
            
        }

        function generateFaces() {
            numberOfFaces += 5;
            document.getElementById("catCount").innerText = numberOfFaces.toString();
            document.getElementById("playerName").innerText = playername;
            for (var i = 0; i < numberOfFaces; i++) {
                var random_top = Math.floor(vertical_range * Math.random());
                var random_left = Math.floor(horizontal_range * Math.random());
                var img = document.createElement("img");
                img.src = image_source;
                img.style.position = "absolute";
                img.style.height = image_height.toString() + "px";
                img.style.width = image_width.toString() + "px";
                img.style.top = random_top.toString() + "px";
                img.style.left = random_left.toString() + "px";
                theLeftSide.appendChild(img);
            }
            var leftSideImages = theLeftSide.cloneNode(true);
            leftSideImages.removeChild(leftSideImages.lastChild);
            theRightSide.appendChild(leftSideImages);
            theLeftSide.lastElementChild.onclick = function nextLevel(event) {
                event.stopPropagation();
                generateFaces();
            }
        }