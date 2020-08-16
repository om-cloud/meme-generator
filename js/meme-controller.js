'use strict'

var gMeme;
var gCanvas;
var gCanvas2
var gCtx;
var gCtx2;
var gLine;
var gCurrText = '';
var gCurrLine = {};
var gCurrFillColor = 'white'
var gCurrFont = 'Impact'
var gCurrAlign = 'center'
var gCurrStrokeColor = 'black';
var gCurrFillColor = 'white';
var gCurrFontSize;
var gCurrStrokeWidth = '2'
var gCurrX;
var gCurrY;
var gCurrBaseline;
var gCurrTextAlign;
var gCurrLineId = 0;
var gLinesOrderArray = []
var gFocusedLineIdxInOrderArray = 0;
var gImgId;
var gImg;
var gImgUrl;
var gImgs;
var gCurrLinePosition;
var gCurrImgId = 10;
var gCurrImgUrl = 'meme-imgs-square/10.jpg';
var gDraggedLineId;
var gIsDrag = false;



function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    createImages();
    createReadyMemes();
    inializeNewMeme();
    gCurrX = gCanvas.width / 2;
    gCurrY = gCanvas.height / 7;
    gCurrFontSize = gCanvas.height / 9;
    gCurrLinePosition = 'first';
    gLinesOrderArray = []
    assignLineCoordiantes();
    onCreateNewLine();
    gLinesOrderArray.push(gCurrLine.lineId);
    addEvenetListeners()
    _createKeyWords() //temp
    renderPopularWords()  //temp
    checkScreensize('.mycanvas2')
}
function checkScreensize(canvas){
    if(screen.width < 900 && screen.width > 700){
        document.querySelector(canvas).height =400;
        document.querySelector(canvas).width =400;
    }else if(screen.width <= 700 && screen.width > 540){
        document.querySelector(canvas).height =350;
        document.querySelector(canvas).width =350;
    }else if(screen.width<= 540){
        document.querySelector(canvas).height =400;
        document.querySelector(canvas).width =400;
    }
}


function inializeNewMeme() {
    assignCanvasImage();
    createNewMeme(gImgId);
}

function reAssignGlobalVariables() {
    gCurrText = '';
    gCurrFont = 'Impact'
    gCurrAlign = 'center'
    gCurrStrokeColor = 'black';
    gCurrFillColor = 'white';
    gCurrFontSize = gCanvas.height / 9;
    gCurrStrokeWidth = '2'
    gCurrX = gCanvas.width / 2;
    gCurrY = gCanvas.height / 7;
    gCurrLineId = 0;
    gFocusedLineIdxInOrderArray = 0;
}

/////  Header  //////

function onNavigateToGallery(ev) {
    ev.preventDefault();
    document.querySelector('.images-grid').innerHTML = '';
    renderImages(gImgs);
    document.querySelector('.images-container').classList.remove('none-display');
    document.querySelector('.meme-container').classList.add('none-display');
    //document.querySelector('.about').classList.add('none-display');
}

function onNavigateToMemes(ev) {
    ev.preventDefault();
    document.querySelector('.images-grid').innerHTML = '';
    renderMemes();
    //document.querySelector('.about').classList.remove('none-display');
    document.querySelector('.images-container').classList.remove('none-display');
    document.querySelector('.meme-container').classList.add('none-display');
}

function onNavigateToMemeGen(ev) {
    ev.preventDefault()
    document.querySelector('.images-grid').innerHTML = '';
    document.querySelector('.meme-container').classList.remove('none-display');
    document.querySelector('.images-container').classList.add('none-display');
    //document.querySelector('.about').classList.add('none-display');
}



///// RENDERING IMAGES TO HTML  /////

function renderImages(imagesArray) {
    var arrayHtml = imagesArray.map((img) => {
        return `     
         <div><img src="${img.url}" onclick="chooseImage('${img.id}','${img.url}')" alt=""></div>`
    })
    document.querySelector('.images-grid').innerHTML = arrayHtml.join('')
}

function renderMemes() {
    var arrayHtml = gReadyMemes.map((img) => {
        return `     
          <div><img src="${img.url}" alt=""></div>`
    })
    document.querySelector('.images-grid').innerHTML = arrayHtml.join('');
}


function chooseImage(imgId, imgUrl) {
    gCurrImgId = imgId;
    gCurrImgUrl = imgUrl;
    console.log(imgUrl)
    document.querySelector('.canvas-image').src = imgUrl;
    document.querySelector('.backround-image').style.backgroundImage = `url('../${imgUrl}')`
    document.querySelector('.meme-container').classList.remove('none-display');
    document.querySelector('.images-container').classList.add('none-display');
    document.querySelector('.about').classList.add('none-display');
    gCurrText = document.querySelector('.words-input').value = '';
    init();
}



