const charRatios = new Map([
    ["A", 0.584],["B", 0.496],["C", 0.482],["D", 0.479],["E", 0.583],
    ["F", 0.567],["G", 0.511],["H", 0.567],["I", 0.406],["J", 0.567],
    ["K", 0.463],["L", 0.513],["M", 0.717],["N", 0.697],["O", 0.604],
    ["P", 0.439],["Q", 0.645],["R", 0.505],["S", 0.488],["T", 0.629],
    ["U", 0.629],["V", 0.595],["W", 0.826],["X", 0.561],["Y", 0.561],
    ["Z", 0.601],[" ", 0.319],["-",0.293],[",",0.175],["'",0.175],
    ["1", 0.262],["2", 0.553],["3", 0.494],["4", 0.564],
    ["5", 0.511],["6", 0.511],["7", 0.609],["8", 0.491],["9", 0.491],
    ["0", 0.592]
  ]);
const canvas = document.querySelector('#canvasHD');
var ctx = canvas.getContext('2d');
var url_string = $(location).attr('href');
var url = new URL(url_string);
var paramValue = url.searchParams.get("field");
drawImageHD(paramValue.trim())
// alert(paramValue)


//Functions
async function drawImageHD(word) {
    word = word.toUpperCase();

    loadImage = async img => {
        return new Promise((resolve, reject) => {
            img.onload = async () => {
                // console.log("Image Loaded");
                resolve(true);
            };
        });
    };
    var leng = 0.0;
    var newImage = new Image();
    newImage.src = "others/js/rescs/characters/A.png";
    await loadImage(newImage);
    var height = newImage.height;
    canvas.height = height;
    for(let char of word) { 
        if(charRatios.has(char)) {
            leng = leng + height*charRatios.get(char);
        } else {
            leng = leng + height*charRatios.get(" ");
        }
    }
    canvas.width = leng;




    var prevWidth = 0;
    for(let char of word) {
        var newImage = new Image();
        if(charRatios.has(char)) {
            switch(char) {
                case ",":
                  // code block
                  newImage.src = "others/js/rescs/characters/Comma.png";
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
            newImage.src = "others/js/rescs/characters/Space.png";
        }
        // console.log(newImage.src);
        await loadImage(newImage);
        var height = canvas.height;
        var width = charRatios.get(char) * height;
        ctx.drawImage(newImage, prevWidth, 0, width, height);
        prevWidth = prevWidth + width;
    }
}