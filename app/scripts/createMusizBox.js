// 生成我的音乐星盒
import renderXzTypeLogo from './renderLogo';
import renderCaifuText from './xz-data';
import renderShareImg from './renderShareImg';

export default (type, cb) => {
	let page2     = $('#page2');
	let boxTop    = $('.page2 .box-top');
	let xinghe    = $('.page2 .xinghe');
	let coverOpen = $('.page2 .cover-open');
	let openBox   = $('.page2 .apen-box');
	let back      = $('.back-to-pan');

	type = type || 'jn';
	let xzBoxClassName = `.${type}-box`;

	$('.page1').fadeOut();

	page2
		.fadeIn()
		.particleground({
			dotColor: '#949494',
			lineColor: '#514d54',
			maxSpeedX: 0.3,
			density: 22000
		});

	let xzBoxEle = page2.find(xzBoxClassName);
	let yueqi = xzBoxEle
		.addClass('active')
		.find('.yueqi')
		.addClass('active');

	back.show()
		.on('touchend', () => {
			$('.page1').fadeIn();
			$('.xingzuo-list').removeClass('active');
			page2.fadeOut();
		});

	$('.create-musiz-success').on('touchend', function() {
		cb ? cb() : null;

		yueqi
			.addClass('leave')
			.removeClass('active');

		boxTop.fadeOut(1000);
		coverOpen.fadeIn(800);
		openBox.fadeIn(800);
		xinghe.addClass('active');
		$('.box-text').show();

		$(this).hide();
		$('.datiqing').hide();
		back.hide();

		setTimeout(() => { showXinghe(); }, 2000);
	});



	function showXinghe() {
		let active = xinghe.hasClass('active');

		if (!active) return;

		xinghe.fadeOut(700);

		$('.xinghe-suip-box')
			.fadeIn(1000)
			.addClass('active');

		setTimeout(() => { boom(); }, 1260);
		setTimeout(() => { showCaifu(); },1260);
	}

	// 显示财富表
	function showCaifu() {
		$('.xingzuo-list').removeClass('active');
		$('.apen-box').hide();
		$('.cover-open').hide();
		$('.box').hide();
		$('.box-text').hide();

		$('.caifu-table').addClass('active');
		$('.xzType-text-title').html(window.musizType.text);
		$('.xzType-text-body').html(renderCaifuText(type).text);
		$('.call-friend').fadeIn(700);

		renderXzTypeLogo(type, '.caifu-logo');
	}

	// 告诉朋友, 生成分享图
	$('.call-friend').on('touchend', () => {
		$('.page2').fadeOut(1000);
		$('.page3').show(1000);

		renderShareImg(type);
	});

	// 分享微信
	$('.share-btn').on('touchend', () => {
		$('.share-tip-box').fadeIn(1000);
	});

	$('.share-tip-box').on('touchend', () => {
		$(this).fadeOut(1000);
	});

	function boom() {
		$('.xinghe-suip').each( (index, ele) => {
			if (index < 10) {
				let left = random(100, 300) * -1;
				let top  = random(100, 300) * (index - 5.1);

				$(ele).css({
					'-webkit-transform': `translate3d(${left}px, ${top}px, 0)`,
					'opacity': '0.7'
				});
			} else {
				let right = random(100, 300) * 1;
				let top  = random(100, 300) * (index - 15.1);

				$(ele).css({
					'-webkit-transform': `translate3d(${right}px, ${top}px, 0)`,
					'opacity': '0.7'
				});
			}

		});
	}

};

function random(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}
