window.addEventListener('DOMContentLoaded', async () => {
    try {
      let response = await axios.get('https://crudcrud.com/api/7cfd2de103a54e2986d2e35382b9352c/productdetails')
  
      for (let i = 0; i < response.data.length; i++) {
        reloaddata(response.data[i])
      }
  
      let li = document.querySelectorAll('.newlist')
      let x = document.querySelectorAll('.sellbtn')
      let z = document.querySelectorAll('.sellinput')
  
      for (let i = 0; i < li.length; i++) {
        x[i].onclick =  () => {
          let inputvalue = z[i].value
  
          if (response.data[i].quantity == 0) {
            alert('The product is out of stock')
            return;
          } else if (response.data[i].quantity < inputvalue) {
            alert('Selling quantity should be less than available quantity')
            return
          }
           else {
            alert('confirm ?')
          }
  
          const updatedquantity = parseInt(response.data[i].quantity - inputvalue)

          li[i].textContent = '[ Product=' + response.data[i].product + '] [Description=' + response.data[i].description + '] [Price=' + response.data[i].price + '] [Quantity=' + updatedquantity + ']'
  
            updateProduct(response.data[i]._id, {
              product: response.data[i].product,
              description: response.data[i].description,
              price: response.data[i].price,
              quantity: updatedquantity
            })
            
            setTimeout(() => {
                location.reload();
              }, 500)
            
        }
      }
    }
     catch (error) {
      alert('something went wrong');
    }
  })

   function updateProduct(productId, updatedData) {  
     axios.put(`https://crudcrud.com/api/7cfd2de103a54e2986d2e35382b9352c/productdetails/${productId}`, updatedData)
    
  }
  
  
  function reloaddata(obj) {

    // axios.delete(`https://crudcrud.com/api/7cfd2de103a54e2986d2e35382b9352c/productdetails/${obj._id}`)
    const parentelem = document.getElementById('lists')
    const childelem = document.createElement('li')
    childelem.className = 'newlist'
    childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description + '] [Price=' + obj.price + '] [Quantity=' + parseInt(obj.quantity) + ']'
    const sellbtn = document.createElement('input')
    const sellinput = document.createElement('input')
    sellbtn.className = 'sellbtn'
    sellinput.className = 'sellinput'
    sellbtn.type = 'button'
    sellinput.type = 'text'
    sellbtn.value = 'sell-item'
    sellinput.placeholder = 'Add-quantities to sell'
    childelem.appendChild(sellinput)
    childelem.appendChild(sellbtn)
    parentelem.appendChild(childelem)
  }
  
   function submitting(event) {
    event.preventDefault();
    const product = event.target.product.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = parseInt(event.target.quantity.value);
    const obj = {
      product,
      description,
      price,
      quantity
    }
      axios.post('https://crudcrud.com/api/7cfd2de103a54e2986d2e35382b9352c/productdetails', obj)
 
    location.reload();
  }
  