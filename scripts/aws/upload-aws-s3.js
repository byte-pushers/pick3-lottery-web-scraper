//var AWS = require("aws-sdk");
var AWS_Global = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');
//var uuid = require('node-uuid');
var fs = require('fs');

var filename = "pick3-lottery-web-scraper.features.test.1.2018.03.23.T.14.54.12.zip";
var bucketName = "com.bytepushers.chucks-pick3";
var targetApiVersion = "2006-03-01";
var targetRegion = "us-east-1";
var credentials = {
    accessKeyId: process.argv[2],
    secretAccessKey: process.argv[3]
};

//AWS.config.update({region: 'us-west-1', credentials: { accessKeyId: "<YOUR_ACCESS_KEY_ID>", secretAccessKey: "<YOUR_SECRET_ACCESS_KEY>"});
//AWS.config.update({region: targetRegion});

function createS3Client() {
    return new S3({/*
        apiVersion: targetApiVersion,*//*
        region: targetRegion,*/
        /*credentials: credentials*/
    });
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

