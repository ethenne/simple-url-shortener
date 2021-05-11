const router = require('express').Router();
const urlModel = require('../model/url.model');
const urlHelper = require('../helpers/url.helper')

router.route('/:id').get((req, res) => {
  urlModel.findOne({ shortUrlId: req.params.id })
    .then(url => res.redirect(301, url.longURL))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/url').post((req, res) => {
  if (!!urlHelper.validateUrl(req.body.url))
    return res.status(400).json('URL is invalid');

  const longURL = req.body.url;
  const shortUrlId = urlHelper.generateUrlKey();
  const shortURL = `http://localhost:5000/shorten/${shortUrlId}`

  const newUrl = new urlModel({ longURL, shortURL, shortUrlId });

  newUrl.save()
    .then(() => res.json({ shortURL }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;