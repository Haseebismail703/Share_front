
let Post = (url,data)=>{
    fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(res){ console.log('Post successfully')})
    .catch(function(res){ console.log(res) })
}
  
let edit = (url,data) =>{
  fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(res){ console.log('Edit successfully') })
    .catch(function(res){ console.log(res) })

}


let upFile = (url,data) =>{
  fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(res){ console.log('Update file successfully') })
    .catch(function(res){ console.log(res) })

}


export {Post , edit,upFile}

