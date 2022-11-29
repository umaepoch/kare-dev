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

frappe.ui.form.on('Child Master', {
  fetch_caregiver_name: function(frm, cdt, cdn) 
  {      
    debugger;
    var d = locals[cdt][cdn];
    var name = d.name;
    var care = fetch_caregiver_name(name);
    console.log("care number",care);
    console.log("care name",care[0].car_name);

    if(care[0].name)
    {

      cur_frm.set_value("motherguardiancaregivers_number",care[0].name);
     var full_name = (care[0]['first_name'] || '')+ " " + (care[0]['middle_name'] || '')+" " + (care[0]['last_name'] || '');
      cur_frm.set_value("motherguardiancaregivers_name",full_name);
    }
    }  
  });
     
function fetch_caregiver_name(name) {
    var c_name = " ";
    frappe.call({
    method: 'kare_dev.kare_dev.doctype.child_master.child_master.get_care_number',
   args: {
         name : name
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
  
//client scripts
frappe.ui.form.on('Child Master',{ 
  after_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  var gender = d.gender || " ";
  var name = d.name;
  var first_name = d.first_name || " ";
  var middle_name = d.middle_name || " ";
  var last_name = d.last_name || " ";
  var date_of_birth = d.date_of_birth || null;
  var caregiver_address = d.caregiver_address || " ";
  
  console.log(" case gender",gender);
  console.log("case name",name);
  console.log("case first_name",first_name);
  console.log("case middle_name",middle_name);
  console.log("case last_name",last_name);
  console.log("case date_of_birth",date_of_birth);
  console.log("case caregiver_address",caregiver_address);
  
  var data = set_changes(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address);
  console.log("case data",data[0].name);
  
  let doc_task = frappe.model.get_doc("Case Proposal", "PROP-00024");
  console.log("case proposal",doc_task)
  console.log("1",doc_task.as_dict) 
  console.log("2",doc_task.name)
  if (doc_task !== null) {
      //frappe.msgprint("child: " + doc_task.child);
        }
  }
  });
  function set_changes(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address)
  {
      var d = " ";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_details',
      args: {
           gender : gender,
           name : name,
           first_name : first_name,
           middle_name : middle_name,
           last_name : last_name,
           date_of_birth : date_of_birth,
           caregiver_address : caregiver_address
        },
        async: false,
        callback: function(r) {
          if (r.message) {
           console.log(typeof r.message);
           d = r.message;
          }
        }
      });
  return d;
    }
    
    
    
    
    
    
  frappe.ui.form.on('Child Master',{ 
  after_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  var gender = d.gender || " " ;
  var name = d.name;
  var first_name = d.first_name || " " ;
  var middle_name = d.middle_name|| " " ;
  var last_name = d.last_name || " ";
  var date_of_birth = d.date_of_birth || null ;
  var caregiver_address = d.caregiver_address || " ";
  
  var changes = do_changes(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address);
  
  }
  });
  function do_changes(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address)
  {
      var genderr = " ";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_child_details',
     args: {
           gender : gender,
           name : name,
           first_name : first_name,
           middle_name : middle_name,
           last_name : last_name,
           date_of_birth : date_of_birth,
           caregiver_address : caregiver_address
        },
        async: false,
        callback: function(r) {
          if (r.message) {
            console.log(typeof r.message);
          }
        }
      });
  
    }
    
  frappe.ui.form.on('Child Master',{ 
  after_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  var gender = d.gender|| " " ;
  var name = d.name;
  var first_name = d.first_name || " " ;
  var middle_name = d.middle_name || " " ;
  var last_name = d.last_name || " " ;
  var date_of_birth = d.date_of_birth || null;
  
  var changes = do_changes_ass(name,gender,first_name,middle_name,last_name,date_of_birth);
  
  }
  });
  function do_changes_ass(name,gender,first_name,middle_name,last_name,date_of_birth)
  {
      var genderr = " ";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_child_details_ass',
     args: {
           gender : gender,
           name : name,
           first_name : first_name,
           middle_name : middle_name,
           last_name : last_name,
           date_of_birth : date_of_birth,
          
        },
        async: false,
        callback: function(r) {
          if (r.message) {
            console.log(typeof r.message);
          }
        }
      });
  
    }
    
  
    
  frappe.ui.form.on('Child Master',{ 
  after_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  var gender = d.gender || " ";
  var name = d.name;
  var first_name = d.first_name || " ";
  var middle_name = d.middle_name || " ";
  var last_name = d.last_name|| " " ;
  var date_of_birth = d.date_of_birth || null;
  var caregiver_address = d.caregiver_address|| " " ;
  do_changes_case_m(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address);
  
  }
  });
  function do_changes_case_m(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address)
  {
      var genderr = " ";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_child_details_case_m',
     args: {
           gender : gender,
           name : name,
           first_name : first_name,
           middle_name : middle_name,
           last_name : last_name,
           date_of_birth : date_of_birth,
           caregiver_address:caregiver_address
          
        },
        async: false,
        callback: function(r) {
          if (r.message) {
            console.log(typeof r.message);
          }
        }
      });
  
    }
  
  
  frappe.ui.form.on('Child Master',{ 
  before_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  var aadhar_card_number = d.aadhar_card_number;
  if(aadhar_card_number)
  {
  var child_data = find_dublicate(aadhar_card_number);
  }
  
  var regexp=/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
  
  var x=aadhar_card_number;
  if(regexp.test(x))
  {
    
  }
  else
  {
     
      frappe.msgprint("Invalid Aadhar no.");
       frappe.validated = false;
  }
  /*
  if(child_data.length == 1)
  {
  console.log("entered if")
     frappe.msgprint("child record is already existad for this adhar number");
     
     frappe.validated = false;
  }
  if(child_data.length > 1)
  {
  console.log("entered if")
     frappe.msgprint("child record is already existad for this adhar number");
     
     frappe.validated = false;
  }
  */
  }
  });
  function find_dublicate(aadhar_card_number)
  {
      var adhar = " ";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.check_child',
     args: {
           adhar : aadhar_card_number
        },
        async: false,
        callback: function(r) {
          if (r.message) {
            console.log(typeof r.message)
            adhar = r.message;
           
          }
        }
      })
      return adhar;
    }
    
    
    
    
  frappe.ui.form.on('Child Master',{ 
  before_save : function(frm, cdt, cdn)
  {
  var d = locals[cdt][cdn];
  
  var name = d.name;
  var date_of_birth = d.date_of_birth;
  console.log("name,dob",name,date_of_birth);
  
  var dob = set_child_dob_assess(name,date_of_birth);
  console.log("dob",dob);
  }
  });
  function set_child_dob_assess(name,date_of_birth)
  {
      console.log("name,dob",name,date_of_birth);
      var age="";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_dob_assess',
     args: {
           name : name,
           date_of_birth : date_of_birth
        },
        async: false,
        callback: function(r) {
          if (r.message) {
           age = r.message;
            console.log("age",age);
          }
        }
      });
  return age;
    }
    
    
  frappe.ui.form.on('Child Master',{ 
  before_save : function(frm, cdt, cdn)
  {
  
  var d = locals[cdt][cdn];
  
  var name = d.name;
  var date_of_birth = d.date_of_birth;
  console.log("name,dob",name,date_of_birth);
  
  var dob_preli = set_child_dob_preli(name,date_of_birth);
  console.log("dob_preli",dob_preli);
  }
  });
  function set_child_dob_preli(name,date_of_birth)
  {
      console.log("name,dob set_child_dob_preli",name,date_of_birth);
      var age1="";
      frappe.call({
      method: 'kare_dev.kare_dev.doctype.child_master.child_master.update_dob_preli',
     args: {
           name : name,
           date_of_birth : date_of_birth
        },
        async: false,
        callback: function(r) {
          if (r.message) {
           age1 = r.message;
            console.log("age1",age1);
          }
        }
      });
  return age1;
    }
