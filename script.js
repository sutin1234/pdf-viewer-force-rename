navigator.serviceWorker
  .register('sw.js')
  .then((reg) => {
    if (reg.installing) location.reload();
  })
  .catch(console.error);

const inp = document.querySelector('input');
inp.onchange = (e) => {
  const file = inp.files[0];
  displayRenamedPDF(file, 'new-name.pdf').then(console.log);
};

async function displayRenamedPDF(file, filename) {
  // we use an hard-coded fake path
  // to not interfere with legit requests
  const reg_path = '/name-forcer/';
  const url = reg_path + 'new-name.pdf';
  const store = await caches.open('name-forcer');
  await store.put(url, new Response(file));
  const frame = document.createElement('iframe');
  frame.style.width = '100%';
  frame.style.height = '100vh';
  document.body.append(frame);
  frame.src = url;
}
// clear previously cached files
(async () => {
  const store = await caches.open('name-forcer');
  const keys = await store.keys();
  for (const req of keys) {
    store.delete(req);
  }
})();
