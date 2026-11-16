//Before (Messy)
function getD(u) {
    fetch(u).then(r => r.json()).then(d => {
        let x = document.getElementById("box");
        x.innerHTML = "<p>" + d.n + "</p>";
        localStorage.setItem("u", JSON.stringify(d));
    });
}
