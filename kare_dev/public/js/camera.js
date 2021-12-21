frappe._.get_data_uri = element =>
{
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

const ERR_MESSAGE = __("Unable to load camera.")
const TEMPLATE 	  =
`
<div class="frappe-capture">
	<div class="panel panel-default">
		<img class="fc-p img-responsive"/>
		<div class="fc-s  embed-responsive embed-responsive-16by9">
			<video class="embed-responsive-item">${ERR_MESSAGE}</video>
		</div>
	</div>
	<br/>
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
				<div class="col-md-3 fc-btf">
					<div class="pull-left">
						<button class="btn btn-primary fc-fr">
							<small>${__('Front')}</small>
						</button>
					</div>
				</div>
				<div class="col-md-3 fc-btb">
					<div class="pull-left">
						<button class="btn btn-primary fc-bk">
							<small>${__('Rear')}</small>
						</button>
					</div>
				</div>
				<div class="col-md-3">
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
let stream;

const capture = async facingMode => {
	 const options = {
		 audio: false,
		 video: {
			 facingMode,
		 },
	 };

	 try {
		 if (stream) {
			 const tracks = stream.getTracks();
			 tracks.forEach(track => track.stop());
		 }
		 stream = await navigator.mediaDevices.getUserMedia(options);
		 return stream
	 } catch (e) {
		 frappe.throw(e);
		 return;
	 }
 }

class Camera {
  constructor (opt = { }) {
    this.options = opt
  }

  set_options(options) {
    this.options = options
    return this
  }

  render() {
		return navigator.mediaDevices.getUserMedia({ video: true }).then(stream =>
		{
			this.dialog 	 = new frappe.ui.Dialog({
					title: this.options.title,
				animate: this.options.animate,
				 action:
				{
					secondary:
					{
						label: "<b>&times</b>"
					}
				}
			})

			const $e = $(TEMPLATE)

			const video = $e.find('video')[0]
			video.srcObject = stream
			video.play()

			const $container = $(this.dialog.body)
			$container.html($e)

			$e.find('.fc-btf').hide()

			$e.find('.fc-bcp').click(() =>
			{
				const data_url = frappe._.get_data_uri(video)
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
				const data_url = frappe._.get_data_uri(video)
				this.hide()

				if (this.callback)
					this.callback(data_url)
			})
		})
  }

  show ( )
	{
		this.render().then(() =>
		{
			this.dialog.show()
		}).catch(err => {
			if ( this.options.error )
			{
				const alert = `<span class="indicator red"/> ${ERR_MESSAGE}`
				frappe.show_alert(alert, 3)
			}

			throw err
		})
	}

	hide ( )
	{
		if ( this.dialog )
			this.dialog.hide()
	}

	submit (fn)
	{
		this.callback = fn
	}

	set_device_options()
	{
		const supports = navigator.mediaDevices.getSupportedConstraints();
		if (!supports['facingMode']) {
		    frappe.throw(__('This browser does not support facingMode!'));
		}

		const user = navigator.userAgent
  	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(user)
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(user.substr(0,4))) {
    	this.options = {deviceType: "mobile"}
			return this.options
  	} else {
			this.options = {deviceType: "desktop"}
			return this.options
		}
	}
};
