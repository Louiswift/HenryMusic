async function search(){
    const resp = await fetch('http://localhost:3000/search?keywords=');
    return await resp.json();
} 
search().then(resp => {
    const search = document.getElementById("search");
   
});