///////   RENDER SEARCH WORDS  /////

function renderPopularWords() {
    const K =0.3
    var strHTML = ''
    var counter = 0;
    for (const key in gKeyWords) {
        if (counter === 5) {
            strHTML+=`<div class="word-wrapper"><a >more..</a></div>`
            break
        }
        var fontSize= (12 + ((gKeyWords[key]) *K) +'px')
        if (gKeyWords.key>=40 ) fontSize = 30;
        strHTML += `<div class="word-wrapper"><a style="font-size:${fontSize};">${key}</a></div>`
        //console.log(gKeyWords[key])
        counter++
    }
    console.log(strHTML)
    document.querySelector('.popular-words').innerHTML=strHTML
}

//////    DRAG AND DROP  ////////



function drag(event) {
    var x = event.pageX - gCanvas.offsetLeft;
    var y = event.pageY - gCanvas.offsetTop;
    checkMouseDownOnLine(x, y)
    if (gIsDrag) {
        console.log(x, y)
        gCanvas.addEventListener('mousemove', onMouseMove);
    }
}

function checkMouseDownOnLine(x, y) {
    gMeme.lines.forEach((line) => {
        var fontsize= parseInt(line.fontSize)
        if ((y <= line.y) && ((line.y - fontsize) <= y)) {
            gIsDrag = true;
            gDraggedLineId = line.lineId
            console.log(gIsDrag, gDraggedLineId)
            return
        }
    })
}

function onMouseMove(event) {
    var x = event.pageX - gCanvas.offsetLeft;
    var y = event.pageY - gCanvas.offsetTop;
    var idx = findLineIdxById(gDraggedLineId);
    gMeme.lines[idx].y=y;
    gMeme.lines[idx].x=x;
    clearCanvas();
    drawMeme();
}


function drop(event) {
    gCanvas.removeEventListener('mousemove', onMouseMove);
    gIsDrag = false;
    gDraggedLineId=undefined;
}

/////    RENDERING   AND  UPDATING  MEME MODEL   //////

function determineLinePosition() {
    const HALF_CANVAS_HEIGHT = (0.5 * gCanvas.height);
    const HALF_FONT_SIZE = (gCurrFontSize / 2);

    gCurrX = gCanvas.width / 2;
    if ('first' !== checkIfLineExist('first')) {
        gCurrY = gCanvas.height / 7;
        gCurrLinePosition = 'first'
    } else if (gMeme.lines.length >= 1 && 'last' !== checkIfLineExist('last')) {
        gCurrY = gCanvas.height - ((gCanvas.height / 6.3) - (gCurrFontSize));
        gCurrLinePosition = 'last'
    } else if (gMeme.lines.length >= 2 && 'central' !== checkIfLineExist('central')) {
        gCurrY = (HALF_CANVAS_HEIGHT + (HALF_FONT_SIZE))
        gCurrLinePosition = 'central'
    } else if (gMeme.lines.length >= 3 && 'fourth' !== checkIfLineExist('fourth')) {
        gCurrLinePosition = 'fourth'
        gCurrY = (HALF_CANVAS_HEIGHT + (HALF_FONT_SIZE) - (gCurrLine.fontSize + 18))
    } else if (gMeme.lines.length >= 4 && 'fifth' !== checkIfLineExist('fifth')) {
        gCurrLinePosition = 'fifth'
        gCurrY = (HALF_CANVAS_HEIGHT + (HALF_FONT_SIZE) + (gCurrLine.fontSize + 18))
    } else if (gMeme.lines.length >= 5 && 'sixth' !== checkIfLineExist('sixth')) {
        gCurrLinePosition = 'sixth'
        gCurrY = (HALF_CANVAS_HEIGHT + (HALF_FONT_SIZE) - (2 * (gCurrLine.fontSize + 18)))
    } else if (gMeme.lines.length >= 3 && 'seventh' !== checkIfLineExist('seventh')) {
        gCurrLinePosition = 'seventh'
        gCurrY = (HALF_CANVAS_HEIGHT + (HALF_FONT_SIZE) + (2 * (gCurrLine.fontSize + 18)))
    }
}

function checkIfLineExist(lineSearched) {
    var positionsArray = checkWhichLinesExistInMem();
    //console.log(positionsArray)
    return positionsArray.find(line => line === lineSearched)
}

function onChangeMiddleLinesHeight() { //to accomplish
    liftCenterLines();
}

function drawText(line) {
    gCtx.lineWidth = line.strokeWidth + '';
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = line.fontSize + 'px ' + line.font;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}



