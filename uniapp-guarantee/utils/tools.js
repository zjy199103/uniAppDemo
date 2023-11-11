export default {
	/**
	 * @description 计算字符串在浏览器中显示的宽度
	 * @param text {string|number}
	 * @param fontSize {number}
	 * @return {number}
	 */
	computedTextWidth(text, fontSize = 14) {
		let span = document.getElementById('computedTextWidth')
		if (!span) {
			span = document.createElement('span')
			span.id = 'computedTextWidth'
			span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;'
			document.body.appendChild(span)
		}
		span.style.fontSize = `${fontSize}px`
		span.innerHTML = text
		return span.offsetWidth
	},
	/**
	 * 是否数组
	 */
	array(value) {
		if (typeof Array.isArray === "function") {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === "[object Array]";
		}
	},

	/**
	 * 是否对象
	 */
	object(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	},

	/**
	 * 中文
	 */
	chinese(value) {
		let reg = /^[\u4e00-\u9fa5]+$/gi;
		return reg.test(value);
	},

	/**
	 * 只能输入数字
	 */
	number(value) {
		return /^[0-9]*$/.test(value);
	},

	/**
	 * 只能输入字母
	 */
	letter(value) {
		return /^[a-zA-Z]*$/.test(value);
	},
	/**
	 * 只能是字母或者中文
	 */
	enOrChinese(value) {
		let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/gi;
		return reg.test(value);
	},
	/**
	 * 只能是字母或者数字
	 */
	enOrNum(value) {
		//英文或者数字
		let reg = /^[0-9a-zA-Z]*$/g;
		return reg.test(value);
	},
	/**
	 * 是否包含数字
	 */
	haveNumber(value) {
		return /\d/.test(value);
	},
	/**
	 * 是否车牌号
	 */
	carNo(value) {
		// 新能源车牌
		const xreg =
			/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
		// 旧车牌
		const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
		if (value.length === 7) {
			return creg.test(value);
		} else if (value.length === 8) {
			return xreg.test(value);
		} else {
			return false;
		}
	},
	/**
	 * 验证手机格式
	 */
	mobile(value) {
		return /^1[3-9]\d{9}$/.test(value)
	},
	

	/**
	 * 验证URL格式
	 */
	url(value) {
		return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
	},
	//去除字符串空格
	trim(str, type) { // 去除空格， type:  1-所有空格  2-前后空格  3-前空格 4-后空格
		type = type || 1
		switch (type) {
			case 1:
				return str.replace(/\s+/g, '')
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, '')
			case 3:
				return str.replace(/(^\s*)/g, '')
			case 4:
				return str.replace(/(\s*$)/g, '')
			default:
				return str
		}
	},
	/**
	 * 验证身份证
	 * @param {*} code 
	 * @returns 
	 */
	identityIDCode(code) {
		// 身份证号前两位代表区域
		const city = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北 ',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏 ',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外 ',
		};
		const idCardReg = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 身份证格式正则表达式
		let errorMessage = ''; // 错误提示信息
		let isPass = true; // 身份证验证是否通过（true通过、false未通过）

		// 如果身份证不满足格式正则表达式
		if (!code) {
			errorMessage = '请输入身份证号码';
			isPass = false;
		} else if (!code.match(idCardReg)) {
			errorMessage = '请输入正确的身份证号码';
			isPass = false;
		} else if (!city[code.substr(0, 2)]) {
			// 区域数组中不包含需验证的身份证前两位
			errorMessage = '请输入正确的身份证号码';
			isPass = false;
		} else if (code.length === 18) {
			// 18位身份证需要验证最后一位校验位
			code = code.split('');
			// ∑(ai×Wi)(mod 11)
			// 加权因子
			const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			// 校验位
			const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			let sum = 0;
			let ai = 0;
			let wi = 0;
			for (let i = 0; i < 17; i++) {
				ai = parseInt(code[i]);
				wi = factor[i];
				sum += ai * wi; // 开始计算并相加
			}
			const last = parity[sum % 11]; // 求余
			if (last.toString() !== code[17]) {
				errorMessage = '请输入正确的身份证号码';
				isPass = false;
			}
		}
		return {
			errorMessage,
			isPass,
		}
	},
	phoneFormat(phone) {
		if (phone != null) {
			let len = phone.length
			if (len > 3 && len < 8) {
				phone = phone.replace(/^(\d{3})/g, '$1 ')
			} else if (len >= 8) {
				phone = phone.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
			}
			return phone
		}
		return ''
	},
	/**
	 * 手机号格式化
	 */
	phoneFilter(val) {
		let str = "";
		str = val.substr(0, 3) + "****" + val.substr(val.length - 4);
		return str;
	},
	/**
	 * 检测手机号格式
	 */
	checkPhone(value) {
		var phone = value;
		if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 检测邮箱格式
	 */
	checkEmail(value) {
		var email = value;
		console.log(email);
		if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			console.log('真');
			return true;
		} else {
			console.log('假');
			return false;
		}
	},
	/**
	 * fn：检测图片协议，主要用于检测海报图片协议。
	 * param(imgPath): 图片地址。
	 */
	checkImgHttp(imgPath) {
		let newPath = '';
		let pathArr = imgPath.split('://');
		// #ifdef H5
		let ishttps = 'https:' == window.location.protocol ? true : false;
		ishttps ? (pathArr[0] = 'https') : (pathArr[0] = 'http');
		// #endif
		// #ifdef MP-WEIXIN
		pathArr[0] = 'https'
		// #endif
		newPath = pathArr.join('://');
		return newPath;
	},
	// 打电话
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString()
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},
	// // 图片处理-选择图片
	// chooseImage(count = 1) {
	// 	return new Promise((resolve, reject) => {
	// 		uni.chooseImage({
	// 			count: count, //默认9
	// 			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	// 			sourceType: ['album'], //从相册选择
	// 			success: res => {
	// 				resolve(res.tempFilePaths);
	// 			}
	// 		});
	// 	}).catch(e => {
	// 		reject(e)
	// 	})
	// },
	// // 图片处理-上传图片
	// uploadImage(api, url) {
	// 	let config_url = API_URL;
	// 	uni.showLoading({
	// 		title: '上传中'
	// 	});
	// 	return new Promise((resolve, reject) => {
	// 		uni.uploadFile({
	// 			url: config_url + api,
	// 			filePath: url,
	// 			name: 'file',
	// 			success: res => {
	// 				res = JSON.parse(res.data);
	// 				if (res.code === 1) {
	// 					uni.hideLoading()
	// 					uni.showToast({
	// 						title: '上传成功',
	// 						icon: 'none'
	// 					});
	// 					resolve(res.data)
	// 				} else {
	// 					uni.hideLoading()
	// 					uni.showModal({
	// 						title: '上传失败',
	// 						content: res.msg
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}).catch(e => {
	// 		reject(e)
	// 	})
	// },
	// 图片处理-预览图片
	previewImage(urls = [], current = 0) {
		uni.previewImage({
			urls: urls,
			current: current,
			indicator: 'default',
			loop: true,
			fail(err) {
				console.log('previewImage出错', urls, err)
			},
		})
	},
	// 图片处理-获取图片信息
	getImageInfo(src = '') {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: src,
				success: (image) => {
					resolve(image)
				},
				fail(err) {
					console.log('getImageInfo出错', src, err)
				},
			})
		}).catch(e => {
			reject(e)
		})

	},
	/**
	 * 格式化时间
	 */
	//时间格式化 天时分秒
	format(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00',
		}
		if (t > 0) {
			let d = Math.floor(t / 86400)
			let h = Math.floor((t / 3600) % 24)
			let m = Math.floor((t / 60) % 60)
			let s = Math.floor(t % 60)
			format.d = d < 10 ? '0' + d : d
			format.h = h < 10 ? '0' + h : h
			format.m = m < 10 ? '0' + m : m
			format.s = s < 10 ? '0' + s : s
		}
		return format
	},
	//时间格式化(格式化最大为小时)
	formatToHours(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00',
		}
		if (t > 0) {
			let h = Math.floor(t / 3600)
			let m = Math.floor((t / 60) % 60)
			let s = Math.floor(t % 60)

			format.h = h < 10 ? '0' + h : h
			format.m = m < 10 ? '0' + m : m
			format.s = s < 10 ? '0' + s : s
		}
		return format
	},
	// 年月日
	timestamp(timestamp) {
		let date = new Date(timestamp * 1000); //根据时间戳生成的时间对象
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();

		m = m < 10 ? '0' + m : m;
		d = d < 10 ? '0' + d : d

		let dateText = y + "-" + m + "-" + d
		return dateText
	},
	/**
	 *  @fn  时间格式化（时分秒）
	 *  @param {*} timestamp 时间戳
	 *  @param {*} showSecond 是否显示秒
	 *  @return {string} str 返回时间字符串
	 */
	timestamp_hourstime(timestamp, showSecond = false) {
		let date = new Date(timestamp * 1000); //根据时间戳生成的时间对象
		let h = date.getHours();
		let min = date.getMinutes();
		let second = date.getSeconds();

		h = h < 10 ? '0' + h : h;
		min = min < 10 ? '0' + min : min;
		second = second < 10 ? '0' + second : second;
		let dateText = showSecond ? h + ":" + min + ":" + second : h + ":" + min
		return dateText
	},
	// 年月日，时分秒
	// "YYYY-mm-dd HH:MM"
	dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},
	/**
	 *  @fn  时间间隔格式化
	 *  @param {*} startTime 开始时间的时间戳
	 *  @param {*} endTime 结束时间的时间戳
	 *  @return {string} str 返回时间字符串
	 */
	getTimeInterval(startTime, endTime) {
		let runTime = parseInt((endTime - startTime) / 1000);
		let year = Math.floor(runTime / 86400 / 365);
		runTime = runTime % (86400 * 365);
		let month = Math.floor(runTime / 86400 / 30);
		runTime = runTime % (86400 * 30);
		let day = Math.floor(runTime / 86400);
		runTime = runTime % 86400;
		let hour = Math.floor(runTime / 3600);
		runTime = runTime % 3600;
		let minute = Math.floor(runTime / 60);
		runTime = runTime % 60;
		let second = runTime;
		let str = '';
		if (year > 0) {
			str = year + '年';
		}
		if (year <= 0 && month > 0) {
			str = month + '月';
		}
		if (year <= 0 && month <= 0 && day > 0) {
			str = day + '天';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
			str = hour + '小时';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
			str = minute + '分钟';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
			str += second + '秒';
		}
		str += '前';
		return str;
	},


	//toast提示
	toast(title, duration = 3000, mask = false) {
		if (Boolean(title) === false) {
			return
		}
		uni.showToast({
			title,
			duration: duration,
			mask: mask,
			icon: 'none'
		});
	},
	//modal弹窗(单按钮)
	modalMsg(title, content) {
		if (Boolean(title) === false || Boolean(content) === false) {
			return
		}
		uni.showModal({
			title,
			content,
			showCancel: false,
			confirmText: '我知道了',
			confirmColor: '#0074FF'
		})
	},
	//modal弹窗(确认)
	modalSure(title, content, confirm) {
		if (Boolean(title) === false && Boolean(content) === false) {
			return
		}
		uni.showModal({
			title,
			content,
			confirmText: '确定',
			confirmColor: '#0074FF',
			cancelText: '取消',
			cancelColor: '#000000E6',
			success(res) {
				if (res.confirm) {
					confirm()
				}
			}
		});
	},


  // 获取所有菜单的code
  getAllCode(data = [], arr = []) {
    for (let item of data) {
      arr.push(item.code);
      if (item.children && item.children.length)
        this.getAllCode(item.children, arr);
    }
    return arr;
  },

  /**
   * 新增账号密码进行校验
   * @param {*} pwd 
   * @returns 
   */
  checkAccountPwd(pwd) {
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![<>`~\,!\/@;:\.#$\_%\|^&*\-()\[?\]=+{}]+$)[\da-zA-Z<>`~\,!\/@;:\.#$\_%\|^&*\-()\[?\]=+{}]/
    return reg.test(pwd)
  },
  
  /** 
   * 判断是否为邮箱地址
   * @param {*} email
   * @returns
  */
  checkIsEmail(email) {
	  const pattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  const isValidEmail = pattern.test(email)
	  return isValidEmail
  },

  /**
 * 检测账号是否满足正则: 数字或字母或下划线
 * @param {*} account 
 * @returns 
 */
  checkAccount(account) {
    const reg = /^[0-9a-zA-Z_]*$/
    return reg.test(account)
  },

  // 日期比较
  compareDate(date1, date2) {
    let dateS1 = new Date(date1.replace(/-/g, '/'));
    let dateS2 = new Date(date2);
    if (dateS1 > dateS2) {
      return true;
    } else {
      return false;
    }
  }
}
