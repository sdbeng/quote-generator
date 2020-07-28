//grab node elements
const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote")
const quoteAuthor = document.querySelector("#author")
const twBtn = document.querySelector("#twitter")
const newQuote = document.querySelector("#new-quote")
const loader = document.querySelector("#loader")

//loader func
function loading(){
    //first show loader - use html prop hidden
    loader.hidden = false
    //then hide quote container, contains loader
    quoteContainer.hidden = true
}

//hide loader bring back container func
function loaderComplete(){
    //first check if loader is hidden
    if(!loader.hidden){
        //show quote container
        quoteContainer.hidden = false
        //hide loader
        loader.hidden = true
    }
}

//Get quote from api
async function getQuote() {
    //call loading
    loading()

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        //in order to solve the cors err, i make a call to a proxy first
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        
        //fetch call
        //i add the headers of the proxy to our api Url
        const response = await fetch(proxyUrl + apiUrl) //combine both
        // const response = await fetch(apiUrl) //w/o proxy
        const data = await response.json()
        console.log(data) //it will fail due to the cors policy

        //set the text content to apis data
        quoteText.textContent = data.quoteText
        //check if author is empty string
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText = 'Unknown'
        }else{
            quoteAuthor.textContent = data.quoteAuthor

        }
        //stop loading, show quote
        loaderComplete()

    } catch (error) {
        console.log('whoops, no quote...', error)
    }
}

//add event listeners
newQuote.addEventListener("click", getQuote)

//at load time
getQuote()