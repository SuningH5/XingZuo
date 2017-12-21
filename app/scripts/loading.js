
export default (cb) => {
	let nowLength = 0;
	let imgLength = $('.container').find('img').length -2;
	let active = false;

	$('.container').find('img').each(function(index, ele) {
		let src = $(ele).attr('src');
		let img = new Image();

		img.src = src;

		img.onload = function() {
			nowLength++;

			let progress = parseInt(nowLength / (imgLength) * 100);

			$('.loading-text span').html(progress + '%');

			if ( progress >= 100 && !active) {
				active = true;

				setTimeout(() => {
					$('.loading-box').fadeOut();
					$('.container').fadeIn();
					cb();
				}, 1000);
			}
		};
	});
};
