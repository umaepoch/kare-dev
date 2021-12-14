// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.require('/assets/kare_dev/js/camera.js')
// import Fuse   from 'fuse.js'
// import Camera from '/home/frappe/frappe-bench/apps/kare_dev/kare_dev/public/js/camera.js';

frappe.ui.form.on('User Master',"capture_image", function(frm, cdt, cdn) {
  var doc = locals[cdt][cdn]

  var cam = new Camera({ video : true })
  cam.show()
  cam.submit((data) => {
    console.log(data)
  })

});
