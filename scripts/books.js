


// available button
let avail = document.getElementById("avail")
avail.addEventListener("click", ()=>{
    getBook();


})

//borrow btn

let borrow = document.getElementById("borrow")
borrow.addEventListener("click", ()=>{
    getBorrowBook();
})


async function getBook(){
    try{

        let res = await fetch(`${url}/books`)
        let data = await res.json();
        console.log(data);
        displayData(data)


    }catch(err){
        console.log(err);
        // alert("can't fetch book data")
    }
}


function displayData(arr){
    let cont = document.getElementById("cont");
    // cont.innerHTML = ""
    arr.map((el) =>{

        if(el.isAvailable == true){
            
            let card = document.createElement("div")
            card.innerHTML =
            `<h3>Title: ${el.title}</h3>
            <h4>Author: ${el.author}</h4>
            <h4>Category: ${el.category}</h4>
            <h4>Availability Status: ${el.isAvailable}</h4>
            <h4>Borrowed Days: ${el.borrowedDays}</h4>`


            // borrow button

            let borrowBtn = document.createElement("button");
            borrowBtn.textContent = "Borrow Book"
            
            borrowBtn.addEventListener("click", ()=>{
                prompt("maximum 10 days")
                
                    fetch(`${url}/books/${el.id}`, {
                        method: "PATCH", 
                        headers: {"content-type" : "application/json"},
                        body: JSON.stringify({...el, isAvailable: false })
                    })
                    .then((res) => res.json())
                    .then((data) =>{
                        console.log(data)
                        alert("Book Borrowed Successfully")
                    });
                    
                    button.disabled = true
                
            })


            
            card.appendChild(borrowBtn)
            
            cont.appendChild(card)
        }


        });
        

}

async function getBorrowBook(){
    try{

        let res = await fetch(`${url}/books`)
        let data = await res.json();
        console.log(data);
        displayBorrowData(data)


    }catch(err){
        console.log(err);
        // alert("can't fetch book data")
    }
}


function displayBorrowData(arr){
    let cont = document.getElementById("cont");
    // cont.innerHTML = ""
    arr.map((el) =>{

        if(el.isAvailable == false){
            
            let card = document.createElement("div")
            card.innerHTML =
            `<h3>Title: ${el.title}</h3>
            <h4>Author: ${el.author}</h4>
            <h4>Category: ${el.category}</h4>
            <h4>Availability Status: ${el.isAvailable}</h4>
            <h4>Borrowed Days: ${el.borrowedDays}</h4>`


            // borrow button

            let borrowBtn = document.createElement("button");
            borrowBtn.textContent = "Return Book"
            
            borrowBtn.addEventListener("click", ()=>{
                confirm("Are you sure to return book..?")
                if(confirm){

                    fetch(`${url}/books/${el.id}`, {
                        method: "PATCH", 
                        headers: {"content-type" : "application/json"},
                        body: JSON.stringify({...el, isAvailable: true, borrowedDays: null})
                    })
                    .then((res) => res.json())
                    .then((data) =>{
                        console.log(data)
                        alert("Book Returned Successfully")
                    });
                    
                    
                }
                
                   
                
            })


            
            card.appendChild(borrowBtn)
            cont.appendChild(card)
        }


        });
        

}




