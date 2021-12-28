// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require("/assets/kare_dev/js/camera.js")

frappe.ui.form.on("Images","activate_camera", function(frm, cdt, cdn){
  var doc = locals[cdt][cdn]
  let is_created;
  if (doc.image_name) {
    show()
    submit((data) => {
      let img = data.split(",")

      console.log(`creating url......${img[1]}`)
      is_created = create_image_url(img[1], doc.image_name, doc.name, frm.doc.first_name, doc.doctype)
      console.log(`url created!!!`)
    })
    if (is_created) {
      doc.attach = is_created
    }
  } else {
    frappe.throw(__("To activate camera enter image name"))
  }
});


// API for creating image url.
// @return BOOLEAN.
// @param Base64 image data.
function create_image_url(img, name, doc_name,first_name, doctype) {
  let flag;
	frappe.call({
		method:'kare_dev.kare_dev.doctype.child_master.child_master.create_image_url',
		args: {
			'data': img,
      'image_name': name,
      'doc_name': doc_name,
      'first_name': first_name,
      'doctype': doctype
		},
		async: false,
		callback: function(r) {
			if(r.message){
				if (r.message.SC) {
          flag = r.message.file_url
        } else {
          frappe.throw(__(`Image URL creation failed`))
        }
        if (r.message.EX) {
          frappe.throw(__(r.message.EX))
        }
			}
		}
	})
  return flag
}

frappe.ui.form.on("Images", "form_render", function(frm, cdt, cdn){
  var doc = locals[cdt][cdn]
  // console.log(doc)

  if (frm.is_dirty()) {
    frm.save()
  }
  // console.log(frm.doc)
  if (doc.attach && !frm.is_dirty()) {
    var wrapper = frm.fields_dict[doc.parentfield].grid.grid_rows_by_docname[cdn].grid_form.fields_dict['image_preview'].$wrapper
    var is_viewable = frappe.utils.is_image_file(doc.attach);
    console.log(is_viewable)

    // frm.toggle_display("upload_section", is_viewable);
    frm.toggle_display("image_preview", is_viewable);

    if(is_viewable){
      wrapper.html('<div class="img_preview">\
      <img class="img-responsive" src="'+doc.attach+'"></img>\
      </div>');
    } else {
      wrapper.empty();
    }
  } else {
    var wrapper = frm.fields_dict[doc.parentfield].grid.grid_rows_by_docname[cdn].grid_form.fields_dict['image_preview'].$wrapper
    var is_viewable = frappe.utils.is_image_file(doc.attach);

    frm.toggle_display("image_preview", is_viewable);

    if (!is_viewable) {
      wrapper.empty();
    }
  }
})
