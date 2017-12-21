import './assets/app.scss';
import './lib/mobile-util.js';
import $ from 'jquery';
import seleceXz from './scripts/selectXz';
import touchPan from './scripts/touchPan';
import queryString from 'query-string';
import createMusizBox from './scripts/createMusizBox';
import  './lib/jquery.particleground.min';
import  './lib/particles';
import renderXzTypeLogo from './scripts/renderLogo';
import getWetchInfomation from './scripts/getWetchInfomation';
import loading from './scripts/loading';
import mp3 from 'imageBase/2017s.mp3';
import bgm1 from 'imageBase/bgm1.mp3';

// import domtoimage from 'dom-to-image';


// import './lib/vconsole.min.js';

/* 限制浏览器上下滑动 */
document.addEventListener('touchmove', function (e) {
	e.preventDefault();
},true);

// The DOM is now loaded
$(() => {
	getWetchInfomation((i) => {
		window.userInfomation = i;

		$('.loading-box').fadeIn();

		loading(() => {
			app();
		});
	});

	// window.userInfomation = {
	// 	city: '闸北',
	// 	country: '中国',
	// 	headimgurl: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqjZHY70Lke3bM2sMjkVueoySUMib40ibM9y2dPg1M9cMQEMEsvuAlZiaQcramqFWcQtcz8LErsMnC8w/0',
	// 	language: 'zh_CN',
	// 	nickname: '凹凸测试',
	// 	openid: 'odqNvv1G6UTj7bruKcdqtY6__y90',
	// 	privilege: [],
	// 	province: '上海',
	// 	sex: 1,
	// };

	// $('.container')


});

function app() {
	console.log('-------Dom is loaded! running....--------');

	let xzType;
	let xzTypeLogo;
	let sceneActive;

	//  初始化
	window.musizType = {text: '摇滚', id: 1};

	$('.join').on('touchend', () => {
		$('.home').fadeOut();
		$('.page1').fadeIn();
		$('.content li').addClass('play');

		myAudio.play();
	});

	$('#audio1').attr('src', mp3);

	var myAudio = $('.audio')[0];

	$('.music').on('click', function() {
		if ( myAudio.paused ) {
			myAudio.play();
		} else {
			myAudio.pause();
		}

		$('.music-off').toggleClass('active');
	});

	$('.back-refresh').on('touchend', () => {
		$('.home').hide();
		$('.page1').show();
		$('.share-tip-box').hide();

		$('.link-type').fadeOut();
		$('.logo, .select').fadeIn();

		$('.luoPanel')
			.fadeOut(900)
			.removeClass('active');

		$('.select-box').fadeIn(1000);

		$('.btn-create-musiz').hide();

		$('.page3')
			.hide()
			.removeClass('active');

		$('.page2 .active').removeClass('active');
		$('.page2 .box').show();
		$('.page2 .box-top').show();
		$('.page2 .datiqing').show();

		$('.xinghe-suip-box').hide();
		$('.xinghe-suip').css({
			'-webkit-transform': `translate3d(${0}px, ${0}px, 0)`,
			'opacity': '1'
		});

		$('.create-musiz-success').show();
		$('.xinghe').show();

		$('.call-friend').hide();

		seleceXz(null, false);

		$('#share-node').show();
		$('.createImg-box').html('');

	});

	// 抽奖部分 test

	// setTimeout( () => {
	// 	$('.page1').fadeIn();
	// 	$('.content li').addClass('play');
	// }, 100);
	//
	//
	// setTimeout( () => {
	// 	createMusizBox('mx');
	// }, 100);
    //
	// return;

	// 选择类型
	seleceXz((type) => {
		xzType = type;

		$('.luoPanel')
			.fadeIn()
			.addClass('active');

		// 显示你喜欢的音乐title
		$('.link-type').fadeIn();

		// logo隐藏， 和隐藏 《选择你的星座》
		$('.logo, .select').fadeOut();

		// 显示返回键
		$('.back').fadeIn();

		// 选择界面退出
		$('.select-box').fadeOut(700);

		// 渲染指针中心内容
		renderXzTypeLogo(type, '.xz-type-logo');

		// 状态
		sceneActive = 1;

		// 运行touchPan 转盘代码
		touchPan($('.xz-type-text'), (data) => {
			window.musizType = data;

			// 显示创建按钮
			$('.btn-create-musiz').show();
		});

		if ($('.pan-tip').hasClass('active')) {
			$('.pan-tip')
				.fadeIn();
		}

	});

	// 生成我的音乐星盒
	$('.pan-tip').on('touchend', () => {
		$('.pan-tip').fadeOut();
		$('.pan-tip').removeClass('active');
	});

	// 生成我的音乐星盒
	$('.btn-create-musiz').on('touchend', () => {
		$('#audio1').attr('src', bgm1);
		createMusizBox(xzType);
	});

	// back 按钮 ----------------------------
	$('.back').on('touchend', backEvent);

	function backEvent() {
		if (sceneActive == 1) {
			$('.link-type').fadeOut();
			$('.logo, .select').fadeIn();

			$('.luoPanel')
				.fadeOut(900)
				.removeClass('active');

			$('.select-box').fadeIn(1000);

			$('.btn-create-musiz').hide();

			seleceXz(null, false);
		}
	}
	// end 按钮 ----------------------------
}
