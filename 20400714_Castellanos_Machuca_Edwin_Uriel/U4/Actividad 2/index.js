
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;


app.use(morgan("dev"));

app.get("/par/:num",(req,res)=>{

    const num = Number(req.params.num);
    if(num %2 == 0){
        res.send("el numero es par");
    }else{
        res.send("el numero es impar");
    }

})

app.get("/tabla/:numero",(req,res)=>{

    const numero = Number(req.params.numero);


    if(numero>=0 && numero<=10){
        let resultado = "";
        for(let i=1;i<=10;i++){
            resultado += `${numero} x ${i} = ${numero*i}<br>`;
        }
        res.send(resultado);

    }else{

        res.send("<h1>Numero invalido</h1>")
    }



})



app.get("/calculadora/:operacion/:a/:b",(req,res)=>{

    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const operacion = req.params.operacion;

    switch(operacion){
        case "suma":
            res.send(`Resultado: ${a+b}`);
            break;
        case "resta":
            res.send(`Resultado: ${a-b}`);
            break;
        case "multiplicacion":
            res.send(`Resultado: ${a*b}`);
            break;
        case "division":
            if(b===0){
                res.send("<h1>No se puede dividir entre 0</h1>");
            }else{
                res.send(`Resultado: ${a/b}`);
            }
            break;
        default:
            res.send("<h1>Operacion invalida</h1>");
    }
})


app.get("/calificacion/:nota",(req,res)=>{

        const calificacion = Number(req.params.nota);

        if(calificacion>=90){
            res.send("<h1>Exelente</h1>")
        }else if(calificacion>=80){
            res.send("<h1>Muy bien</h1>")
        }else if(calificacion>=70){
            res.send("<h1>Aprobado</h1>")
        }else{
            res.send("<h1>Reprobado</h1>")
        }

})

app.get("/edad/:edad",(req,res)=>{

    const edad = Number(req.params.edad);
    if(edad>=18){
        res.send("<h1>Mayor de edad</h1>");
    }else{
        res.send("<h1>Menor de edad</h1>");
    }
})



app.listen(port,()=> {
console.log("Servidor iniciado en http://localhost:"+port);
})