export default function (target, cb) {
	let startPosX = 0,
		startPosY = 0,
		touchType = null,
		rotateNum = 0;

	$('.disc').css({ '-webkit-transform': `rotate(${0}deg)` });
	target.html('');

	$('.luoPanel .touch_block').on({
		'touchstart': function (e) {
			let { pos_x , pos_y } = getPos(e);

			startPosY = pos_y;
			startPosX = pos_x;
			touchType = $(this).attr('date-type');

			$(this).on('touchmove', move);
		},
		'touchend': function (e){
			$(this).off('touchmove');
		}
	});

	function getPos(e) {
		var touch = e.originalEvent.touches[0];
		var pos_x = parseInt(e.pageX || touch.pageX);
		var pos_y = parseInt(e.pageY || touch.pageY);

		return { pos_x, pos_y };
	}

	function move(e) {
		let { pos_x , pos_y } = getPos(e);

		let transitionY = pos_y - startPosY;
		let transitionX = pos_x - startPosX;

		animation(transitionX, transitionY);
	}

	function animation(x, y) {
		if (!touchType) return;

		let animationNumber;

		if (touchType == 'top' || touchType == 'bottom') {
			animationNumber = x;
		} else {
			animationNumber = y;
		}

		if (touchType == 'left' || touchType == 'bottom') {
			animationNumber = -1 * animationNumber;
		}

		rotateNum += animationNumber;
		let rotate = rotateNum / 50;

		$('.disc').css({ '-webkit-transform': `rotate(${rotate}deg)` });

		renderPan(rotate);
	}

	let angle = parseInt(360 / 7);
	let musizObj;

	function renderPan(rotate) {
		rotate = parseInt(rotate % 360);

		let textArray = [
			{text: '摇滚', id: 1},
			{text: '民谣', id: 2},
			{text: '古典', id: 3},
			{text: '嘻哈', id: 4},
			{text: '爵士', id: 5},
			{text: '电子', id: 6},
			{text: '流行', id: 7},
		];

		if (rotate < 0) {
			textArray.reverse();
		}

		rotate = Math.abs(rotate);

		switch (true) {
			case (rotate < angle):
				musizObj = textArray[0];
				break;
			case (rotate < angle*2):
				musizObj = textArray[1];
				break;
			case (rotate < angle*3):
				musizObj = textArray[2];
				break;
			case (rotate < angle*4):
				musizObj = textArray[3];
				break;
			case (rotate < angle*5):
				musizObj = textArray[4];
				break;
			case (rotate < angle*6):
				musizObj = textArray[5];
				break;
			case (rotate < angle*7):
				musizObj = textArray[6];
				break;
			default:
				break;
		}

		// render element
		target.html(`${musizObj.text}`);

		// 返回抽奖结果
		cb ? cb(musizObj) : null;
	}

}
