// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require("/assets/kare_dev/js/camera.js")

frappe.ui.form.on("Caregiver Master", "refresh", function(frm, cdt, cdn){
  var doc = locals[cdt][cdn]

  frappe.dynamic_link = {doc: frm.doc, fieldname: 'name', doctype: 'Caregiver Master'}
  frm.toggle_display(['address_html','contact_html'], !frm.doc.__islocal);

  if (!frm.doc.__islocal) {
    frappe.contacts.render_address_and_contact(frm);
  } else {
    frappe.contacts.clear_address_and_contact(frm);
    frm.reload_doc()
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
		method:'kare_dev.kare_dev.doctype.caregiver_master.caregiver_master.create_image_url',
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

frappe.ui.form.on('Caregiver Master', {
  child_name: function(frm, cdt, cdn) 
      {
      var d = locals[cdt][cdn];
      var name_of_child = d.child_name;
      if(name_of_child)
      {
    var address = fetch_caregiver_address(name_of_child);
    console.log("address",address[0].caregiver_address);
   cur_frm.set_value("caregiver_address",address[0].caregiver_address);
    }
  }    
  });
     
    function fetch_caregiver_address(name_of_child) {
    var c_name = " ";
    frappe.call({
    method: 'kare_dev.kare_dev.doctype.caregiver_master.caregiver_master.get_child_address',
   args: {
          name_of_child: name_of_child
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message)
          c_name = r.message;
        }
      }
    })
    return c_name
  }
  
  frappe.ui.form.on('Caregiver Master', {
  after_save: function(frm, cdt, cdn) 
  {
      
      var d = locals[cdt][cdn];
      var name = d.name;
      var child_name = d.child_name;
      if(child_name)
      {
      var child_record = fetch_child_record_name(child_name);
      console.log("child_record",child_record.name);
      var child_record1 = child_record.name;
      fetch_caregiver_name(name,child_name,child_record1);
     
      }
      cur_frm.refresh();
  }  
   
  });
     
  function fetch_caregiver_name(name,child_name,child_record1) {
  var c_name = " ";
  frappe.call({
  method: 'kare_dev.kare_dev.doctype.child_master.child_master.set_caregiver_name',
  args: {
          name: name,
          child_name:child_name,
          child_record:child_record1
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message)
          c_name = r.message;
        }
      }
    })
    return c_name
  }
     
  function fetch_child_record_name(child_name) {
  
      var is_same_name = "";
      frappe.call({
          method: 'frappe.client.get_value',
          args: {
              'doctype': 'Child Master',
              'fieldname': 'name',
  
              'filters': {
                  "name" : child_name,
                              }
          },
          async: false,
          callback: function(r) {
              if (r.message) {
                  // console.log(r.qty);
                   is_same_name = r.message;
                 
                  console.log(is_same_name);
                  console.log("readings-----------" + JSON.stringify(r.message));
  
              }
          }
      });
      return  is_same_name;
  }
     
  