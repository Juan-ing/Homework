
document.getElementById("btnRegular").addEventListener("click", funcionRegular);
function funcionRegular() {
    console.log("funcionRegular");
      const num = document.getElementById("numero").value;
      if (num % 2 === 0) {
         document.getElementById("resultado").innerText = num + " es par (Regular)";
      } else {
        document.getElementById("resultado").innerText = num + " es impar (Regular)";
      }
    }