const funcionArrow = () => {
    console.log("funcionArrow");
    const num = document.getElementById("numero").value;
    num % 2 === 0
      ? document.getElementById("resultado").innerText = num + " es par (Arrow)"
      : document.getElementById("resultado").innerText = num + " es impar (Arrow)";
};

document.getElementById("btnArrow").addEventListener("click", funcionArrow);