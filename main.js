    window.addEventListener('DOMContentLoaded',() =>{
    axios.get('https://crudcrud.com/api/fae1b38a234e47e7882ebb3676ff7a74/productdetails')
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
            //    if(inputvalue.length == 0)
            //    {alert('wrong');
            //       return false
            //       }
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
                // console.log(inputvalue)
                // console.log(i)
                // console.log('btn 1 is clicked')
               li[i].textContent = '[ Product=' + response.data[i].product + '] [Description=' + response.data[i].description  +'] [Price='+ response.data[i].price + '] [Quantity=' + parseInt(response.data[i].quantity-inputvalue)+ ']'
               
     const sellbtn = document.createElement('input')
     const sellinput = document.createElement('input')
     sellbtn.className='sellbtn'
     sellinput.className='sellinput'
     sellbtn.type = 'button'
     sellinput.type = 'text'
     sellbtn.value = 'sell-item'
     sellinput.placeholder = 'Add-quantities to sell'
     sellinput.required = true
     li[i].appendChild(sellinput)
     li[i].appendChild(sellbtn)
    //  console.log(response.data[i].product)

      axios.put(`https://crudcrud.com/api/fae1b38a234e47e7882ebb3676ff7a74/productdetails/${response.data[i]._id}`,{
        product : response.data[i].product,
        description : response.data[i].description,
        price : response.data[i].price,
        quantity: response.data[i].quantity-inputvalue
      })
      .then((response) => {
        // console.log(response)
        location.reload()
      })
      .catch((erro) => {
        console.log('erro')
      })
                    }
        }
    })
    .catch((error) => {
        alert('something went wrong')
    })
    
    // return
} )
// location.reload()

function reloaddata(obj){
    // axios.delete(`https://crudcrud.com/api/895897f35b0e4524973943b2d578c74c/productdetails/${obj._id}`)
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
    axios.post('https://crudcrud.com/api/fae1b38a234e47e7882ebb3676ff7a74/productdetails', obj)
        .then((response) => {
            // showlist(response.data)
            // console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

        
    // function showlist(obj){
    //     var parentelem = document.getElementById('lists')

    //     var childelem = document.createElement('li')
    //     childelem.className='newlist'
    //      childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description +'] [Price='+ obj.price + '] [Quantity=' + obj.quantity + ']'

    //      const sellbtn = document.createElement('input')
    //      const sellinput = document.createElement('input')
    //      sellbtn.className='sellbtn'
    //      sellinput.className='sellinput'
    //      sellbtn.type = 'button'
    //      sellinput.type = 'text'
    //      sellbtn.value = 'sell-item'
    //      sellinput.placeholder = 'Add-quantity'
       
    //      childelem.appendChild(sellinput)
    //      childelem.appendChild(sellbtn)
    //      parentelem.appendChild(childelem)
    
    //     }
    location.reload()
    }
