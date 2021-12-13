// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
// frappe.require('/assets/kare_dev/js/camera.js')

const OPTIONS = {
	  title: __(`Camera`),
	animate: false,
	  error: false,
}

const ERR_MESSAGE = __("Unable to load camera.")
const TEMPLATE = `
<div class="frappe-capture">
	<div class="panel panel-default">
		<img class="fc-p img-responsive"/>
		<div class="fc-s  embed-responsive embed-responsive-16by9">
			<video class="embed-responsive-item">${frappe.ui.Capture.ERR_MESSAGE}</video>
		</div>
	</div>
	<div>
		<div class="fc-btf">
			<div class="row">
				<div class="col-md-6">
					<div class="pull-left">
						<button class="btn btn-default fc-br">
							<small>${__('Retake')}</small>
						</button>
					</div>
				</div>
				<div class="col-md-6">
					<div class="pull-right">
						<button class="btn btn-primary fc-bs">
							<small>${__('Submit')}</small>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="fc-btu">
			<div class="row">
				<div class="col-md-6">
					${
						''
						// <div class="pull-left">
						// 	<button class="btn btn-default">
						// 		<small>${__('Take Video')}</small>
						// 	</button>
						// </div>
					}
				</div>
				<div class="col-md-6">
					<div class="pull-right">
						<button class="btn btn-default fc-bcp">
							<small>${__('Take Photo')}</small>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`

frappe.ui.form.on('User Master',"capture_image", function(frm, cdt, cdn) {
  var doc = locals[cdt][cdn]
  var cam = render({video: true})
  // var camera = ({ video: true })
  // console.log(frappe.local.sites_path)
  // const camera = new Camera()
  // camera.show()
  // camera.submit((data) => {
  //   console.log(data)
  // })
});

function render(opt) {
  return navigator.mediaDevices.getUserMedia(opt).then(stream => {
    var dailog = new frappe.ui.Dailog({
      title: OPTIONS.title,
      animate: OPTIONS.animate,
      action:
      {
        secondary:
        {
          label: "<b>&times</b>"
        }
      }
    })

    const e = $(TEMPLATE)

    const video = $e.find('video')[0]
    video.srcObject  = stream
    video.play()

    const $container = $(dialog.body)
    $container.html($e)

    $e.find('.fc-btf').hide()

    $e.find('.fc-bcp').click(() =>
    {
      const data_url = get_data_uri(video)
      $e.find('.fc-p').attr('src', data_url)

      $e.find('.fc-s').hide()
      $e.find('.fc-p').show()

      $e.find('.fc-btu').hide()
      $e.find('.fc-btf').show()
    })

    $e.find('.fc-br').click(() =>
    {
      $e.find('.fc-p').hide()
      $e.find('.fc-s').show()

      $e.find('.fc-btf').hide()
      $e.find('.fc-btu').show()
    })

    $e.find('.fc-bs').click(() =>
    {
      const data_url = get_data_uri(video)
      dailog.hide()
    })

  })
}

function get_data_uri(element) {
  const $element = $(element)
	const width    = $element.width()
	const height   = $element.height()

	const $canvas     = $('<canvas/>')
	$canvas[0].width  = width
	$canvas[0].height = height

	const context     = $canvas[0].getContext('2d')
	context.drawImage($element[0], 0, 0, width, height)

	const data_uri = $canvas[0].toDataURL('image/png')

	return data_uri
}
