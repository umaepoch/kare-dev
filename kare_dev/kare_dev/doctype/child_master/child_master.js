// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require("/assets/kare_dev/js/camera.js")

frappe.ui.form.on("Images","activate_camera", function(frm, cdt, cdn){
  var doc = locals[cdt][cdn]
  console.log(doc)
  // console.log(navigator.userAgent)
  var cam = new Camera();
  console.log(`device type : ${cam.set_device_options()}`)
});
