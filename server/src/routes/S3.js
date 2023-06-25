const multer = require('multer')
const path = require('path')
const S3 = require('aws-sdk/clients/s3')
const multers3 = require('multer-s3')

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

const upload = multer({
  storage: multers3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname)
      const originName = path.basename(file.originalname, ext);
      cb(null, originName + '#'+Math.round(Math.random() * 1E6) + ext)
    }
  })
})
module.exports = upload
