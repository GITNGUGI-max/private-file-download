Private S3 File Download
A Node.js command-line project that generates a presigned URL for downloading a private file from Amazon S3. Each generated URL is configured to expire after 60 seconds.

The project runs locally using an AWS profile and on Amazon EC2 using an attached IAM role.
Technologies
- Node.js 24 (tested with v24.22.1)
- AWS SDK for JavaScript v3
- Amazon S3, AWS IAM, and Amazon EC2
How it works
1. The script obtains AWS credentials through the SDK's default credential provider chain.
2. It signs a GetObject request for the configured S3 object.
3. The script prints a temporary URL.
4. A browser or HTTP client uses that URL to download the file directly from S3.
On EC2, the SDK can obtain temporary credentials from the instance's attached IAM role. The lab deployment uses PrivateFileDownloadEc2Role.
Requirements and configuration
- Node.js and npm.
- A private S3 bucket containing the file to download.
- AWS credentials with s3:GetObject permission for that object.
- The bucket name, object key, and AWS region configured in generate-link.js.
The completed lab uses region af-south-1, object sample.txt, and a 60-second URL lifetime. Update the script's configuration when using your own bucket.
Run locally
Configure an AWS profile named private-download on your computer. From the project folder in Git Bash, run:
npm ci
AWS_PROFILE=private-download node generate-link.js
Open the generated URL before it expires.
Run on EC2
Attach an IAM role with the required S3 permissions to the instance. Place the project files in ~/private-file-download, then run:
cd ~/private-file-download
npm ci
node generate-link.js
The SDK uses the attached role when higher-priority credential sources do not override it.

To inspect the AWS identity using an installed AWS CLI:
aws sts get-caller-identity --region af-south-1
For this lab, the returned ARN contains assumed-role/PrivateFileDownloadEc2Role/.
Check link expiry
First, confirm the generated URL downloads the file. After more than 60 seconds have passed since URL generation, make a fresh request to the same URL.

In Bash, run this command, paste the complete original URL at the prompt, and press Enter:
read -r -p "Paste the full download URL: " download_url
Then run:
curl -i "$download_url"
The expired request should be rejected with an expiry message such as Request has expired. Quoting the variable preserves the URL's & separators.
Validation completed
Check	Result
Local download before expiry	Passed
Local link expiry	Passed
EC2 identity uses the intended IAM role	Passed
Download using an EC2-generated link	Passed
EC2-generated link expiry	Passed


Project files
File	Purpose
generate-link.js	Generates the temporary S3 download URL
package.json	Declares the project and its dependencies
package-lock.json	Records dependency versions
.gitignore	Excludes dependencies and local credential files from Git
README.md	Documents setup, execution, and verification


References
- AWS: Using presigned URLs
- AWS SDK for JavaScript: Credentials in Node.js