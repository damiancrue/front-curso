
// const { createApp } = Vue
// createApp({
// data() {
// return {
// id:0,
// nombre:"",
// imagen:"",
// stock:0,
// precio:0,
// url:'https://damiancrue.pythonanywhere.com/productos',
// descripcion:"",
// activo:0
// }
// },
// methods: {
//     fetchData(url) {
//         fetch(url)
//         .then(response => response.json())
//         .then(data => {
//         this.productos = data;
//         console.log(data)
//         this.cargando=false
//         })
//         .catch(err => {
//         console.error(err);
//         this.error=true
//         })
//         },
//         eliminar(producto) {
//         const url = this.url+'/' + producto;
//         var options = {
//         method: 'DELETE',
//         }
//         fetch(url, options)
//         .then(res => res.text()) // or res.json()
//         .then(res => {
//         location.reload();
//         })
//         },
// grabar() {
// let producto = {
// nombre:this.nombre,
// precio: this.precio,
// stock: this.stock,
// imagen:this.imagen,
// descripcion:this.descripcion,
// activo:this.activo
// }
// console.log(producto)
// var options = {
// body: JSON.stringify(producto),
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// redirect: 'follow'
// }
// fetch(this.url, options)
// .then(function () {
// alert("Registro agregado")
// window.location.href = "./admin.html";
// })
// .catch(err => {
// console.error(err);
// alert("Error al dar de alta")
// })
// }
// },
// created() {
// this.fetchData(this.url)
// },
// }).mount('#app')

const { createApp } = Vue
createApp({
data() {
return {
productos:[],
//url:'http://localhost:5000/productos',
// si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
url:'https://damiancrue.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
error:false,
cargando:true,
/*atributos para el guardar los valores del formulario */
id:0,
nombre:"",
imagen:"",
stock:0,
descripcion:"",
precio:0,
activo:1
}
},
methods: {
fetchData(url) {
fetch(url)

.then(response => response.json())
.then(data => {
this.productos = data;
this.cargando=false
})
.catch(err => {
console.error(err);
this.error=true
})
},
eliminar(producto) {
const url = this.url+'/' + producto;
var options = {
method: 'DELETE',
}
fetch(url, options)
.then(res => res.text()) // or res.json()
.then(res => {
location.reload();
})
},
grabar(){
let producto = {
nombre:this.nombre,
precio: this.precio,
stock: this.stock,
imagen:this.imagen,
descripcion:this.descripcion
}
var options = {
body:JSON.stringify(producto),
method: 'POST',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("Registro grabado")
window.location.href = "./admin.html";
})
.catch(err => {
console.error(err);
alert("Error al Grabarr")

})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')