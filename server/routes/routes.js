module.exports = app => {
  const productModule = require("../controllers/controller.js");

  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname.split(' ').join('_')}`);
    }
  });

  var upload = multer({ storage: storage });

  
  // app.post("/get_products", productModule.getAll);
  // app.post("/get_products_menu", productModule.get_products_by_menu);
  // app.post("/add_product", productModule.create);
  
  app.post("/get_product_id", productModule.get_product_by_id);
  app.post("/edit_product", productModule.edit);
  app.post("/del", productModule.del);
  app.post("/upload", upload.single('file'), productModule.upload);

  // app.post("/delete_product", productModule.delete);
  
}