function drawMeme() {
    gMeme.lines.forEach((line) => {
        drawText(line);
    })
    //to check if the baseline values etc more accurate
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width / 2, gCanvas.height / 2);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    // changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}


function onSaveMeme() {
    saveMeme();
}

function onCreateNewLine() {
    createNewLine();
}

function assignLineCoordiantes() {
    const textMetrics = gCtx.measureText(gCurrText);
    gCurrBaseline = textMetrics.actualBoundingBoxLeft;
    gCurrTextAlign = textMetrics.actualBoundingBoxAscent;
}

function onSaveLineData() {
    saveLineData();
}

function drawImg2() {
    const img = new Image();
    img.onload = () => {
        gCtx2.drawImage(img, 0, 0, gCanvas2.width, gCanvas2.height);
    }
    img.src = './meme-imgs-square/10.jpg';
}



/////  Render Canvas And Update Model   /////

function onRenderCanvasAndUpdateModel() {
    assignLineCoordiantes();
    onSaveLineData();
    clearCanvas();
    drawMeme();
}

////   UPDATE   CURRENT LINE STATE - VARIABLES AND CONTROL PANEL /////

function updateCurrentLineProperties() {
    gCurrText = gCurrLine.txt;
    //gCurrentLineNumber = 0;
    gCurrFont = gCurrLine.font
    gCurrAlign = gCurrLine.align
    gCurrStrokeColor = gCurrLine.strokeColor
    gCurrFillColor = gCurrLine.fillColor
    gCurrFontSize = gCurrLine.fontSize
    gCurrStrokeWidth = gCurrLine.strokeWidth
    gCurrX = gCurrLine.x
    gCurrY = gCurrLine.y
    gCurrLineId = gCurrLine.lineId
    gCurrBaseline = gCurrLine.baseline;
    gCurrTextAlign = gCurrLine.textAlign;
    gCurrLinePosition = gCurrLine.position;
}

function updateControlMemePanel() {
    document.querySelector('.words-input').value = gCurrText;
    document.querySelector('.dropbtn').innerHTML = `     
   ${gCurrFont}<i class="fa fa-caret-down"></i>`
    //to change later color values
}


///// GET MEME'S LINE DATA FROM USER - CONTROL CANVAS LINES FUNCTIONS  /////

function markSelectedLine() {
    var y = (gCurrLine.y - gCurrLine.fontSize - 2)
    var width = gCanvas.width;
    var height = (gCurrLine.fontSize + 16)
    gCtx.rect(0, y, width, height); /// x, y, width, height
    gCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    gCtx.fillRect(0, y, width, height);
}


function copmensateAlignTexts() {
    let text = gCtx.measureText(gCurrText);
    var textWidth = text.width;
    if (gCurrAlign === 'center' || textWidth < 250) {
        gCurrX = 0.5 * gCanvas.width
    } else if (textWidth > 250 && (gCurrAlign === 'right' || gCurrAlign === 'left')) {
        if (gCurrAlign === 'right') {
            gCurrX = (0.5 * gCanvas.width + (textWidth - (0.5 * gCanvas.width)) + 40)
        } else if (gCurrAlign === 'left') {
            gCurrX = ((0.5 * gCanvas.width - (textWidth - (0.5 * gCanvas.width))) - 40)
        }
    }
}

function onSetStrokeColor() {
    gCurrStrokeColor = document.querySelector('#favcolor2').value;
    onRenderCanvasAndUpdateModel()

}

function onSetFillColor() {
    gCurrFillColor = document.querySelector('#favcolor').value;
    onRenderCanvasAndUpdateModel();
}

function onSetText(ev) {
    gCurrText = document.querySelector('.words-input').value;
    copmensateAlignTexts();
    onRenderCanvasAndUpdateModel();
}



function onSetFont(font) {
    gCurrFont = font;
    document.querySelector('.dropbtn').innerHTML = `     
${font}<i class="fa fa-caret-down"></i>`
    copmensateAlignTexts();
    onRenderCanvasAndUpdateModel();
}

function onSwitchLine() {
    if (gFocusedLineIdxInOrderArray === (gLinesOrderArray.length - 1)) gFocusedLineIdxInOrderArray = 0
    else gFocusedLineIdxInOrderArray++;
    gCurrLineId = gLinesOrderArray[gFocusedLineIdxInOrderArray];
    switchLine(gCurrLineId);
    updateCurrentLineProperties();
    updateControlMemePanel();
    onRenderCanvasAndUpdateModel()
    markSelectedLine();
}

