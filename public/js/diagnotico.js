
const resultados = JSON.parse(localStorage.getItem("resultados"));
const variablesDifuso = JSON.parse(localStorage.getItem("variablesDifuso"));
const usuario = JSON.parse(localStorage.getItem("usuario"));
const variablesClasificadas = resultados["variables seleccionadas"];
const reglasSE = resultados["reglas activadas SE"];
const reglasDifuso = resultados["Reglas activadas SD"];

const ruta = "http://localhost:4000/api/diagnosis/results";
const ruta2 = "http://localhost:4000/api/diagnosis/download";

const tablaClasificador = document.getElementById('tablaClasificador');
const tablaReglasSE = document.getElementById('tablaReglasSE');
const variablesSE = document.getElementById('variablesSE');
const tablaReglasDifuso = document.getElementById('tablaReglasDifuso');
const pesoSE = document.getElementById('pesoSE');
const salidaDifuso = document.getElementById('salidaDifuso');
const vairablesDif = document.getElementById('variablesDifuso');
const etiquetaDifuso = document.getElementById('etiquetaDifuso');
const diagnostico = document.getElementById('diagnostico');

const boton = document.getElementById('guardar');
const descarga = document.getElementById('descargar');
const volver = document.getElementById('volver');

boton.addEventListener('click', (e) => {
    saveInformation();
    e.preventDefault();
});

descarga.addEventListener('click', (e) => {
    descargar();
});

volver.addEventListener('click', (e) => {
    window.location = "index.html";
});

function nombreVar(variable) {

    let nombre = "";

    switch (variable) {

        case "pregnancies":
            nombre = "N° de embarazos";
            break;
        case "preprandial_glucose":
            nombre = "Glucosa Prepandial";
            break;
        case "diastolic_blood_pressure":
            nombre = "Presión sanguinea diastolica";
            break;
        case "triceps_skin_fold_thickness":
            nombre = "Grosor del pliegue cutáneo del tríceps";
            break;
        case "serum_insulin":
            nombre = "Insulina";
            break;
        case "body_mass_index":
            nombre = "Indice de masa corporal";
            break;
        case "diabetes_pedigree_function":
            nombre = "función de pedigree de diabetes";
            break;
        case "age":
            nombre = "Edad";
            break;
        case "stress_level":
            nombre = "Nivel de estres";
            break;
        case "cholesterol":
            nombre = "Colesterol";
            break;
        case "triglyceries":
            nombre = "Trigliceridos";
            break;
        case "gender":
            nombre = "Genero";
            break;
        case "capillar_glucose":
            nombre = "Glucosa capilar";
            break;
        case "postprandial_glucose":
            nombre = "Glucosa postprandial";
            break;
        case "glycosylated_hemoglobin":
            nombre = "Hemoglobina glicosilada";
            break;
        case "exercise":
            nombre = "Ejercicio Fisico";
            break;
        case "sedentary_life":
            nombre = "Vida sedentario";
            break;
        case "smoke":
            nombre = "Fuma";
            break;
        case "alcoholism":
            nombre = "Alcohol";
            break;
        case "fatty_fod":
            nombre = "Alimentos grasos";
            break;
        case "blurry_vision":
            nombre = "Visión borrosa";
            break;
        case "fatigue":
            nombre = "Fatiga";
            break;
        case "pain_hands_feet":
            nombre = "Dolor-entumecimiento en pies y manos";
            break;
        case "slow_healing":
            nombre = "Cicatrización lenta";
            break;
        case "drugs":
            nombre = "Farmacos";
            break;

        default:
            break;
    }

    return nombre;
}

function distribucionVar(variable) {

    let distribucion = "";

    switch (variable) {

        case "pregnancies":
        case "preprandial_glucose":
        case "diastolic_blood_pressure":
        case "triceps_skin_fold_thickness":
        case "serum_insulin":
        case "body_mass_index":
        case "diabetes_pedigree_function":
        case "age":
        case "stress_level":
        case "cholesterol":
        case "triglyceries":
        case "gender":
        case "capillar_glucose":
        case "postprandial_glucose":
        case "glycosylated_hemoglobin":
            distribucion = "Distribución Gaussiana";
            break;
        case "exercise":
        case "sedentary_life":
        case "smoke":
        case "alcoholism":
        case "fatty_fod":
        case "blurry_vision":
        case "fatigue":
        case "pain_hands_feet":
        case "slow_healing":
        case "drugs":
            distribucion = "Distribución de Bernoulli";
            break;

        default:
            break;
    }

    return distribucion;
}

