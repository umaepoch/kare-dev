from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("KARE Documents"),
			"items": [
				{
					"type": "doctype",
					"name": "Child Master",
					"onboard": 1,
					"label": _("Child Master")
				},
                {
					"type": "doctype",
					"name": "Caregiver Master",
					"onboard": 1,
					"label": _("Caregiver Master")
				},
                {
					"type": "doctype",
					"name": "BankAC",
					"onboard": 1,
					"label": _("BankAC")
				},
                {
					"type": "doctype",
					"name": "Service Provider Master",
					"onboard": 1,
					"label": _("Service Provider Master")
				},
                {
					"type": "doctype",
					"name": "Case Proposal",
					"onboard": 1,
					"label": _("Case Proposal")
				},
                {
					"type": "doctype",
					"name": "Preliminary Fitment Report",
					"onboard": 1,
					"label": _("PFR")
				},
                {
					"type": "doctype",
					"name": "Case Master",
					"onboard": 1,
					"label": _("Case Master")
				},
                {
                    "type": "doctype",
                    "name": "Address"
                }
			]
		},
        {
            "label": "KARE Reports",
            "icon": "fa fa-cog",
            "items": []
        }
	]
