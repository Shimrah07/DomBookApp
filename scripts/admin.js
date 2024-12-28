// admin.html (Admin Management Page)
// Retrieve loginData from localStorage. If data is not found or the email
//  in loginData is not admin@empher.com, redirect to the home
//  page and provide the alert: Admin Not Logged In.

// The Admin page includes a form to add new books with:

// Fields for title, author, and category.
// A select dropdown for the category with options: fiction, comedy, and technical.
// On submission:

// Send a POST request to the JSON server with the entered data.

// Display an alert: "Book Added Successfully."
// Display all books in a grid layout (4 books per row):

// Each book appears as a card showing:
// Title, Author, Category, Availability Status, and Borrowed Days (if applicable).
// 
// Include two buttons: Verify Book and Delete Book.
// Verify Button:
// Show a confirmation prompt stating: Are you sure to Verify..?. On clicking Yes:
// Set the isVerified status to true.

// Once verified, disable the Verify Book button (button.disabled = true).
// Save the changes using a PATCH request and update the UI.
// Delete Button:
// Show a confirmation prompt stating: Are you sure to Delete..?. On clicking Yes:
// Delete the book using a DELETE request and update the UI.

// import {url} from ("./scripts/baseurl.js");



window.onload = ()=>{
    getBook();
}

// function getData(){
//     let data = JSON.parse(localStorage.getItem("loginData"));
//     console.log(data);

//     let index = (data.length-1);
//     data.map((el, i) => {

//         if(el[index].email !== "admin@empher.com" && el[index].password !== "empher@123"){
//             alert("Admin Not Logged In.")
//             window.location.href = "index.html"

//         }
//         else{
//                 alert("Logging In as Admin")
//                 window.location.href = "admin.html"
//             }
            
//         })
// }

let form = document.getElementById("form")
form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    let title = form.title.value;
    let author = form.author.value;
    let category = form.select.value;
    let img = document.createElement("img")
    img.src = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

    let bookObj = {
        title, 
        author, 
        category, 
        isAvailable: true,
        isVerified: false,
        borrowedDays: null,
        img: img.src
    }

    try{

        let res = await fetch(`${url}/books`,{
            method: "POST",
            headers: {"content-type" : "application/json"}, 
            body: JSON.stringify(bookObj)
        } 
        )

        alert("Book Added Successfully.")
    }
    catch(err){
        console.log(err);
        alert("something went wrong")
    }

})

async function getBook(){
    try{

        let res = await fetch(`${url}/books`)
        let data = await res.json();
        console.log(data);
        displayData(data)


    }catch(err){
        console.log(err);
        alert("can't fetch book data")
    }
}


function displayData(arr){
    let cont = document.getElementById("cont");
    // cont.innerHTML = ""
    arr.map((el) =>{

        let card = document.createElement("div")
        card.innerHTML =
           `<h3>Title: ${el.title}</h3>
            <h4>Author: ${el.author}</h4>
            <h4>Category: ${el.category}</h4>
            <h4>Availability Status: ${el.isAvailable}</h4>
            <h4>Borrowed Days: ${el.borrowedDays}</h4>`


            // verify button
            // Include two buttons: Verify Book and Delete Book.
// Verify Button:
// Show a confirmation prompt stating: Are you sure to Verify..?. On clicking Yes:
// Set the isVerified status to true.

// Once verified, disable the Verify Book button (button.disabled = true).
// Save the changes using a PATCH request and update the UI.


// Delete Button:
// Show a confirmation prompt stating: Are you sure to Delete..?. On clicking Yes:
// Delete the book using a DELETE request and update the UI.

            let verBtn = document.createElement("button");
            verBtn.textContent = "Verify Book"

            verBtn.addEventListener("click", ()=>{
                confirm("Are you sure to Verify..?")
                if(confirm){
                    fetch(`${url}/books/${el.id}`, {
                        method: "PATCH", 
                        headers: {"content-type" : "application/json"},
                        body: JSON.stringify({...el, isVerified: true })
                    })
                    .then((res) => res.json())
                    .then((data) =>{
                        console.log(data)
                    });

                    button.disabled = true
                }
            })

            // delete button
            let delBtn = document.createElement("button");
            delBtn.textContent = "Delete Book";

            delBtn.addEventListener("click", ()=>{
                confirm("Are you sure to Delete..?")
                if(confirm){
                    fetch(`${url}/books/${el.id}`, {
                        method: "DELETE", 
                        headers: {"content-type" : "application/json"},
                    })
                    .then((res) => res.json())
                    .then(() =>{
                        card.remove();
                    });

                }
            })


            card.appendChild(verBtn)
            card.appendChild(delBtn)

            cont.appendChild(card)
    });


}
   



