
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
document.querySelector('#year').textContent=new Date().getFullYear();
const box=document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(b=>b.addEventListener('click',()=>{box.querySelector('img').src=b.querySelector('img').src;box.querySelector('img').alt=b.dataset.caption;box.querySelector('p').textContent=b.dataset.caption;box.showModal()}));
box.querySelector('.close').addEventListener('click',()=>box.close());
box.addEventListener('click',e=>{if(e.target===box)box.close()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});document.querySelectorAll('.gallery-item').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter)}));
const shop=window.SHOP||{};
document.querySelectorAll('[data-config]').forEach(x=>{if(shop[x.dataset.config])x.textContent=shop[x.dataset.config]});
const form=document.querySelector('#enquiry');
if(form){
 const choice=document.querySelector('#service'),date=document.querySelector('#date'),status=document.querySelector('#status'),send=document.querySelector('#send');
 const q=new URLSearchParams(location.search).get('service');if([...choice.options].some(o=>o.value===q))choice.value=q;
 const today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
 if(shop.phone){const a=document.createElement('a');a.href='tel:'+shop.phone.replace(/[^+0-9]/g,'');a.textContent=shop.phone;document.querySelector('#phone-display').replaceChildren(a)}
 if(shop.mapUrl&&/^https:\/\//.test(shop.mapUrl)){const m=document.querySelector('#map');m.href=shop.mapUrl;m.hidden=false}
 form.addEventListener('input',()=>{send.hidden=true;status.textContent=''});
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=document.querySelector('#name').value.trim();if(!name){status.textContent='Please enter your name.';return}const msg='Hello Crown & Blade, I’m '+name+'. I’d like to enquire about '+choice.options[choice.selectedIndex].text+' on '+date.value+'. '+document.querySelector('#message').value.trim();
 if(!shop.whatsapp||!/^\d{7,15}$/.test(shop.whatsapp)){status.textContent='Preview only — the shop’s WhatsApp number has not been connected. Nothing has been sent or booked.\n\nYour enquiry:\n'+msg;return}
 send.href='https://wa.me/'+shop.whatsapp+'?text='+encodeURIComponent(msg);send.hidden=false;status.textContent='Your enquiry is ready. Continue to WhatsApp to send it. The shop will confirm availability.'});
}
