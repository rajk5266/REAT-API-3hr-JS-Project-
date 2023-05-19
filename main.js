    window.addEventListener('DOMContentLoaded',() =>{
    axios.get('https://crudcrud.com/api/a8e70d0ea63c4f1c91f88bf8ded63bfd/productdetails')
    .then((response) =>{
        for(let i=0; i<response.data.length; i++){
            reloaddata(response.data[i])   
        }
        var li = document.querySelectorAll('.newlist')
        let x = document.querySelectorAll('.sellbtn')
        let z = document.querySelectorAll('.sellinput')
        // console.log(x)
        for(let i=0; i<li.length; i++){
            
            x[i].onclick =() =>{
                let inputvalue = parseInt(z[i].value)
                if(response.data[i].quantity == 0){
                    // console.log("error")
                    alert('out of stock')
                   return 
                }
                else if(response.data[i].quantity < inputvalue){
                    alert('Input number should be less than available quantity ')
                    return 
                }
                else{
                    alert('confirm ?')
                }
                // console.log(li[i])
                // console.log(z[i].value)
                console.log(inputvalue)
                // console.log(i)
                console.log('btn 1 is clicked')
               li[i].textContent = '[ Product=' + response.data[i].product + '] [Description=' + response.data[i].description  +'] [Price='+ response.data[i].price + '] [Quantity=' + parseInt(response.data[i].quantity-inputvalue)+ ']'
               
     const sellbtn = document.createElement('input')
     const sellinput = document.createElement('input')
     sellbtn.className='sellbtn'
     sellinput.className='sellinput'
     sellbtn.type = 'button'
     sellinput.type = 'text'
     sellbtn.value = 'sell-item'
     sellinput.placeholder = 'Add-quantities to sell'
     li[i].appendChild(sellinput)
     li[i].appendChild(sellbtn)
     console.log(response.data[i].product)

     axios.put(`https://crudcrud.com/api/a8e70d0ea63c4f1c91f88bf8ded63bfd/productdetails/${response.data[i]._id}`,{
        product : response.data[i].product,
        description : response.data[i].description,
        price : response.data[i].price,
        quantity: response.data[i].quantity-inputvalue
      })
      setTimeout(location.reload(), 3000)
      
                    }
        }
    })
    .catch((error) => {
        alert('something went wrong')
    })
} )

function reloaddata(obj){
    // axios.delete(`https://crudcrud.com/api/a8e70d0ea63c4f1c91f88bf8ded63bfd/productdetails/${obj._id}`)
    let parentelem = document.getElementById('lists')

    let childelem = document.createElement('li')
    childelem.className='newlist'
     childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description +'] [Price='+ obj.price + '] [Quantity=' + obj.quantity + ']'

     const sellbtn = document.createElement('input')
     const sellinput = document.createElement('input')
     sellbtn.className='sellbtn'
     sellinput.className='sellinput'
     sellbtn.type = 'button'
     sellinput.type = 'text'
     sellbtn.value = 'sell-item'
     sellinput.placeholder = 'Add-quantities to sell'

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
    var quantity = parseInt(event.target.quantity.value)

    const obj ={
        product,
        description,
        price,
        quantity
    }
    // console.log(obj)
    // showlist(obj)
    axios.post('https://crudcrud.com/api/a8e70d0ea63c4f1c91f88bf8ded63bfd/productdetails', obj)
        .then((response) => {
            showlist(response.data)
            // console.log(response)
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
            console.log(temp)
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
            childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description  +'] [Price='+ obj.price + '] [Quantity=' + parseInt(obj.quantity-temp)+ ']'
            childelem.appendChild(sellinput)
         childelem.appendChild(sellbtn)
        }
         }
         childelem.appendChild(sellinput)
         childelem.appendChild(sellbtn)
         parentelem.appendChild(childelem)

        }
    }
