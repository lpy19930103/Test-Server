var express = require('express');
var router = express.Router();
var sql = require('../module/sqlUtil');

/* GET home page. */
router.get('/', function (req, res, next) {
    var querySql = 'SELECT * FROM company';
    console.log(sql.query(querySql, function (err, data) {
        if (err) {
            data['eMsg'] = 'company is empty';
        }
        res.json(data);
        res.end();
    }));

});

module.exports = router;