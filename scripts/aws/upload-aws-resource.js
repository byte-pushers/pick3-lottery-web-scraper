var S3 = require('aws-sdk/clients/s3');
var fs = require('fs');

var bucketName = "com.bytepushers.chucks-pick3";
var TRAVIS_BUILD_DIR = (process.argv[2] !== undefined && process.argv[2] !== null)? process.argv[2] : ".";

TRAVIS_BUILD_DIR += "/build";

function createS3Client() {
    return new S3();
}

function uploadToS3Bucket(s3, resource){
    var params = {
            Bucket: bucketName,
            Key: resource.key,
            Body: resource.value
        },
        putObjectPromise = s3.putObject(params).promise();

    putObjectPromise.then(function(data) {
        console.log('Success: data: ' + data, data);
    }).catch(function(err) {
        console.log('An error occurred: ' + err);
    });
}

function getResource() {
    var filename = fs.readdirSync(TRAVIS_BUILD_DIR)[0];
    var resourceBase64Data, resourceData = fs.readFileSync(TRAVIS_BUILD_DIR + "/" +filename);

    resourceBase64Data = new Buffer(resourceData, 'binary');

    return {key: filename, value: resourceBase64Data};
}


uploadToS3Bucket(createS3Client(), getResource());