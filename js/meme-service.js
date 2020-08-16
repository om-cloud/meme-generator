'use strict'
var gReadyMemes;


var KEY = 'myReadyMemes';

/////   PRIVATE FUNCTIOS   /////



function _createReadyMemes() {
    var readyMemes = getReadyMemes();
    if (!readyMemes || readyMemes.length === 0) {
        gReadyMemes = [{
                id: 0,
                url: 'ready-memes/1.jpg'
            },
            {
                id: 1,
                url: 'ready-memes/2.jpg'
            },
            {
                id: 2,
                url: 'ready-memes/3.jpg'
            },
            {
                id: 3,
                url: 'ready-memes/4.jpg'
            },
            {
                id: 4,
                url: 'ready-memes/5.jpg'
            },
            {
                id: 5,
                url: 'ready-memes/6.jpg'
            },
            {
                id: 6,
                url: 'ready-memes/7.jpg'
            },
            {
                id: 7,
                url: 'ready-memes/8.jpg'
            }
        ]
    } else {
        gReadyMemes = readyMemes
    }
}


var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

function _createImages() {
    gImgs = [{
            id: 0,
            url: 'meme-imgs-square/18.jpg',
            keywords: ['love', 'funny', 'unconscious']
        },
        {
            id: 1,
            url: 'meme-imgs-square/1.jpg',
            keywords: ['happy', 'Funny', 'Evil']
        },
        {
            id: 2,
            url: 'meme-imgs-square/2.jpg',
            keywords: ['happy', 'Cute']
        },
        {
            id: 3,
            url: 'meme-imgs-square/3.jpg',
            keywords: ['happy', 'cute']
        },
        {
            id: 4,
            url: 'meme-imgs-square/4.jpg',
            keywords: ['happy', 'cute']
        },
        {
            id: 5,
            url: 'meme-imgs-square/5.jpg',
            keywords: ['happy', 'power', 'ugly']
        },
        {
            id: 6,
            url: 'meme-imgs-square/6.jpg',
            keywords: ['happy', 'stupid', 'funny']
        },
        {
            id: 7,
            url: 'meme-imgs-square/7.jpg',
            keywords: ['happy', 'scarry']
        },
        {
            id: 8,
            url: 'meme-imgs-square/8.jpg',
            keywords: ['happy', 'funny']
        },
        {
            id: 9,
            url: 'meme-imgs-square/9.jpg',
            keywords: ['happy', 'ugly', 'uunny']
        },
        {
            id: 10,
            url: 'meme-imgs-square/10.jpg',
            keywords: ['happy']
        },
        {
            id: 11,
            url: 'meme-imgs-square/11.jpg',
            keywords: ['happy', 'cute']
        },
        {
            id: 12,
            url: 'meme-imgs-square/12.jpg',
            keywords: ['happy', 'power', 'ugly']
        },
        {
            id: 13,
            url: 'meme-imgs-square/13.jpg',
            keywords: ['happy', 'stupid', 'funny']
        },
        {
            id: 14,
            url: 'meme-imgs-square/14.jpg',
            keywords: ['happy', 'scarry']
        },
        {
            id: 15,
            url: 'meme-imgs-square/15.jpg',
            keywords: ['happy', 'funny']
        },
        {
            id: 16,
            url: 'meme-imgs-square/16.jpg',
            keywords: ['happy', 'ugly', 'uunny']
        },
        {
            id: 17,
            url: 'meme-imgs-square/17.jpg',
            keywords: ['happy','bitter']
        },
        {
            id: 18,
            url: 'meme-imgs-square/18.jpg',
            keywords: ['happy', 'ugly', 'funny']
        },
        {
            id: 19,
            url: 'meme-imgs-square/19.jpg',
            keywords: ['happy', 'sweet']
        },
        {
            id: 21,
            url: 'meme-imgs-square/21.jpg',
            keywords: ['happy', 'power', 'ugly']
        },
        {
            id: 22,
            url: 'meme-imgs-square/22.jpg',
            keywords: ['happy', 'stupid', 'funny']
        },
        {
            id: 23,
            url: 'meme-imgs-square/23.jpg',
            keywords: ['happy', 'scarry']
        },
        {
            id: 24,
            url: 'meme-imgs-square/24.jpg',
            keywords: ['happy', 'funny']
        },
        {
            id: 25,
            url: 'meme-imgs-square/25.jpg',
            keywords: ['happy', 'ugly', 'uunny']
        },
        {
            id: 26,
            url: 'meme-imgs-square/26.jpg',
            keywords: ['happy']
        },
        {
            id: 27,
            url: 'meme-imgs-square/27.jpg',
            keywords: ['happy', 'cute']
        },
        {
            id: 28,
            url: 'meme-imgs-square/28.jpg',
            keywords: ['happy', 'power', 'ugly']
        },
        {
            id: 29,
            url: 'meme-imgs-square/29.jpg',
            keywords: ['happy', 'stupid', 'funny']
        },
        {
            id: 30,
            url: 'meme-imgs-square/30.jpg',
            keywords: ['happy', 'scarry']
        },
        {
            id: 31,
            url: 'meme-imgs-square/31.jpg',
            keywords: ['happy', 'funny']
        },
        {
            id: 32,
            url: 'meme-imgs-square/32.jpg',
            keywords: ['happy', 'ugly', 'uunny']
        },
        {
            id: 33,
            url: 'meme-imgs-square/33.jpg',
            keywords: ['happy','bitter']
        },
        {
            id: 34,
            url: 'meme-imgs-square/34.jpg',
            keywords: ['happy', 'ugly', 'funny']
        }
    ];

}



