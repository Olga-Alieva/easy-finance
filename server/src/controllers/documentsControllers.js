const path = require('path');

const { User, Entry, Document } = require('../db/models');

const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

const renderDocuments = async (req, res) => {
  const userId = req.session?.userId;
  const { year } = req.body;
  if (userId) {
    try {
      const documents = await Document.findAll({ where: { year, user_id: userId }, raw: true });
      res.json(documents);
    } catch (err) {
      console.log(err);
    }
  }
};

const uploadDocument = async (req, res) => {
  const userId = req.session?.userId;
  const { year, title } = req.body;
  if (userId) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
      }
      const sampleFile = req.files.doc;
      const filename = `${new Date().getTime()}_${sampleFile.name.replaceAll(' ', '_')}`;

      sampleFile.mv(`${uploadsDir}/${filename}`, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.redirect('/documents');
      });

      const newDoc = await Document.create({
        user_id: userId,
        year,
        title,
        path: `/uploads/${filename}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = { renderDocuments, uploadDocument };
