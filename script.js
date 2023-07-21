

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
    </select>
        <textarea name="description" cols="30" rows="10" ></textarea>
        <button class="submit-button">Create</button>
    
</form>
</div>`

function listener() {

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    const crossButton = document.getElementsByClassName("cross")[0];
    crossButton.addEventListener("click", listener2)

    function listener2() {
        modalContainer.remove();
    }

    const form = document.getElementById("create-form");
    form.addEventListener("submit", formListener);

    function formListener(event) {
        event.preventDefault();
        let obj = {};
        let children = event.target.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].name) {
                obj[children[i].name] = children[i].value;
            }
        }
        createTask(obj);
        modalContainer.remove();
        form.removeEventListener("submit", formListener);
    }
}

// {/* <div class="task" draggable="true">
//     <h3>Title</h3>
//     <strong class="assinee-name">Tanmay Jain</strong>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aliquid eveniet magni repellat nobis.
//     </p>
// </div> */}
let count = 0;
function createTask(obj) {
    
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = "true";
    task.id = `task-${count}`;
    count++;
    task.innerHTML = `<h4>${obj.title}</h4>
    <b class="assinee-name">${obj.assignee}</b>
    <p>${obj.description}</p>`
    
    task.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("source", task.id);
        event.dataTransfer.setData("parent", obj.status);
    })
    const status = document.getElementById(obj.status);
    status.appendChild(task);
   
}



let openBox = false;
function toggleProjectDropDown()
{
    const projectDropdownList = document.getElementsByClassName("dropdown-list")[0];
    projectDropdownList.style.display = (projectDropdownList.style.display == "none") ? (projectDropdownList.style.display = "block") : (projectDropdownList.style.display = "none");

}

const panels = document.getElementsByClassName("panel");

for(let i=0;i<panels.length;i++)
{
    panels[i].addEventListener("dragover", (event) => {
        event.preventDefault();
    })
    panels[i].addEventListener("drop", (event) => {
        const parentId = event.dataTransfer.getData("parent");
        const sourceId = event.dataTransfer.getData("source");
        const draggableElement = document.getElementById(sourceId);
        event.target.appendChild(draggableElement);
        
    })
}