var gMemes = [{
        id: 0,
        selectedImgId: 10,
        selectedLineIdx: 0,
        lines: [{
            lineId: 0,
            txt: 'I never eat Falafel',
            fontSize: 20,
            align: 'left',
            strokeColor: 'red',
            fillColor: 'white',
            font: 'Arial',
            fontWidth: '1',
            x: 100,
            y: 100
        }]
    },
    {
        id: 1,
        selectedImgId: 9,
        selectedLineIdx: 0,
        lines: [{
            lineId: 0,
            txt: 'I do',
            fontSize: 30,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            font: 'Arial',
            fontWidth: '1',
            x: 100,
            y: 100
        }]
    }

]





function _createMeme(imgId ) {
    var Meme = {
        id: makeId(),
        selectedImgId: imgId,
        lines: []
    }
    gMemes.push(Meme)
    return Meme

}


function _createNewMemeLine(memeId, txt, fontSize, align, strokeColor,
    fillColor, font, strokeWidth, textAlign, baseline, lineX, lineY, position) {
    var line = {
        memeId: memeId,
        lineId: createLineId(memeId),
        txt: txt,
        fontSize: fontSize,
        align: align,
        strokeColor: strokeColor,
        fillColor: fillColor,
        font: font,
        strokeWidth: strokeWidth,
        textAlign: textAlign,
        baseline: baseline,
        x: lineX,
        y: lineY,
        position: position
    }
    gCurrLineId = line.lineId;
    gMeme.lines.push(line);
    return line
}



/////  CREATE FUNCTIONS   /////


function createReadyMemes() {
    _createReadyMemes();
}

function createImages() {
    _createImages()
}

function assignCanvasImage() {
    gImgId = gImgs[10].id; //change to user selection from gallery
    gImg = findImgById(gImgId);
    gImgUrl = gImg.url;
}

function createNewMeme(imgId) {
    gMeme = _createMeme(imgId)
}



function createNewLine() {
    gCurrLine = _createNewMemeLine(gMeme.id, gCurrText, gCurrFontSize,
        gCurrAlign, gCurrStrokeColor, gCurrFillColor,
        gCurrFont, gCurrStrokeWidth, gCurrTextAlign, gCurrBaseline,
        gCurrX, gCurrY, gCurrLinePosition)
}
function createLineId() {
    return makeId()
}



function addMeme(Memename, author, price, url) {
    var Meme = _createMeme(Memename, author, price, url);
    var Memes = gMemes;
    Memes.unshift(Meme);
    gMemes = Memes;
    _saveMemesToStorage();
}

