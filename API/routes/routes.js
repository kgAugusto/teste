var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");


router.get('/', HomeController.index);
router.post('/', HomeController.new);
router.get('/:id', HomeController.findId);
router.put("/", HomeController.edit);
router.delete('/:id', HomeController.remove);


module.exports = router;