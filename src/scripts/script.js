document.querySelector('#tel').addEventListener('keyup', e => {
  let val = e.target.value;
  e.target.value = val
    .replace(/\D/g, '')
    .replace(/(\d{1})(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/g, function(
      txt,
      f,
      s,
      t,
      u,
      v
    ) {
      if (v) {
        return `${f} ( ${s} ) ${t}-${u}-${v}`;
      } else if (u) {
        return `${f} ( ${s} ) ${t}-${u}`;
      } else if (t) {
        return `${f} ( ${s} ) ${t}`;
      } else if (s) {
        return `${f} ( ${s} )`;
      } else if (f) {
        return `${f}`;
      }
    });
});
document.querySelectorAll('input').forEach(e =>
  e.addEventListener('keyup', e => {
    checkValidity();
  })
);
document.getElementById('submit-button').disabled = true;
function checkValidity() {
  const form = document.getElementById('login-form');
  const isValid = form.checkValidity();
  if (isValid) {
    document.getElementById('submit-button').disabled = false;
  } else {
    document.getElementById('submit-button').disabled = true;
  }
}
