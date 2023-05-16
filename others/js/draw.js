const canvas = document.querySelector('#myCanvas');
const charRatios = new Map([
    ["A", 0.584],["B", 0.496],["C", 0.482],["D", 0.479],["E", 0.583],
    ["F", 0.567],["G", 0.511],["H", 0.567],["I", 0.406],["J", 0.567],
    ["K", 0.463],["L", 0.513],["M", 0.717],["N", 0.697],["O", 0.604],
    ["P", 0.439],["Q", 0.645],["R", 0.505],["S", 0.512],["T", 0.629],
    ["U", 0.629],["V", 0.595],["W", 0.793],["X", 0.561],["Y", 0.561],
    ["Z", 0.601],[" ", 0.319],["-",0.293],[",",0.175],["'",0.175],[".",0.175],
    ["1", 0.262],["2", 0.553],["3", 0.494],["4", 0.564],
    ["5", 0.511],["6", 0.511],["7", 0.609],["8", 0.491],["9", 0.491],
    ["0", 0.592]
  ]);
var ctx = canvas.getContext('2d');
drawImage("sample");
var generateBtn = document.querySelector('#generate');
var downloadBtn = document.querySelector('#download');
var downloadBtnBlack = document.querySelector('#downloadBlack');
var downloadBtnHD = document.querySelector('#downloadHD');
var clearBtn = document.querySelector('#clear');
var currentText = "";
window.inputText = "sample";


//Events---------------
generateBtn.addEventListener("click", function() {
    var inputText = document.getElementById("myText").value;
    inputText = inputText.trim();
    if(inputText!=="") {
        disableDownload(true);
        drawImage(inputText);
    }
} )

downloadBtn.addEventListener("click", function() {
    if(currentText!=="") {
        downloadCanvasAsImage("myCanvas",currentText,"png");
    } else {
        downloadCanvasAsImage("myCanvas","SAMPLE","png");
    }
    
} )

downloadBtnBlack.addEventListener("click", function() {
    if(currentText!=="") {
        downloadCanvasAsImage("myCanvas",currentText,"jpeg");
    } else {
        downloadCanvasAsImage("myCanvas","SAMPLE","jpeg");
    }
    
} )

downloadBtnHD.addEventListener("click", function() {
    var link = document.createElement('a');
    if(currentText!=="") {
        link.href = "canvaspage.html?field="+currentText;
    } else {
        link.href = "canvaspage.html?field=SAMPLE";
    }
    link.setAttribute("data-name","sample");
    link.target = "_blank";
  
    // Programmatically trigger a click on the link
    var clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    link.dispatchEvent(clickEvent);
} )

clearBtn.addEventListener("click", function() {
    if(document.getElementById("myText").value !== "") {
        document.getElementById("myText").value = "";
        drawImage("sample");
        currentText = "";
    }
    if(currentText!="") {
        drawImage("sample");
        currentText = "";
    }
} )






//Functions-------------
function prepareCanvasWidth(word) {
    var height = canvas.height;
    var leng = 0.0;
    currentText = "";
    for(let char of word) {
        if(charRatios.has(char)) {
            leng = leng + height*charRatios.get(char);
            currentText = currentText + char;
        } else {
            leng = leng + height*charRatios.get(" ");
            currentText = currentText + " ";
        }
    }
    canvas.width = leng;
}

async function drawImage(word) {
    word = word.toUpperCase()
    prepareCanvasWidth(word);
    loadImage = async img => {
        return new Promise((resolve, reject) => {
            img.onload = async () => {
                resolve(true);
            };
        });
    };
    var prevWidth = 0;


    for(let char of word) {
        var newImage = new Image();
        if(charRatios.has(char)) {
            switch(char) {
                case ",":
                  // code block
                  newImage.src = "others/js/rescs/characters/Comma.png";
                  break;
                case ".":
                  // code block
                  newImage.src = "others/js/rescs/characters/Stop.png";
                  break;
                case "'":
                  // code block
                  newImage.src = "others/js/rescs/characters/Apostrophe.png";
                  break;
                case " ":
                  // code block
                  newImage.src = "others/js/rescs/characters/Space.png";
                  break;
                case "-":
                   // code block
                   newImage.src = "others/js/rescs/characters/Hyfen.png";
                   break;
                default:
                  newImage.src = "others/js/rescs/characters/"+char+".png";
              }
            
        } else {
            char = " ";
            newImage.src = "others/js/rescs/characters/Space.png";
        }
        // console.log(newImage.src);
        await loadImage(newImage);
        var height = canvas.height;
        var width = charRatios.get(char) * height;
        ctx.drawImage(newImage, prevWidth, 0, width, height);
        prevWidth = prevWidth + width;
    }

    disableDownload(false);
}

function downloadCanvasAsImage(canvasId, filename, filetype) {
    var canvas = document.getElementById(canvasId);
    var dataUrl = canvas.toDataURL('image/' + filetype);

    var link = document.createElement('a');
    
    link.href = dataUrl;
    link.download = filename + '.' + filetype;
  
    // Programmatically trigger a click on the link
    var clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    link.dispatchEvent(clickEvent);
  }

  function disableDownload(value) {
    document.getElementById("download").disabled = value;
    document.getElementById("downloadBlack").disabled = value;
    document.getElementById("downloadHD").disabled = value;
  }


