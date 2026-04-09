// shareRoutes.js — what you need to add
const express = require('express');
const router = express.Router();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
const authMiddleware = require('../middleware/auth');

const s3 = new S3Client({ region: process.env.AWS_REGION });
const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));

// Generate a shareable link (valid 24 hours)
router.get('/share/:fileId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const { fileId } = req.params;
    const expiresIn = 60 * 60 * 24; // 24 hours

    const result = await db.send(new GetCommand({
      TableName: 'nimbus-files',
      Key: { userId, fileId }
    }));

    if (!result.Item)
      return res.status(404).json({ error: "File not found" });

    const shareUrl = await getSignedUrl(s3, new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: result.Item.s3Key,
      ResponseContentDisposition: `attachment; filename="${result.Item.fileName}"`
    }), { expiresIn });

    res.json({
      shareUrl,
      fileName: result.Item.fileName,
      expiresIn: '24 hours'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;