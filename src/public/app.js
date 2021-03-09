document.addEventListener("DOMContentLoaded", (event) => {
  const divOver = document.querySelector('.modal');
  divOver.style.display = 'block' 
})

// var modal = document.getElementById('modal');

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
document.getElementById('button').addEventListener('click', () =>{
  const divOver = document.querySelector('.modal');
  divOver.style.display = "none";
})