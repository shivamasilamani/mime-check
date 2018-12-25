exports.getMimeType = function(sFileContent) {
    if (typeof sFileContent !== "object") throw new TypeError("mimetype-check wants a file!");

    const oBlob = sFileContent.slice(0, 4);
    const sMimeType = _checkContent(oBlob);
    return sMimeType;
};

function _checkContent(oBlob){
    let uint = new Uint8Array(oBlob);
    let aBytes = [];
    uint.forEach(function (byte) {
        aBytes.push(byte.toString(16));
    });
    let sImageHex = aBytes.join("").toUpperCase();
    let sMimeType = _getMimeType(sImageHex);
    return sMimeType;
}

function _getMimeType(sImageHex){
    switch (sImageHex) {
        case "89504E47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "FFD8FFDB":
        case "FFD8FFE0":
        case "FFD8FFE1":
        case "FFD8FFEE":
            return "image/jpeg";
        case "49492A00":
        case "4D4D002A":
            return "image/tif";
        case "255044462D":
            return "application/pdf";
        default:
            return false;
        }
}