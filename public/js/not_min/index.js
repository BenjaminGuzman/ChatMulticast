const xhr=(e,t="POST")=>{const n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return n.open(t,e),n};(()=>{const e=e=>{n.hidden=!1,document.querySelector("#warning-p").textContent=e},t=e=>0===e.length?"Escriba un nombre de usuario":e.length>50?"El nombre de usuario no puede exceder los 50 caracteres":/^[a-zA-Zá-úÁ-Úä-üÄ-ÜñÑ 0-9]+$/.test(e)?void 0:"Sólo se aceptan caracteres del alfabeto español";let n=document.querySelector("#warning");UIkit.alert(n),document.querySelector("form").addEventListener("submit",function(r){n.hidden=!0,r.preventDefault();const o=this.querySelector("#username").value,s=t(o);return s&&e(s),(t=>{const n=xhr("/join");n.onreadystatechange=(()=>{if(4===n.readyState)if(200===n.status)try{const t=JSON.parse(n.responseText);t.error&&e(t.msg)}catch(e){return document.open(),document.write(n.responseText),void document.close()}else 403===n.status?e("Deja ahí chamaco"):e("Algo salió mal")}),n.setRequestHeader("Content-Type","application/json;charset=utf8"),n.send(JSON.stringify({username:t}))})(o),!1}),document.querySelector("#username").addEventListener("input",function(){n.hidden=!0;const r=t(this.value);r&&e(r)})})();