document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const popup = document.getElementById('successPopup');
    popup.innerHTML = `Ви благодариме, пораката е испратена.`;
    popup.style.display = 'block';
    this.reset();
    setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);
    console.log(data);
})
