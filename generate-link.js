import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "af-south-1" });

const command = new GetObjectCommand({
  Bucket: "ngugi-private-download-20261105-4827",
  Key: "sample.txt",
  ResponseContentDisposition: 'attachment; filename="sample.txt"',
  ResponseCacheControl: "no-store",
});

try {
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  console.log(url);
} catch (error) {
  console.error("Could not create download link:", error.message);
  process.exitCode = 1;
} finally {
  s3.destroy();
}