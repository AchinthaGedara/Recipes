
// Save data to local storage
divTask.addEventListener("click", (event) => {
    let cardID;
    if (event.target.classList.contains("fa-save")) {
        cardID = event.target.parentElement.getAttribute("cardID");
        event.target.parentElement.children[1].style.display = 'none';
        console.log(ID);
        save(cardID);
    }
    //Delete a recipe
    if (event.target.classList.contains("fa-window-close")) {
        cardID = event.target.parentElement.parentElement.getAttribute("cardID");
        deleteCard(cardID);
    }
});

//Load data from local storage 
document.querySelector(".fa-download").addEventListener("click", () => {
    let [ID, recipeDetails] = load();
    if (ID > 0) {
        generateHtmlLocalStorage(recipeDetails);
    }
});

//Loading values from local storage
const load = () => {
    let currentId = 0;
    if (localStorage.getItem("currentID")) {
        const recipes = localStorage.getItem("tasks");
        recipeArray = JSON.parse(recipes);
    }

    if (localStorage.getItem("currentID")) {
        currentId = localStorage.getItem("currentID");
        currentId = Number(currentId);
    }
    return [currentId, recipeArray];
}

//Save data to local storage
const save = (newCardID) => {
    [ID, array] = load();
    ID++;
    // Create a JSON string
    let cardID = Number(newCardID);
    array.push([twoDimentionalArrayHTML[cardID - 1][1], twoDimentionalArrayHTML[cardID - 1][2], twoDimentionalArrayHTML[cardID - 1][3], twoDimentionalArrayHTML[cardID - 1][4]]);
    console.log("two" + twoDimentionalArrayHTML[0][1]);
    const tasksJson = JSON.stringify(array);

    console.log("task" + tasksJson);
    // Store the JSON string /
    localStorage.setItem("tasks", tasksJson);

    // Store the currentId in localStorage
    localStorage.setItem("currentID", ID);
}

//Delete a recipe
const deleteCard = (newCardID) => {
    let cardID = Number(newCardID);
    let [ID, recipeDetails] = load();
    recipeDetails.splice([cardID - 1], 1);
    const tasksJson = JSON.stringify(recipeDetails);

    console.log(tasksJson);
    // Store the JSON string /
    localStorage.setItem("tasks", tasksJson);

    // Store the currentId in localStorage
    localStorage.setItem("currentID", --ID);
    generateHtmlLocalStorage(recipeDetails);
    console.log(recipeDetails);
}

// Display HTMl on screen for saved data
const generateHtmlLocalStorage = (recipeDetails) => {
    let html = "";
    let ID = 1;
    recipeDetails.map((param) => {
        html +=
            `<div class="row pt-3">
                <div class="col-12 d-flex justify-content-end">
                    <div class="card  rounded-3 px-2 py-2 me-5 card-outer" style="max-width: 640px">
                        <div class="card rounded-3 bg-white shadow-lg  ps-0 card-inner"
                            style="max-width: 640px; max-height:400px;">
                            <div class="row h-100" >
                                <div class="col-sm-4 col-4 d-flex justify-content-start h-100" cardID="${ID}">
                                    <span class="close-button">
                                    <i class="fas fa-window-close fa-lg"></i>
                                    </span>                                    
                                    <img src="${param[0]}" class="img-fluid rounded-0 card-image" style="object-fit:cover">                                    
                                </div>
                                <div class="col-sm-8 col-8  pl-0 py-2">
                                    <div class="card-block">                                                                        
                                        <h4>                                          
                                                ${param[1]}                                            
                                        </h4>                                                                            
                                        <hr>     
                                        <div class="row ingredient-list ps-2">                                                                    
                                            <ol class="ingredient-list" >     
                                                    ${param[2]}
                                            </ol>
                                        </div>
                                        <hr>
                                        <div class="view-recipe mb-0 pb-0" cardID="${ID}">                                                                                
                                            <a href="${param[3]}" target="_blank" class="text-muted pe-4"> View Receipe >> </a>                                                                                                                    
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        ID++;
    });
    document.querySelector(".recipes").innerHTML = html;
}