'use strict';

const qr = require('qr-image');
const fs = require('fs');

// Syntax for commandline:
// node qrnew "Encode this string" "imahe-name.png"

// Below code imports a module and generates a qr image
let dataToEncode = process.argv[2] || null;
let outImage = process.argv[3] || null;
if(dataToEncode !==null && outImage !==null) {
    qr.image(dataToEncode, {
        type: 'png',
        size: 20
    }).pipe(fs.createWriteStream(outImage));

    console.log('QR image generated');

} else {
    console.log('Please check the number of arguements!');
}