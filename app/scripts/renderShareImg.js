import html2canvas from 'html2canvas';
import canvas2image from '../lib/canvas2image';
import renderCaifuText from './xz-data';
import renderXzTypeLogo from './renderLogo';

export default function renderShareImg(type) {
	// 生成图片
	//
	//
	console.log(type, window.userInfomation, window.musizType);

	let data = renderCaifuText(type);
	let { nickname } = window.userInfomation;
	let { name, shareB, shareT } = data;

	$('.user-name').html(nickname);
	$('.h3').html(name);
	$('.title').html(shareT);
	$('.share-body').html(shareB);
	$('.page3').addClass('active');

	renderXzTypeLogo(type, '.share-logo');

	setTimeout( () => {
		var node = document.getElementById('share-node');

		html2canvas(node).then(function(canvas) {
			$('#share-node').hide();

			$('.createImg-box').append(
				canvas2image.convertToImage(canvas, 750, 1206)
			);
		});
		
	},2000);
}
