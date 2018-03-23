var S3 = require('aws-sdk/clients/s3');
var fs = require('fs');

var filename = "pick3-lottery-web-scraper.features.test.1.2018.03.23.T.14.54.12.zip";
var bucketName = "com.bytepushers.chucks-pick3";

function createS3Client() {
    return new S3();
}

function uploadToS3Bucket(s3, key, resource){
    var params = {
            Bucket: bucketName,
            Key: key,
            Body: resource
        },
        putObjectPromise = s3.putObject(params).promise();

    putObjectPromise.then(function(data) {
        console.log('Success: data: ' + data, data);
    }).catch(function(err) {
        console.log(err);
    });
}

function getResource() {
    var resourceBase64Data, resourceData = fs.readFileSync('build/'+filename);

    resourceBase64Data = new Buffer(resourceData, 'binary');

    return resourceBase64Data;
}

uploadToS3Bucket(createS3Client(), filename, getResource());

