frappe.ui.form.on('Address', {
    refresh : function(frm, cdt, cdn)
    {
       var d = locals[cdt][cdn];
       var address_type = d.address_type;
       console.log("address_type_selected ",address_type);
       for(var i=0; i<frm.doc.links.length;i++)
        {
        var doc_name = frm.doc.links[i]['link_name'];
        console.log("link_name",frm.doc.links[i]['link_name']);
        cur_frm.set_value("address_title",frm.doc.links[i]['link_name']);
        }
        }
    });
    