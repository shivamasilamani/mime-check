const mimetypes = require("./mimetypes.js");
const fs = require("fs");

module.exports = {
    getMimeType: function (fileContent) {
        if (typeof fileContent !== "object") throw new TypeError("mimetype-check wants a file!");
        const blob = fileContent.slice(0, 4);
        const mimetype = _checkContent(blob);
        return mimetype;
    },
    getMimeTypeByPath: function (filePath, callback) {
        if (typeof filePath !== "string") {
            throw new TypeError("mimetype-check wants a file path as first argument!");
        }
        if (typeof callback !== "function") {
            throw new TypeError("mimetype-check wants a function as second argument");
        }
        fs.readFile(filePath, function (err, fileContent) {
            const mimetype = this.getMimeType(fileContent);
            callback(err, mimetype);
        }.bind(this));
    },
    getMimeTypeByPathSync: function (filePath) {
        if (typeof filePath !== "string") throw new TypeError("mimetype-check wants a file path!");
        const fileContent = fs.readFileSync(filePath);
        const mimetype = this.getMimeType(fileContent);
        return mimetype;
    },
}

function _checkContent(blob) {
    let uint = new Uint8Array(blob);
    let bytes = [];
    uint.forEach(function (byte) {
        bytes.push(byte.toString(16));
    });
    let imageHex = bytes.join("").toUpperCase();
    const mimetype = mimetypes.getMimeType(imageHex);
    return mimetype;
}