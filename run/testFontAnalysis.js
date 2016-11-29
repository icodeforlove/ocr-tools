var IJS=require('image-js');
var loadFingerprints=require('../src/util/loadFingerprints');
var runFontAnalysis=require('../src/runFontAnalysis');
var symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS

var options={
    roiMinSurface: 30,
    roiPositive: true,
    roiNegative: false,
    greyThreshold: 0.5,
    fingerprintMinSimilarity:0.7, // minimal similarity to consider the result,
    fingerprintWidth: 12,
    fingerprintHeight: 12
};

var fingerprints=loadFingerprints({
    width: options.fingerprintWidth,
    height: options.fingerprintHeight,
    category: symbols.label
});


console.log('Analysing',fingerprints.length,'different fonts');

IJS.load('demo/ocrb.png').then(function(image) {
    var results=runFontAnalysis(image, fingerprints, options);
    
    results=results.slice(0,5);
    
    for (var result of results) {
        console.log('----------',result.font, '--',
            'Total similarity: ', result.totalSimilarity, '-',
            'Total found: ', result.totalFound, '-',
            'Total not found: ', result.totalNotFound);
        for (var line of result.lines) {
            console.log(line.text);
        }
        
    }
});








