// const sql = require("./db.js");
const db = require("./db.js");

// constructor
const productModule = function (productGroup) {
  this.id = productGroup.id;
  this.name = productGroup.name;
  this.short_description = productGroup.short_description;
  this.long_description = productGroup.long_description;
  this.main_menu = productGroup.main_menu;
  this.sub_menu = productGroup.sub_menu;
  this.platinum = productGroup.platinum;
  this.p_image = productGroup.p_image;
  this.featured_images = productGroup.featured_images.join("|");
  // this.free_blend = productGroup.free_blend.join('|');
  // this.pro_blend = productGroup.pro_blend.join('|');
  // this.local_blend = productGroup.local_blend.join('|');
};

productModule.create = async (body, result) => {
  try {
    const [
      res,
      fields,
    ] = await sql
      .promise()
      .query(
        "INSERT INTO product SET name = ?, short_description = ?, long_description=?, main_menu=?, sub_menu=?, platinum=?, p_image=?, featured_images=?, free_blend=?, pro_blend=?, local_blend=?, created = NOW()",
        [
          body.name,
          body.short_description,
          body.long_description,
          body.main_menu,
          body.sub_menu,
          body.platinum,
          body.p_image,
          body.featured_images,
          body.free_blend,
          body.pro_blend,
          body.local_blend,
        ]
      );

    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  }
};

productModule.update = async (body, result) => {
  try {
    // const [
    //   res,
    //   fields,
    // ] = await sql
    //   .promise()
    //   .query(
    //     "UPDATE product SET name = ?, short_description = ?, long_description=?, main_menu=?, sub_menu=?, platinum=?, p_image=?, featured_images=?, free_blend=?, pro_blend=?, local_blend=? WHERE id = ?",
    //     [
    //       body.name,
    //       body.short_description,
    //       body.long_description,
    //       body.main_menu,
    //       body.sub_menu,
    //       body.platinum,
    //       body.p_image,
    //       body.featured_images,
    //       body.free_blend,
    //       body.pro_blend,
    //       body.local_blend,
    //       body.id,
    //     ]
    //   );

    // if (res.affectedRows === 0) {
    //   throw { kind: "not_found" };
    // }

    let sql = `UPDATE product SET name = ?, short_description = ?, long_description=?, main_menu=?, sub_menu=?, platinum=?, p_image=?, featured_images=?, free_blend=?, pro_blend=?, local_blend=? WHERE id = ?`;

    db.run(
      sql,
      [
        body.name,
        body.short_description,
        body.long_description,
        body.main_menu,
        body.sub_menu,
        body.platinum,
        body.p_image,
        body.featured_images,
        body.free_blend,
        body.pro_blend,
        body.local_blend,
        body.id,
      ],
      (err, rows) => {
        if (err) {
          throw err;
        }
        result(null, { id: body.id });
      }
    );
  } catch (err) {
    result(err, null);
  }
};

productModule.delete = async (ids, result) => {
  try {
    let query = [];
    ids.map((id) => {
      query.push("id = " + id);
    });
    let query_str = query.join(" OR ");

    await sql.promise().query("DELETE FROM product WHERE " + query_str);

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  }
};

productModule.getAll = async (body, result) => {
  try {
    let res;
    if (body.platinum === "on")
      res = await sql.promise().query("SELECT * FROM product");
    else if (body.platinum === "off")
      res = await sql
        .promise()
        .query("SELECT * FROM product WHERE platinum = 'off' ");

    result(null, res);
  } catch (err) {
    result(err, null);
  }
};

productModule.get_products_by_menu = async (body, result) => {
  try {
    let res;
    if (!body.sub_menu && body.platinum === "on")
      res = await sql
        .promise()
        .query("SELECT * FROM product WHERE main_menu = ? ", [body.main_menu]);
    else if (!body.sub_menu && body.platinum === "off")
      res = await sql
        .promise()
        .query(
          "SELECT * FROM product WHERE main_menu = ? AND platinum = 'off' ",
          [body.main_menu]
        );
    else if (body.sub_menu && body.platinum === "on")
      res = await sql
        .promise()
        .query("SELECT * FROM product WHERE main_menu = ? AND sub_menu = ? ", [
          body.main_menu,
          body.sub_menu,
        ]);
    else if (body.sub_menu && body.platinum === "off")
      res = await sql
        .promise()
        .query(
          "SELECT * FROM product WHERE main_menu = ? AND sub_menu = ? AND platinum = 'off' ",
          [body.main_menu, body.sub_menu]
        );

    result(null, res);
  } catch (err) {
    result(err, null);
  }
};

productModule.get_product_by_id = async (body, result) => {
  try {
    
    let res;
    if (body.platinum === "on") {
      let sql = `SELECT * FROM product WHERE id = ?`;

      db.all(sql, [body.id], (err, rows) => {
        if (err) {
          throw err;
        }
        // rows.forEach((row) => {
        //   console.log(row.name);
        // });
        result(null, rows);
      });
      // res = await sql
      //   .promise()
      //   .query("SELECT * FROM product WHERE id = ? ", [body.id]);
    }

    if (body.platinum === "off") {
      let sql = `SELECT * FROM product WHERE id = ? AND platinum = 'off' `;

      db.all(sql, [body.id], (err, rows) => {
        if (err) {
          throw err;
        }
        result(null, rows);
      });
      // if (body.platinum === "off")
      //   res = await sql
      //     .promise()
      //     .query("SELECT * FROM product WHERE id = ? AND platinum = 'off' ", [
      //       body.id,
      //     ]);
    }
  } catch (err) {
    result(err, null);
  }
};

productModule.upload = async (body, today, filename, result) => {
  try {
    let new_file;

    if (
      body.name === "featured_images" ||
      body.name === "free_blend" ||
      body.name === "pro_blend" ||
      body.name === "local_blend"
    ) {
      // let resp = await sql
      //   .promise()
      //   .query("SELECT " + body.name + " FROM product WHERE id = ?", [body.id]);

      // if (resp[0][0][body.name]) {
      //   new_file = resp[0][0][body.name] + "|" + today + "/" + filename;
      // } else {
      //   new_file = today + "/" + filename;
      // }

      let sql = "SELECT " + body.name + " FROM product WHERE id = ?";

      db.all(sql, [body.id], (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows[0]);
        if (rows[0][body.name]) {
          new_file = rows[0][body.name] + "|" + today + "/" + filename;
        } else {
          new_file = today + "/" + filename;
        }

        let ttt = "UPDATE product SET " + body.name + " = ? WHERE id = ?";

        db.run(ttt, [new_file, body.id], (err, rows) => {
          if (err) {
            throw err;
          }
          result(null, { file: new_file });
        });
      });
    } else {
      new_file = today + "/" + filename;
      result(null, { file: new_file });
    }
    
  } catch (err) {
    result(err, null);
  }
};

module.exports = productModule;
