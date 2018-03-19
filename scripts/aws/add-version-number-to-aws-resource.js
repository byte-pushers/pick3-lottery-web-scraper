var fs = require('fs');
var AdmZip = require('adm-zip');
var datetime = require('node-datetime');
var awsResourceFileName = "pick3-lottery-web-scraper";

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function clean() {
    if (fs.existsSync("../../build")) {
        deleteFolderRecursive("../../build");
    }

    fs.mkdirSync("../../build");
}

function getAwsDeploymentSourcePackagePath() {
    return '../../' + awsResourceFileName + '.zip';
}

function getAwsDeploymentPackagePath() {
    var dt = datetime.create();
    var formatted = dt.format('Y-m-dTH-M-S');
    var branchName = process.argv[2];
    var commitNumber = process.argv[3];

    return '../../build/' + awsResourceFileName + '.'+ branchName + '.' + commitNumber +'.'+ formatted + '.zip';
}

function createAwsDeploymentPackage(awsDeploymentSourcePackagePath) {
    //create a zip object to hold the new zip files
    var newZip = new AdmZip();

    // reading archives

    var zip = new AdmZip(awsDeploymentSourcePackagePath);
    var zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function(zipEntry) {
        var fileName = zipEntry.entryName;
        var fileContent = zip.readAsText(fileName);

        if (fileName.indexOf("/") > -1) {
            if (fileName.indexOf("src/main/javascript") > -1)  {
                var newFileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                newZip.addFile(newFileName, fileContent, '', 0644 << 16);
            } else if (fileName.indexOf("node_modules") > -1) {
                newZip.addFile(fileName, fileContent, '', 0644 << 16);
            }
        }
    });

    newZip.writeZip(getAwsDeploymentPackagePath());  //write the new zip
}

clean();
createAwsDeploymentPackage(getAwsDeploymentSourcePackagePath());