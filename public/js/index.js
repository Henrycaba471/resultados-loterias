const results = document.querySelector('.results');
const resultsSort = document.querySelector('.results-sorteos');
const luckiest = document.querySelector('.luckiest');
const nameLot = document.createElement('h2');
const ul = document.createElement('ul');

document.addEventListener("DOMContentLoaded", () => {
    const loteriaButtons = document.getElementById("loteriaButtons");
    const sorteosButtons = document.getElementById("sorteosButtoms");

    loteriaButtons.addEventListener("click", getRes);
    sorteosButtons.addEventListener("click", getRes);

});

const getRes = (event) => {
    const target = event.target;

    if (target.tagName === "A") {
        event.preventDefault();
        const loteriaName = target.getAttribute("data-name");
        const url = `https://loteriasdehoy.co/${loteriaName}`;

        results.innerHTML = "";
        ul.innerHTML = "";
        nameLot.textContent = `${target.textContent.trim()} | Resultados mas recientes`;
        //console.log(url);
        // Realizar una solicitud fetch para enviar la URL al backend
        fetch("/traer-resultados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Procesar los datos recibidos
                } else {
                    throw new Error("Error en la solicitud");
                }
            })
            .then((data) => {
                // Manejar los datos recibidos (por ejemplo, actualizar la interfaz con los resultados)
                //console.log(data.results.loteria.listNum);
                let resultados = data.results.loteria.numbers;
                let numbers = data.results.loteria.listNum;
                let winner = '';
                numbers.forEach((number) => {
                    winner += `${number}`
                });

                let forLook = winner.split('').map(Number).reduce((acc, number) => { return (acc + number) });
                //console.log(forLook);
                let luckNum = ((forLook * Math.random() * 365)).toString().split('.')[1].substring(0, 4).split('');
                //console.log(luckNum);
                results.innerHTML = "";
                luckiest.innerHTML = "";
                luckiest.innerHTML = `
                    <h3>Tu número de la suerte</h3>
                    <h1><span>${luckNum[0]}</span><span>${luckNum[1]}</span><span>${luckNum[2]}</span><span>${luckNum[3]}</span></h1>
                    <h3>Para ${target.textContent.trim()}</h3>
                `;
                resultados.forEach((num) => {
                    const li = document.createElement("li");
                    li.innerText = num
                    ul.appendChild(li);
                });
                results.appendChild(nameLot);
                results.appendChild(ul);
            })
            .catch((error) => {
                // Manejar errores de red u otros errores aquí
                console.error(error);
                results.innerHTML = "";
                results.innerHTML = `<h2>Server Refused the connection</h2>`;
            });
    }
}

