module.exports = {
    getMimeType: function(sImageHex) {
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
            case "49492A0":
            case "4D4D002A":
                return "image/tif";
            case "25504446":
                return "application/pdf";
            case "000001BA":
                return "application/mpg";
            case "000001B3":
                return "application/mpeg";
            case "464F524D":
            case "46415858":
                return "text/plain";
            default:
                return sImageHex;
            }
    }
}