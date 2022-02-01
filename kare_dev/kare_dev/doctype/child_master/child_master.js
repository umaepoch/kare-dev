// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require("/assets/kare_dev/js/camera.js")

frappe.ui.form.on('Child Master', {
  refresh: function(frm, cdt, cdn) 
  {
   var doc = locals[cdt][cdn];
   frappe.dynamic_link = {doc: frm.doc, fieldname: 'name', doctype: 'Child Master'}
   frm.toggle_display(['address_html','contact_html'], !frm.doc.__islocal);
  
    if (!frm.doc.__islocal) {
      frappe.contacts.render_address_and_contact(frm);
    } else {
      frappe.contacts.clear_address_and_contact(frm);
      frappe.reload_doc();
    }
  }
  });

frappe.ui.form.on("Images","activate_camera", function(frm, cdt, cdn){
  let images = {}
  var doc = locals[cdt][cdn]
  let is_created;

  if (doc.image_name) {
    show()
    submit((data) => {
      images.data = data.split(",")[1]
      images.image_name = doc.image_name
      images.doc_name = doc.name
      images.first_name = frm.doc.first_name
      images.doctype = doc.doctype
      is_created = create_image_url(JSON.stringify(images))

      if (is_created) {
        doc.attach = is_created
        frm.dirty()
        if(frm.is_dirty()) {
          frm.save()
          frm.refresh_field('image')
        } else {
          frm.reload_doc()
        }
      }
    });
  } else {
    frappe.throw(__("To activate camera enter image name"))
  }
});
// API for creating image url.
function create_image_url(doc) {
  let flag;
	frappe.call({
		method:'kare_dev.kare_dev.doctype.child_master.child_master.create_image_url',
		args: {
      'doc': doc
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

  if (doc.attach) {
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

frappe.ui.form.on("Images", "attach", function(frm, cdt, cdn) {
  if(frm.doc.__islocal) {
    frm.save()
    frm.reload_doc()
  }
})