function descargar() {
    fetch(ruta2,{
        method: 'POST',
        body: JSON.stringify({ usuario, variablesDifuso, resultados}),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.blob())
        .then(blob => {
            var file = window.URL.createObjectURL(blob);
             window.location.assign(file);
        });
}

function saveInformation() {
    fetch(ruta, {
        method: 'POST',
        body: JSON.stringify({ nombre: usuario.nombre, documento: usuario.documento, diagnostico: resultados }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Se ha guardadod el diagnostico correctamente');
            window.location = "index.html";
            // Swal.fire({
            //     type: 'success',
            //     title: 'Mensaje',
            //     text: 'Se ha guardado el diagnostico correctamente'
            // });
        });
}

for (let i = 0; i < variablesClasificadas.length; i++) {

    const renglon = document.createElement('tr');
    const nombreVariable = document.createElement('span');
    nombreVariable.className += "badge badge-secondary";
    nombreVariable.innerHTML = nombreVar(variablesClasificadas[i].variable);

    const numero = document.createElement('td');
    numero.innerHTML = i + 1;
    const h5 = document.createElement('h5');
    h5.appendChild(nombreVariable);
    const nombre = document.createElement('td').appendChild(h5);
    const distribucion = document.createElement('td');
    distribucion.innerHTML = distribucionVar(variablesClasificadas[i].variable);
    const valor = document.createElement('td');
    valor.innerHTML = variablesClasificadas[i].value;

    renglon.appendChild(numero);
    renglon.appendChild(nombre);
    renglon.appendChild(distribucion);
    renglon.appendChild(valor);

    tablaClasificador.appendChild(renglon);
}

for (let i = 0; i < reglasSE.length; i++) {
    const renglonRegla = document.createElement('tr');
    const rengloVariable = document.createElement('tr');
    const nombreRegla = document.createElement('span');
    const nombreVariable = document.createElement('span');
    nombreRegla.className += "badge badge-secondary";
    nombreRegla.innerHTML = reglasSE[i].regla;
    nombreVariable.className += "badge badge-secondary";
    nombreVariable.innerHTML = reglasSE[i].variable;

    const numeroRegla = document.createElement('td');
    numeroRegla.innerHTML = i + 1;

    const numeroVariable = document.createElement('td');
    numeroVariable.innerHTML = i + 1;

    const reglaH5 = document.createElement('h5');
    reglaH5.appendChild(nombreRegla);

    const variableH5 = document.createElement('h5');
    variableH5.appendChild(nombreVariable);

    const regla = document.createElement('td').appendChild(reglaH5);
    const variable = document.createElement('td').appendChild(variableH5);

    const descripcion = document.createElement('td');
    descripcion.innerHTML = reglasSE[i].descripcion;

    const tipo = document.createElement('td');
    tipo.innerHTML = reglasSE[i].distribucion;

    const valor = document.createElement('td');
    valor.innerHTML = reglasSE[i].valor;

    const etiqueta = document.createElement('td');

    if (reglasSE[i].etiqueta == "Verdadero") {
        const span = document.createElement('span');
        span.className += "badge badge-success";
        span.innerHTML = reglasSE[i].etiqueta;

        const h5 = document.createElement('h5').appendChild(span);
        etiqueta.appendChild(h5);
    } else {
        etiqueta.innerHTML = reglasSE[i].etiqueta;
    }

    const peso = document.createElement('td');
    peso.innerHTML = reglasSE[i].peso;

    renglonRegla.appendChild(numeroRegla);
    renglonRegla.appendChild(regla);
    renglonRegla.appendChild(descripcion);

    rengloVariable.appendChild(numeroVariable);
    rengloVariable.appendChild(variable);
    rengloVariable.appendChild(tipo);
    rengloVariable.appendChild(valor);
    rengloVariable.appendChild(etiqueta);
    rengloVariable.appendChild(peso);

    tablaReglasSE.appendChild(renglonRegla);
    variablesSE.appendChild(rengloVariable);
}

const valorDif = resultados["peso final SE"];
let etiquetaPes = "";

if (Number(valorDif) < 30) {
    etiquetaPes = "Normal";
} else if (Number(valorDif) >= 30 && Number(valorDif) < 50) {
    etiquetaPes = "Prediabetes";
} else {
    etiquetaPes = "Diabetes";
}

variablesDifuso.push({ variable: "Peso salida SE", valor: valorDif, tipo: "No aplica", estado: etiquetaPes });

for (let i = 0; i < variablesDifuso.length; i++) {
    const rengloVariable = document.createElement('tr');
    const numero = document.createElement('td');
    numero.innerHTML = i + 1;

    const nombreVariable = document.createElement('span');
    nombreVariable.className += "badge badge-secondary";
    nombreVariable.innerHTML = variablesDifuso[i].variable;

    const variableH5 = document.createElement('h5');
    variableH5.appendChild(nombreVariable);

    const variable = document.createElement('td').appendChild(variableH5);

    const valor = document.createElement('td');
    valor.innerHTML = variablesDifuso[i].valor;

    const tipo = document.createElement('td');
    tipo.innerHTML = variablesDifuso[i].tipo;

    const boton = document.createElement('button');
    boton.type = "button";
    boton.innerHTML = variablesDifuso[i].estado;

    switch (variablesDifuso[i].estado) {
        case "Normal":
            boton.className += "btn btn-success";
            break;

        case "Prediabetes":
            boton.className += "btn btn-warning text-white";
            break;

        case "Diabetes":
            boton.className += "btn btn-danger";
            break;

        default:
            break;
    }

    const estado = document.createElement('td').appendChild(boton);

    rengloVariable.appendChild(numero);
    rengloVariable.appendChild(variable);
    rengloVariable.appendChild(valor);
    rengloVariable.appendChild(tipo);
    rengloVariable.appendChild(estado);

    vairablesDif.appendChild(rengloVariable);
}

for (let i = 0; i < reglasDifuso.length; i++) {
    const renglon = document.createElement('tr');
    const nombreRegla = document.createElement('span');
    nombreRegla.className += "badge badge-secondary";
    nombreRegla.innerHTML = reglasDifuso[i].regla;

    const numero = document.createElement('td');
    numero.innerHTML = i + 1;

    const h5 = document.createElement('h5');
    h5.appendChild(nombreRegla);

    const regla = document.createElement('td').appendChild(h5);

    const descripcion = document.createElement('td');
    descripcion.innerHTML = reglasDifuso[i].descripcion;

    renglon.appendChild(numero);
    renglon.appendChild(regla);
    renglon.appendChild(descripcion);

    tablaReglasDifuso.appendChild(renglon);
}

pesoSE.innerHTML = resultados["peso final SE"];
salidaDifuso.innerHTML = resultados["Valor del sistema difuso"];
etiquetaDifuso.innerHTML = resultados["Diagnostico de SD"];
diagnostico.innerHTML = resultados["Diagnostico de SD"];

console.log(variablesDifuso);
console.log(resultados);
console.log(tablaClasificador);