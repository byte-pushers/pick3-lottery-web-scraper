process.argv.forEach(function (val, index) {
    console.log(index + ': ' + val);
});

var fs = require('fs');
var AdmZip = require('adm-zip');
var datetime = require('node-datetime');

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
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
    return '../../pick3-lottery-web-scraper.zip';
}

function getAwsDeploymentPackagePath() {
    var filename;
    var dt = datetime.create();
    var formatted = dt.format('Y.m.d.T.H.M.S');
    var branchName = (process.argv[2] !== undefined && process.argv[2] !== null) ? process.argv[2] : "NA";
    var commitNumber = (process.argv[3] !== undefined && process.argv[3] !== null) ? process.argv[3] : "NA";

    branchName = branchName.replace(/\//g, ".");

    console.log("Branch Name: " + branchName);
    console.log("Commit Number: " + commitNumber);

    filename = '../../build/pick3-lottery-web-scraper.' + branchName + '.' + commitNumber + '.' + formatted + '.zip';

    console.log("File Name: " + filename);

    return filename;
}

function createAwsDeploymentPackage(awsDeploymentSourcePackagePath) {
    console.log("createAwsDeploymentPackage() method: awsDeploymentSourcePackagePath: " + awsDeploymentSourcePackagePath);

    printOutWorkspaceInfo();

    //create a zip object to hold the new zip files
    var newZip = new AdmZip();

    // reading archives
    var zip = new AdmZip(awsDeploymentSourcePackagePath);
    var zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function (zipEntry) {
        var fileName = zipEntry.entryName;
        var fileContent = zip.readAsText(fileName);

        if (fileName.indexOf("/") > -1) {
            if (fileName.indexOf("src/main/javascript") > -1 && fileName.indexOf("node_modules") == -1) {
                var newFileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                newZip.addFile(newFileName, fileContent, '', 0644 << 16);
            } else if (fileName.indexOf("node_modules") > -1) {
                newZip.addFile(fileName, fileContent, '', 0644 << 16);
            }
        }
    });

    console.log("createAwsDeploymentPackage() method: about to write to new zip file.");
    newZip.writeZip(getAwsDeploymentPackagePath());  //write the new zip
}

function printOutWorkspaceInfo() {
    console.log("current directory is " + __dirname);

    fs.readdirSync(__dirname).forEach(file => {
        console.log(file);
    });

    console.log("../../ is : ");
    fs.readdirSync("../../").forEach(file => {
        console.log(file);
    });

    console.log("../../byte-pushers is : ");
    fs.readdirSync("../../byte-pushers").forEach(file => {
        console.log(file);
    });

    console.log("../../byte-pushers/pick3-lottery-web-scraper is : ");
    fs.readdirSync("../../byte-pushers/pick3-lottery-web-scraper").forEach(file => {
        console.log(file);
    });


    console.log("../../build is : ");
    fs.readdirSync("../../build").forEach(file = > {
        console.log(file);
    });
}

clean();
createAwsDeploymentPackage(getAwsDeploymentSourcePackagePath());