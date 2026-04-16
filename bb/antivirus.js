
(function(){
    const _0x = ["charCodeAt","join","split","length","substr","toString","getElementById","innerText","trim","toUpperCase","replace","floor","random","setInterval","clearInterval","fetch","json","then","catch","location","href","Base64","reverse"];
    const _$=function(_$$,_$_){return _$$[_0x[0]](_$_);};
    const __=function(a){return String.fromCharCode(a);};
    const ___=function(arr){return arr.map(__)[_0x[1]]("");};
    const ____=function(s){return atob(s);};
    const _prng=function(seed){let x=seed%2147483647;return()=> (x=x*16807%2147483647)/2147483647;};
    const _shift=function(s,seed){let tprng=_prng(seed);return s[_0x[2]]("").map(c=>__.call(null,c[_0x[0]](0)+Math[_0x[11]](tprng()*6)-3))[_0x[1]]("");};
    const _dna=function(str){let o="";for(let c of str){let b=c[_0x[0]](0).toString(2).padStart(8,"0");for(let i=0;i<8;i+=2){let p=b[_0x[4]](i,2);o+=p==="00"?"A":p==="01"?"C":p==="10"?"G":"T"}}return o;};
    const _revcomp=function(seq){const m={A:"T",T:"A",C:"G",G:"C"};return seq[_0x[2]]("")[_0x[22]]().map(x=>m[x])[_0x[1]]("");};
    const _randid=function(){return Math[_0x[11]](Math[_0x[12]]()*1e16);};
    let _step=11,_attempt=0,_seq="",_interval=null,_seed=(Date.now()^(performance.now()|0))>>>0;
    const _show=function(){_attempt++;if(_attempt===3||_attempt===7||_attempt===8||_attempt===21||_attempt===66){document[_0x[6]]("status")[_0x[7]]=["Nothing here...","Wrong dimension","It's DaveNA","Try reversing reality","You are not meant to be here"][_0x[2]][_attempt]||"";}};
    const _disp=function(){let s=_shift("RE",_seed);_seq=_dna(s);let i=0;document[_0x[6]]("bases")[_0x[7]]="";clearInterval(_interval);_interval=setInterval(()=>{if(i>=_seq[_0x[3]])return;let ch=_seq[i++];let fns=[x=>x,x=>"0x"+x[_0x[0]](0).toString(16),x=>x[_0x[0]](0).toString(10),x=>x[_0x[0]](0).toString(2)];document[_0x[6]]("bases")[_0x[7]]+=fns[Math[_0x[11]](Math[_0x[12]]()*fns[_0x[3]])](ch)+" ";},180+Math[_0x[12]]()*80)};
    const _unpack=function(data){if(data.bb)return atob(data.bb);return data.path.map((n,i)=>{let x=data.nodes[n^data.mask],k=x.q^data.mask;return atob(x.v[_0x[2]]("")[_0x[22]]()[_0x[1]](""))[_0x[2]]("").map(c=>__(c[_0x[0]](0)^k))[_0x[1]]("")})[_0x[1]]("");};
    const _redir=function(){fetch('url.json?v=2')[_0x[17]](r=>r[_0x[16]]())[_0x[17]](data=>{setTimeout(()=>location.href=_unpack(data),700)})[_0x[18]](console.error);};
    window.submitCode=function(){let input=document[_0x[6]]("code").value[_0x[8]]()[_0x[9]]();switch(_step){case 11:_disp();if(input===_seq){_step=34;_attempt=0;document[_0x[6]]("status")[_0x[7]]="STATUS: CORRUPTED";document[_0x[6]]("title")[_0x[7]]=document[_0x[6]]("title")[_0x[7]][_0x[2]]("")[_0x[22]]()[_0x[1]]("");document[_0x[6]]("phase-art").src="phase-reverse.png";return}break;case 34:if(input===_revcomp(_seq)){_redir();return}}_show();alert("Invalid sequence");};
    window._0xv=window.submitCode;
})();
