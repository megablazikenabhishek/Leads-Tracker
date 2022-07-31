let myLeads = [];

const saveBtn = document.getElementById("save-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteEl = document.getElementById("delete-btn");
const saveTabs = document.getElementById("tab-btn");

//checking if there is any Local Storage available
let checkforLeads = JSON.parse(localStorage.getItem("myLeads"));
if(checkforLeads) {
    myLeads = checkforLeads;
    // console.log(myLeads);
    renderLeads();
}


saveBtn.addEventListener("click", function(){
    save();
});

inputEl.addEventListener("keypress", function(event){
    if(event.key == "Enter") {
        save();
    }
})

deleteEl.addEventListener("dblclick", function() {
    console.log(localStorage.clear());
    myLeads = [];
    ulEl.innerHTML = ""
})

saveTabs.addEventListener("click", function(){
    //using chrome API to capture the url
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) );
        ulEl.innerHTML = "";
        renderLeads();
    })
})

function save()
{
    myLeads.push(inputEl.value);

        ulEl.innerHTML = "";
        inputEl.value = "";

        //saving into local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        console.log(localStorage.getItem("myLeads"));
        
        //rendering the Leads
        renderLeads();
}

function renderLeads()
{
    for(let i=0; i<myLeads.length; i++)
        {
            ulEl.innerHTML += `
                <li>
                    <a target = '_blank' href = '${myLeads[i]}' >
                    ${myLeads[i]}
                    </a>
                </li>
            `
        }
}
