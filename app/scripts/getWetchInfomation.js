
export default function getWetchInfomation(cb) {
	let api_base = 'http://mercurymage.com:4600/';
	let url = encodeURIComponent('http://mercurymage.com/h5/20171211xz/');
	let redirect_uri = url;

	var share_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa99b3daa0d2a4927&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';

	console.log(share_url);

	console.log(location.search);

	if (location.search.indexOf('seo') !== -1 ) {
		return cb();
	}

	if (!location.search) {
		location.href = share_url;
		return;
	}

	let userInfomation = {
		city: '闸北',
		country: '中国',
		headimgurl: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqjZHY70Lke3bM2sMjkVueoySUMib40ibM9y2dPg1M9cMQEMEsvuAlZiaQcramqFWcQtcz8LErsMnC8w/0',
		language: 'zh_CN',
		nickname: '凹凸测试',
		openid: 'odqNvv1G6UTj7bruKcdqtY6__y90',
		privilege: [],
		province: '上海',
		sex: 1,
	};

	$.ajax({
		type: 'GET',
		url: api_base + 'getUserWechatInfo' + location.search,
		success: function(data) {
			var result = userInfomation = data.result;

			if (result.errcode == 40001) {
				// console.log('这么报错了，access_token 过期');
				// 过期重新刷新页面
				location.href = share_url;
			}

			console.log(data.result);

			cb ? cb(userInfomation) : null;
			// $('.content').html(JSON.stringify(data.result))
		},
		error: (err) => {
			location.href = share_url;

			cb ? cb(userInfomation) : null;
		}
	});



}