function onAddLine() {
    if (document.querySelector('.words-input').value === '') return
    determineLinePosition();
    gCurrText = '';
    document.querySelector('.words-input').value = '';
    onCreateNewLine();
    var idxInSplice = checkHowManyLinesAbove()
    gLinesOrderArray.splice(idxInSplice, 0, gCurrLine.lineId)
    gFocusedLineIdxInOrderArray = idxInSplice;
    onRenderCanvasAndUpdateModel();
    markSelectedLine();
    //reAssignGlobalVariables();
}

function checkHowManyLinesAbove() {
    return checkLinesAbove()
}

function onRemoveLine() {
    if (gMeme.lines.length <= 0) return
    removeLine(gCurrLineId);
    var linesOrderIdx = gLinesOrderArray.findIndex(lineId => lineId === gCurrLineId);
    console.log(linesOrderIdx)
    gLinesOrderArray.splice(linesOrderIdx, 1)
    document.querySelector('.words-input').value = '';
    if (gMeme.lines.length > 0) {
        gCurrLine = gMeme.lines[0];
        gCurrLineId = gMeme.lines[0].lineId
        var linesorderIdxNew = gLinesOrderArray.findIndex(item => item === gCurrLineId)
        console.log(linesorderIdxNew)
        gFocusedLineIdxInOrderArray = gLinesOrderArray[linesorderIdxNew];
        updateCurrentLineProperties();
        updateControlMemePanel();
        onRenderCanvasAndUpdateModel()
        markSelectedLine();
    } else {
        reAssignGlobalVariables();
        init();
        onRenderCanvasAndUpdateModel();
    }
}

function onEnlargeFont() {
    gCurrFontSize++;
    copmensateAlignTexts();
    onRenderCanvasAndUpdateModel();
}

function onDownSizeFont() {
    gCurrFontSize--;
    copmensateAlignTexts();
    onRenderCanvasAndUpdateModel();
}

function onAlignText(direction) {
    gCurrAlign = direction;
    copmensateAlignTexts();
    onRenderCanvasAndUpdateModel();
}

function onPushLineUp() {
    gCurrY -= 5;
    onRenderCanvasAndUpdateModel()
}

function onPushLineDown() {
    gCurrY += 5;
    onRenderCanvasAndUpdateModel()
}


function addEvenetListeners() {
    var input = document.querySelector(".search-input");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) onSearchingtWord()
    })
}

function onSearchingWord() {
    var searchedWord = document.querySelector('.search-input').value;
    var filteredImgs = filteredPicturesArray(searchedWord);

    renderImages(filteredImgs)
}

//////    DOWNLOAD   -  SHARE - NEW MEM  //////

function downloadCanvas(elLink) {

    onCancelTransparentCanvas();
    onCreateImageCanvas();
    const data = gCanvas2.toDataURL("image/jpeg");
    onSaveReadyMeme(data)
    //console.log(data)
    elLink.href = data;
    elLink.download = 'my-image.jpg';
    onCancelImageCanvas();
    onCreateTransparentCanvas();
    gCurrText = document.querySelector('.words-input').value = '';
    init();
}

function onSaveReadyMeme(dataUrl) {
    createAndSaveReadyMeme(dataUrl)
}

function onCreateNewMeme() {
    renderImages()
    document.querySelector('.meme-container').classList.add('none-display');
    document.querySelector('.images-container').classList.remove('none-display');
    document.querySelector('.about').classList.add('none-display');
    onCancelImageCanvas();
    onCreateTransparentCanvas();
    gCurrText = document.querySelector('.words-input').value = '';
    init();
}

function drawImg() {
    const elImg = document.querySelector('.canvas-image');
    gCtx.drawImage(elImg, 0, 0, gCanvas2.width, gCanvas2.height);
}


function onCancelTransparentCanvas() {
    clearCanvas()
    document.querySelector('.canvas-container').classList.add('none-display');
    document.querySelector('.backround-image').classList.add('none-display');
    document.querySelector('#myCanvas').classList.add('none-display');
}

function onCreateImageCanvas() {
    document.querySelector('.canvas-container2').classList.remove('none-display');
    document.querySelector('#myCanvas2').classList.remove('none-display');
    gCanvas2 = document.getElementById('myCanvas2');
    gCtx = gCanvas2.getContext('2d');
    
    drawImg();
    drawMeme();
}

function onCreateTransparentCanvas() {
    document.querySelector('.canvas-container').classList.remove('none-display');
    document.querySelector('.backround-image').classList.remove('none-display');
    document.querySelector('#myCanvas').classList.remove('none-display');
}

function onCancelImageCanvas() {
    clearCanvas()
    document.querySelector('.canvas-container2').classList.add('none-display');
    document.querySelector('#myCanvas2').classList.add('none-display');
    gCanvas2 = document.getElementById('myCanvas2');
}


//////  UPLOAD  /  SHARE   /////////


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}