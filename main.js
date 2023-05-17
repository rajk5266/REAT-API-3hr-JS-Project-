// window.addEventListener('DOMContentLoaded',() =>{
//     axios.get('https://crudcrud.com/api/60d01c6f01b14b2985f4f51db84b7a38/productdetails')
//     .then((response) =>{
//         for(let i=0; i<response.data.length; i++){
//             reloaddata(response.data[i])
//         }
//     })
//     .catch((error) => {
//         alert('something went wrong')
//     })
// } )

function reloaddata(obj){
    var parentelem = document.getElementById('lists')

    var childelem = document.createElement('li')
    // childelem.className='newlist'
     childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description +'] [Price='+ obj.price + '] [Quantity=' + obj.quantity + ']'

     const sellbtn = document.createElement('input')
     const sellinput = document.createElement('input')
     sellbtn.id='sellbtn'
     sellinput.id='sellinput'
     sellbtn.type = 'button'
     sellinput.type = 'text'
     sellbtn.value = 'sell-item'
     sellinput.placeholder = 'Add-quantity'
     sellbtn.onclick = () => {
        var temp = parseInt(document.getElementById('sellinput').value)
        abc()
      function abc() { 
        if(obj.quantity == 0){
            // console.log("error")
            alert('out of stock')
           return 
        }
        else if(obj.quantity < temp){
            alert('please add less')
            return 
        }
        else{
            alert('confirm ?')
        }
        childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description  +'] [Price='+ obj.price + '] [Quantity=' + (obj.quantity-= temp)+ ']'
        
        childelem.appendChild(sellinput)
        childelem.appendChild(sellbtn)
    }
    var change = (obj.quantity-= temp)

    axios.put(`https://crudcrud.com/api/60d01c6f01b14b2985f4f51db84b7a38/productdetails/${obj._id}`,{
        product : "eclair",
        description : "choclate",
        price : "1",
        quantity: change
      })
        // console.log(temp)
     }
     childelem.appendChild(sellinput)
     childelem.appendChild(sellbtn)
     parentelem.appendChild(childelem)
   
    }

function submitting(event){
    event.preventDefault()
    
    // var listsbox = document.getElementById("lists")
    var product = event.target.product.value
    var description = event.target.description.value
    var price = event.target.price.value
    var quantity = event.target.quantity.value

    const obj ={
        product,
        description,
        price,
        quantity
    }

    axios.post('https://crudcrud.com/api/60d01c6f01b14b2985f4f51db84b7a38/productdetails', obj)
        .then((response) => {
            showlist(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

    function showlist(obj){
        var parentelem = document.getElementById('lists')

        var childelem = document.createElement('li')
        childelem.className='newlist'
         childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description +'] [Price='+ obj.price + '] [Quantity=' + obj.quantity + ']'

         const sellbtn = document.createElement('input')
         const sellinput = document.createElement('input')
         sellbtn.id='sellbtn'
         sellinput.id='sellinput'
         sellbtn.type = 'button'
         sellinput.type = 'text'
         sellbtn.value = 'sell-item'
         sellinput.placeholder = 'Add-quantity'
         sellbtn.onclick = () => {
            var temp = parseInt(document.getElementById('sellinput').value)
            abc()
          function abc() { 
            if(obj.quantity == 0){
                // console.log("error")
                alert('out of stock')
               return 
            }
            else if(obj.quantity < temp){
                alert('please add less')
                return 
            }
            else{
                alert('confirm ?')
            }
            childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description  +'] [Price='+ obj.price + '] [Quantity=' + (obj.quantity-= temp)+ ']'
            childelem.appendChild(sellinput)
         childelem.appendChild(sellbtn)
        }

           
            // console.log(temp)
         }
         childelem.appendChild(sellinput)
         childelem.appendChild(sellbtn)
         parentelem.appendChild(childelem)
       
        }

    }
    
