// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require("/assets/kare_dev/js/camera.js")

frappe.ui.form.on("Images","activate_camera", function(frm, cdt, cdn){
  var doc = locals[cdt][cdn]
  var cam = new Camera();

  // set options for cam based on deviceType.
  // returns device type (mobile/desktop).
  cam.set_device_options()

  // open camera.
  cam.show()
  cam.submit((data) => {
    console.log(data)
  })
});
