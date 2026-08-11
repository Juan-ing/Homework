function ejecutar(metodo) {
  try {
    let arr, expr, result;

    switch (metodo) {
      // Iteración
      case 'map':
        arr = eval(document.getElementById("mapInput").value);
        expr = document.getElementById("mapExpr").value;
        result = arr.map(x => eval(expr));
        document.getElementById("mapOutput").innerText = JSON.stringify(result);
        break;

      case 'filter':
        arr = eval(document.getElementById("filterInput").value);
        expr = document.getElementById("filterExpr").value;
        result = arr.filter(x => eval(expr));
        document.getElementById("filterOutput").innerText = JSON.stringify(result);
        break;

      case 'reduce':
        arr = eval(document.getElementById("reduceInput").value);
        expr = document.getElementById("reduceExpr").value;
        let init = eval(document.getElementById("reduceInit").value);
        result = arr.reduce((acc, x) => eval(expr), init);
        document.getElementById("reduceOutput").innerText = result;
        break;

      case 'forEach':
        arr = eval(document.getElementById("forEachInput").value);
        expr = document.getElementById("forEachExpr").value;
        arr.forEach(x => eval(expr));
        document.getElementById("forEachOutput").innerText = "Ejecutado en consola";
        break;

      // Búsqueda
      case 'find':
        arr = eval(document.getElementById("findInput").value);
        expr = document.getElementById("findExpr").value;
        result = arr.find(x => eval(expr));
        document.getElementById("findOutput").innerText = result;
        break;

      case 'findIndex':
        arr = eval(document.getElementById("findIndexInput").value);
        expr = document.getElementById("findIndexExpr").value;
        result = arr.findIndex(x => eval(expr));
        document.getElementById("findIndexOutput").innerText = result;
        break;

      case 'some':
        arr = eval(document.getElementById("someInput").value);
        expr = document.getElementById("someExpr").value;
        result = arr.some(x => eval(expr));
        document.getElementById("someOutput").innerText = result;
        break;

      case 'every':
        arr = eval(document.getElementById("everyInput").value);
        expr = document.getElementById("everyExpr").value;
        result = arr.every(x => eval(expr));
        document.getElementById("everyOutput").innerText = result;
        break;

      // Manipulación
      case 'push':
        arr = eval(document.getElementById("pushInput").value);
        let valPush = eval(document.getElementById("pushValue").value);
        arr.push(valPush);
        document.getElementById("pushOutput").innerText = JSON.stringify(arr);
        break;

      case 'pop':
        arr = eval(document.getElementById("popInput").value);
        result = arr.pop();
        document.getElementById("popOutput").innerText = `Elemento eliminado: ${result}, Nuevo array: ${JSON.stringify(arr)}`;
        break;

      case 'shift':
        arr = eval(document.getElementById("shiftInput").value);
        result = arr.shift();
        document.getElementById("shiftOutput").innerText = `Elemento eliminado: ${result}, Nuevo array: ${JSON.stringify(arr)}`;
        break;

      case 'unshift':
        arr = eval(document.getElementById("unshiftInput").value);
        let valUnshift = eval(document.getElementById("unshiftValue").value);
        arr.unshift(valUnshift);
        document.getElementById("unshiftOutput").innerText = JSON.stringify(arr);
        break;

      case 'concat':
        let arr1 = eval(document.getElementById("concatInput1").value);
        let arr2 = eval(document.getElementById("concatInput2").value);
        result = arr1.concat(arr2);
        document.getElementById("concatOutput").innerText = JSON.stringify(result);
        break;

      case 'slice':
        arr = eval(document.getElementById("sliceInput").value);
        let start = parseInt(document.getElementById("sliceStart").value);
        let end = parseInt(document.getElementById("sliceEnd").value);
        result = arr.slice(start, end);
        document.getElementById("sliceOutput").innerText = JSON.stringify(result);
        break;

      case 'splice':
        arr = eval(document.getElementById("spliceInput").value);
        let s = parseInt(document.getElementById("spliceStart").value);
        let d = parseInt(document.getElementById("spliceDelete").value);
        let add = eval(document.getElementById("spliceAdd").value);
        arr.splice(s, d, add);
        document.getElementById("spliceOutput").innerText = JSON.stringify(arr);
        break;

      case 'sort':
        arr = eval(document.getElementById("sortInput").value);
        result = arr.sort((a,b)=>a-b);
        document.getElementById("sortOutput").innerText = JSON.stringify(result);
        break;

      case 'reverse':
        arr = eval(document.getElementById("reverseInput").value);
        result = arr.reverse();
        document.getElementById("reverseOutput").innerText = JSON.stringify(result);
        break;

      case 'join':
        arr = eval(document.getElementById("joinInput").value);
        let sep = document.getElementById("joinSep").value;
        result = arr.join(sep);
        document.getElementById("joinOutput").innerText = result;
        break;

      case 'includes':
        arr = eval(document.getElementById("includesInput").value);
        let valInc = eval(document.getElementById("includesValue").value);
        result = arr.includes(valInc);
        document.getElementById("includesOutput").innerText = result;
        break;

      case 'indexOf':
        arr = eval(document.getElementById("indexOfInput").value);
        let valIdx = eval(document.getElementById("indexOfValue").value);
        result = arr.indexOf(valIdx);
        document.getElementById("indexOfOutput").innerText = result;
        break;

      case 'lastIndexOf':
        arr = eval(document.getElementById("lastIndexOfInput").value);
        let valLastIdx = eval(document.getElementById("lastIndexOfValue").value);
        result = arr.lastIndexOf(valLastIdx);
        document.getElementById("lastIndexOfOutput").innerText = result;
        break;

      case 'flat':
        arr = eval(document.getElementById("flatInput").value);
        let depth = parseInt(document.getElementById("flatDepth").value);
        result = arr.flat(depth);
        document.getElementById("flatOutput").innerText = JSON.stringify(result);
        break;

      case 'flatMap':
        arr = eval(document.getElementById("flatMapInput").value);
        expr = document.getElementById("flatMapExpr").value;
        result = arr.flatMap(x => eval(expr));
        document.getElementById("flatMapOutput").innerText = JSON.stringify(result);
        break;
    }
  } catch (e) {
    document.getElementById(metodo + "Output").innerText = "Error: " + e.message;
  }
}
