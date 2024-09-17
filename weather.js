// fetch(`https://api.openweathermap.org/data/2.5/weather?q=noida&appid=4ef1df93224ac10d89b10b5564db39b0`)

const form = document.querySelector("#form");
const inp = document.querySelector("#inp");
const img = document.querySelector("#img");
const temp = document.querySelector("#temp");
const cloud = document.querySelector("#cloud");
const city = document.querySelector("#city");

async function apiCall(city){

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ef1df93224ac10d89b10b5564db39b0`
        );
        const result=await response.json();
        console.log(result);

        
        return displayData(result)
    
    }


    catch(e){
        console.log(e);
    }
}


    navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude}=position.coords;
            getCurrentPosition(latitude,longitude)
        
        },
        (err)=>{
            console.log(err);
        }
    );



     async function getCurrentPosition(a,b){
        try{
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=4ef1df93224ac10d89b10b5564db39b0`
            );
            const result=await response.json();
            if(result) return displayData(result)
                console.log(result)
        
        }
        catch(e){
            console.log(e);
        }
}

function displayData(data){
    city.textContent=data.name;
    cloud.textContent=data.weather[0].description
    temp.textContent= Math.round(data.main.temp) - 273 + "°C";
    img.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    apiCall(inp.value);
    console.log(inp.value);
    getLocation()
});