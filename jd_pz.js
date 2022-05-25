//鑴氭湰浠呴檺涓汉瀛︿範浣跨敤锛岀姝紶鎾� 鏉ヨ嚜缃戠粶璧勬簮
const $ = new Env('鐑埍鑶ㄨ儉');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';


let cookiesArr = [], cookie = '', message;
let secretp='',inviteId=[]
let helpnum=3;
//鍔╁姏鐮�
let inviteId1='ZXASTT011uPt6SRcZ9wUFjRWn6S7zB55awQ';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

$.inviteId  = [];
$.inviteId.push(inviteId1);
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '銆愭彁绀恒€戣鍏堣幏鍙栦含涓滆处鍙蜂竴cookie\n鐩存帴浣跨敤NobyDa鐨勪含涓滅鍒拌幏鍙�', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  
  $.inviteIdCodesArr = {}
  for (let i = 0; i < cookiesArr.length && true; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      await getUA()
    }
  }

  






  for (let m = 0; m < cookiesArr.length; m++) {
    cookie = cookiesArr[m];
    $.index = m + 1;
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.canHelp = true;
    $.inviteId  = [...new Set($.inviteId )];
    $.UA = $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
    
    if (cookiesArr && cookiesArr.length >= 2) {
      console.log(`\n\n鑷繁璐﹀彿鍐呴儴浜掑姪`);
      for (let j = 0; j < $.inviteId .length && $.canHelp; j++) {
        console.log(`璐﹀彿 ${$.index} ${$.UserName} 寮€濮嬬粰 ${$.inviteId [j]} 杩涜鍔╁姏`)
        $.max = false;
        try {
          await get_secretp()
          await travel_help($.inviteId [j])
    
        }catch(e){
          $.log('', `鉂� ${$.name}, 澶辫触! 鍘熷洜: ${e}!`, '')
        }
        await $.wait(2000)
	      if ($.max) {
          $.inviteId .splice(j, 1)
          j--
          continue
        }

      }
    }
    if($.inviteId .length<1){
      break
    }

  }




})()
  .catch((e) => {
    $.log('', `鉂� ${$.name}, 澶辫触! 鍘熷洜: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })










  function get_secretp() {
    let body = {};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_getHomeData", body), async(err, resp, data) => {
            //console.log(data)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API璇锋眰澶辫触锛岃妫€鏌ョ綉璺噸璇昤)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code == 0) {
                            if (data.data && data.data.bizCode === 0) {
                                secretp = data.data.result.homeMainInfo.secretp
                                console.log(secretp)
                          }
                        } else 
                        if (data.code != 0) {
                            //console.log(`\n\nsecretp澶辫触:${JSON.stringify(data)}\n`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}




function travel_gethelp(){
	//let body={"taskId":taskId,"taskToken":taskToken,"actionType":1,"ss":{"extraData":{"log":"","sceneid":"ZNSZLh5"},"secretp":secretp,"random":randomString(6)}};
  let body={};

	return new Promise((resolve) => {
		$.post(taskPostUrl("promote_pk_getExpandDetail",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API璇锋眰澶辫触锛岃妫€鏌ョ綉璺噸璇昤)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            
            if (data.code === 0) {
              console.log(`\n\n 鎴愬姛鑾峰彇缁勯槦鐮乗n`)
              
					console.log(data.data.result.inviteId)
          $.inviteId.push(data.data.result.inviteId);
            } else {
              console.log(`\n\n 澶辫触:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}



function travel_help(inviteId){
	//let body={"taskId":taskId,"taskToken":taskToken,"actionType":1,"ss":{"extraData":{"log":"","sceneid":"ZNSZLh5"},"secretp":secretp,"random":randomString(6)}};
  let body={"confirmFlag":"1","inviteId":inviteId,"ss":{"extraData":{"log":"","sceneid":"RAhomePageh5"},"secretp":secretp,"random":randomString(8)}};

	return new Promise((resolve) => {
		$.post(taskPostUrl("promote_pk_collectPkExpandScore",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API璇锋眰澶辫触锛岃妫€鏌ョ綉璺噸璇昤)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data && data.data ) {
              // status ,0:鍔╁姏鎴愬姛锛�1:涓嶈兘閲嶅鍔╁姏锛�3:鍔╁姏娆℃暟鑰楀敖锛�8:涓嶈兘涓鸿嚜宸卞姪鍔�
              console.log(`鍔╁姏缁撴灉锛�${data.data.bizMsg}`)
              if (data.data.biz_code === 103) $.max = true;
              if (data.data.biz_code === 6) $.canHelp = false;
            } else {
              console.log(`\n\n 澶辫触:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}

function qryViewkitCallbackResult(taskToken){
	let body={"dataSource":"newshortAward","method":"getTaskAward","reqParams":`{\"taskToken\":"${taskToken}"}`,"sdkVersion":"1.0.0","clientLanguage":"zh","onlyTimeId":new Date().getTime(),"riskParam":{"platform":"3","orgType":"2","openId":"-1","pageClickKey":"Babel_VKCoupon","eid":"","fp":"-1","shshshfp":"","shshshfpa":"","shshshfpb":"","childActivityUrl":"","userArea":"-1","client":"","clientVersion":"","uuid":"","osVersion":"","brand":"","model":"","networkType":"","jda":"-1"}};
	
	return new Promise((resolve) => {
		$.post(taskPostUrl2("qryViewkitCallbackResult",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API璇锋眰澶辫触锛岃妫€鏌ョ綉璺噸璇昤)
        } else {
          if (safeGet(data)) {
			if (data.indexOf("宸插畬鎴�") != -1){
				data = JSON.parse(data);
				console.log(`\n\n ${data.toast.subTitle}`)
			}else {
              console.log(`\n\n澶辫触:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}



function taskPostUrl(functionId, body) {
  return {
      //functionId=tigernian_getHomeData&body={}&client=wh5&clientVersion=1.0.0
      url: `${JD_API_HOST}`,
      body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=m&clientVersion=-1&appid=signed_wh5`,
      headers: {
          'Cookie': cookie,
          'Host': 'api.m.jd.com',
          'Connection': 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          "User-Agent": $.UA,
          'Origin': 'https://wbbny.m.jd.com',
          'Accept-Language': 'zh-cn',
          'Accept-Encoding': 'gzip, deflate, br',
      }
  }
}
function taskPostUrl2(functionId,body) {
  return {
    url: `${JD_API_HOST}?functionId=${functionId}&client=wh5`,
    body: `body=${escape(JSON.stringify(body))}`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      "User-Agent": $.UA,
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}

//鏍煎紡鍖栧姪鍔涚爜
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`绗�${$.index}涓含涓滆处鍙风殑鍔╁姏鐮�:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    }
    if($.index == 1) $.newShareCodes = [...inviteCodes,...$.newShareCodes]
    console.log(`绗�${$.index}涓含涓滆处鍙峰皢瑕佸姪鍔涚殑濂藉弸${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log(`寮€濮嬭幏鍙�${$.name}閰嶇疆鏂囦欢\n`);
    //Node.js鐢ㄦ埛璇峰湪jdCookie.js澶勫～鍐欎含涓渃k;
    let shareCodes = [];
    if ($.isNode()) {
      if (process.env.JD_CITY_EXCHANGE) {
        exchangeFlag = process.env.JD_CITY_EXCHANGE || exchangeFlag;
      }
      if (process.env.CITY_SHARECODES) {
        if (process.env.CITY_SHARECODES.indexOf('\n') > -1) {
          shareCodes = process.env.CITY_SHARECODES.split('\n');
        } else {
          shareCodes = process.env.CITY_SHARECODES.split('&');
        }
      }
    }
    console.log(`鍏�${cookiesArr.length}涓含涓滆处鍙穃n`);
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    }
    console.log(`鎮ㄦ彁渚涗簡${$.shareCodesArr.length}涓处鍙风殑${$.name}鍔╁姏鐮乗n`);
    resolve()
  })
}
function getUA(){
	$.UA = `jdapp;android;10.0.6;11;9363537336739353-2636733333439346;network/wifi;model/KB2000;addressid/138121554;aid/9657c795bc73349d;oaid/;osVer/30;appBuild/88852;partner/oppo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; KB2000 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36`
}
function randomString(e) {
	e = e || 32;
	let t = "abcdef0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function randomNum(e) {
	e = e || 32;
	let t = "0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`浜笢鏈嶅姟鍣ㄨ闂暟鎹负绌猴紝璇锋鏌ヨ嚜韬澶囩綉缁滄儏鍐礰);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '璇峰嬁闅忔剰鍦˙oxJs杈撳叆妗嗕慨鏀瑰唴瀹筡n寤鸿閫氳繃鑴氭湰鍘昏幏鍙朿ookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`馃敂${this.name}, 寮€濮�!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============馃摚绯荤粺閫氱煡馃摚=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`鉂楋笍${this.name}, 閿欒!`,t.stack):this.log("",`鉂楋笍${this.name}, 閿欒!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`馃敂${this.name}, 缁撴潫! 馃暃 ${s} 绉抈),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}//鑴氭湰浠呴檺涓汉瀛︿範浣跨敤锛岀姝紶鎾