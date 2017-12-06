import './assets/app.scss';
import './lib/mobile-util.js';
import $ from 'jquery';
// import './lib/vconsole.min.js';

/* 限制浏览器上下滑动 */
document.addEventListener('touchmove', function (e) {
	e.preventDefault();
},true);

function app() {
	console.log('-------Dom is loaded! running....--------');

	touchEvent();
}

// The DOM is now loaded
$(() => app());


// --------------------------------------------------

function touchEvent(target) {
	let startPosX = 0,
		startPosY = 0,
		touchType = null,
		rotateNum = 0;

	$('.luoPanel .touch_block').on({
		'touchstart': function (e) {
			let { pos_x , pos_y } = getPos(e);

			startPosY = pos_y;
			startPosX = pos_x;
			touchType = $(this).attr('date-type');

			$(this).on('touchmove', move);
		},
		'touchend': function (e) {
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

		console.log(`Type ${touchType} , value: ${animationNumber}`);

		rotateNum += animationNumber;

		$('.disc').css({
			'-webkit-transform': `rotate(${rotateNum / 30}deg)`
		});
	}
}