////////////////////////////////////////////////



/////  Filtering Images  ////////


function checkWordInArray(wordsArray, searchedWord) {
    var x=false;
    wordsArray.forEach((word) => {
        if (word.trim().toLowerCase() === searchedWord.trim().toLowerCase()) {
        x=true;
        return x
        }
    })
    return x
}


function filteredPicturesArray(searchedWord) {
    var filteredImgsArray=[];
      gImgs.forEach((img) => {
        var arr=img.keywords
        if(checkWordInArray(arr, searchedWord)) filteredImgsArray.push(img)
    })
    return filteredImgsArray;
}

///////////////////////////////////////////////////////



function findImgById(Id) {
    return gImgs.find(img => img.id === Id)
}

function removeMeme(Id) {
    var idx = gMemes.findIndex(meme => meme.id === Id)
    gMemes.splice(idx, 1);
    _saveMemesToStorage();
}

function findMemeById(Id) {
    return gMemes.find(meme => meme.id === Id)
}


function findLineIdxById(Id) {
    return gMeme.lines.findIndex(line => line.lineId === Id)
}

function findLineById(Id) {
    return gMeme.lines.find(line => line.lineId === Id)
}



function assignCurrentLine(Id) {
    var idx = gMeme.lines.findIndex(line => line.lineId === Id)
    return idx
}

function getId() {
    if (!gMemes || gMemes.length === 0) return 0
    else return gMemes.length + 1;
}


function switchLine(Id) {
    var idx = findLineIdxById(Id)
    gCurrLine = gMeme.lines[idx];
}

function removeLine(id) {
    var lineIdx = findLineIdxById(id);
    console.log(lineIdx)
    gMeme.lines.splice(lineIdx, 1);
}

function checkWhichLinesExistInMem() {
    return gMeme.lines.map(line => line.position)
}

function checkLinesAbove() {
    var counter = 0;
    var lineIdx = findLineIdxById(gCurrLineId);
    var lineY = gMeme.lines[lineIdx].y
    gMeme.lines.forEach((line) => {
        if ((line.y + 5) < lineY) counter++
    })
    return counter
}

function findImgIdxById(Id) {
    return gImgs.findIndex(img => img.id === Id);
}



/////   SAVE TO MODEL   /////

function saveLineData() {
    var lineIdx = findLineIdxById(gCurrLineId);

    gMeme.lines[lineIdx].txt = gCurrText;
    gMeme.lines[lineIdx].fontSize = gCurrFontSize;
    gMeme.lines[lineIdx].align = gCurrAlign;
    gMeme.lines[lineIdx].strokeColor = gCurrStrokeColor;
    gMeme.lines[lineIdx].fillColor = gCurrFillColor;
    gMeme.lines[lineIdx].font = gCurrFont
    gMeme.lines[lineIdx].strokeWidth = gCurrStrokeWidth;
    gMeme.lines[lineIdx].textAlign = gCurrTextAlign;
    gMeme.lines[lineIdx].baseline = gCurrBaseline
    gMeme.lines[lineIdx].x = gCurrX;
    gMeme.lines[lineIdx].y = gCurrY;
    gMeme.lines[lineIdx].position = gCurrLinePosition;
}


//////  READY MEMES   //////



function _createReadyMeme(dataUrl) {
    var readyMeme = {
        id: makeId(),
        dataUrl: dataUrl
    }
    gReadyMemes.push(readyMeme);
}

function createAndSaveReadyMeme(dataUrl) {
    _createReadyMeme(dataUrl);
    _saveReadyMemesToStorage()
}


/////   SAVE / GET TO STORAGE   /////


function saveMemes() {
    _saveMemesToStorage()
}

function getMemes() {
    gMemes = _getMemesFromStorage;
}



function getReadyMemes() {
    var memes = _getReadyMemesFromStorage();
    console.log(memes)
    return memes
}



///// PRIVATE SAVE / GET FUNCTIONS  //////


function _saveReadyMemesToStorage() {
    saveToStorage(KEY, gReadyMemes);
}

function _getReadyMemesFromStorage() {
    return loadFromStorage(KEY);
}