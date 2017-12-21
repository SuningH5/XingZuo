import by from '../assets/images/by.png';
import cn from '../assets/images/cn.png';
import jn from '../assets/images/jn.png';
import jx from '../assets/images/jx.png';
import mx from '../assets/images/mx.png';
import shiz from '../assets/images/shiz.png';
import sp from '../assets/images/sp.png';
import ss from '../assets/images/ss.png';
import sy from '../assets/images/sy.png';
import sz from '../assets/images/sz.png';
import tp from '../assets/images/tp.png';
import tx from '../assets/images/tx.png';

export default function renderXzTypeLogo(type, target){
	let xzTypeLogo;

	switch (type) {
		case 'by':
			xzTypeLogo = by;
			break;
		case 'jn':
			xzTypeLogo = jn;
			break;
		case 'sz':
			xzTypeLogo = sz;
			break;
		case 'jx':
			xzTypeLogo = jx;
			break;
		case 'shiz':
			xzTypeLogo = shiz;
			break;
		case 'cn':
			xzTypeLogo = cn;
			break;
		case 'tp':
			xzTypeLogo = tp;
			break;
		case 'tx':
			xzTypeLogo = tx;
			break;
		case 'ss':
			xzTypeLogo = ss;
			break;
		case 'mx':
			xzTypeLogo = mx;
			break;
		case 'sp':
			xzTypeLogo = sp;
			break;
		case 'sy':
			xzTypeLogo = sy;
			break;

		default:
			break;
	}

	$(target).attr('src', xzTypeLogo);
}
