let AWS = require('aws-sdk');
let _auth = require('./Authorizer');
let google = require('googleapis').google;
const datastore = google.datastore('v1');
exports.handler = function (event, context, callback) {
	// datastore.projects.beginTransaction({
	// 	projectId: process.env.GCLOUD_PROJECT_ID,
	// 	resource: {
	// 		transactionOptions: {
	// 			readWrite: {}
	// 		}
	// 	}
	// }).then(response => {
	// 	console.log(response.data);           // successful response
	//     /*
	//     response.data = {
	//         "transaction": "<transaction ID>"
	//     }
	//     */
	// })
	// 	.catch(err => {
	// 		console.log(err, err.stack); // an error occurred
	// 	});
	datastore.projects.commit({
		projectId: process.env.GCLOUD_PROJECT_ID,
		resource: {
			mode: "TRANSACTIONAL",
			mutations: [
				{
					insert: {
						key: {
							path: {
								kind: "Test1",
								name: "Testing1"
							}
						}
					}
				}
			],
			transaction: "EZZFoaZFvTG+IlkAp8Ghxa7nBbtimRvhnQKuJAQ0mqzV+L7pwAWkznqSyMIOdlNXcxVAU85lWym+VXTweUHcGXIBwe1nf1sTdxk7WWOWeOGN3PA2cwMnfDFfY7+VfQIsbP5+gg=="
		}
	}).then(response => {
		console.log(response.data);           // successful response
        /*
        response.data = {
            "mutationResults": [
                {
                    "version": "<version-timestamp-or-id>"
                }
            ],
            "indexUpdates": 8,
            "commitVersion": "<commit-timestamp>"
        }
        */
	})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});


	callback(null, 'Successfully executed');
}




