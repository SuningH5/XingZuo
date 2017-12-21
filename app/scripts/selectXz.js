// 选择星座页面 secene page1

export default function(cb, active) {

	let target = $('.content li');

	console.log(active);
	// 显示内容
	if (active === false) {
		target.addClass('play');

		return false;
	}

	select(target, cb);
}

// 选择星座
function select(target, cb) {
	target
		.on('touchend', function() {
			cb ? cb($(this).attr('data-type')) : null;

			$('.content li').removeClass('play');
		});
}
