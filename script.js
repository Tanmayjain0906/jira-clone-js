

const createButton = document.getElementsByClassName("button")[0];
createButton.addEventListener("click", listener);

const modalHTML = `<div class="modal-container">
<div class="cross">
        <p class="cross-button"><i class="fa-solid fa-xmark" style="color: black;"></i></i></p>
    </div>
<form id="create-form">
    <input type="text" name="title" placeholder="Title" required>
    <input type="text" name="assignee" placeholder="Assignee" required>
    <select name="status" required>
        <option value="TODO">TO DO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
        <textarea name="description" cols="30" rows="10" ></textarea>
        <button>Create</button>
    </select>
</form>
</div>`

function listener() {

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    const crossButton = document.getElementsByClassName("cross")[0];
    crossButton.addEventListener("click", listener2)
    
    function listener2()
    {
        modalContainer.remove();
    }

    const form = document.getElementById("create-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let obj = {};
        let children = e.target.children;
        for(let i=0;i<children.length;i++)
        {
            if(children[i].name)
            {
                obj[children[i].name] = children[i].value;
            }
               
          
        }
        
    })
}