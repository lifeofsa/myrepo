const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const detail = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document .querySelector('.icon img')


const updateUI=(data)=>{

const {cityinfo,weatherinfo}=data;

    // update details template

    detail.innerHTML = `
    <h5 class="my-3">${cityinfo.EnglishName}</h5>
    <div class="my-3">${weatherinfo.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherinfo.Temperature.Metric.Value}</span>
        <span>&deg;c</span>
    </div>
    ` 
// update night and day & icons
const iconsrc = `img/icons/${weatherinfo.WeatherIcon}.svg`
icon.setAttribute('src',iconsrc)



let timesrc = null

if(weatherinfo.IsDayTime){
    timesrc='img/day.svg';
}
else{
    timesrc='img/night.svg'
}
time.setAttribute('src',timesrc)




// remove d - none class
if(card.classList.contains('d-none'))
{
    card.classList.remove('d-none');
}

}


const newcity = async(city) => {
    const cityinfo = await getCity(city)
    const weatherinfo = await getWeather(cityinfo.Key);

    return {
        cityinfo,weatherinfo
    }

};

cityForm.addEventListener('submit',(e)=>{
    // prevent default 

    e.preventDefault()

    const citysearch = cityForm.city.value.trim()
    cityForm.reset()


    // update city

    newcity(citysearch)
        .then(data=>updateUI(data))
        .catch(err=>console.log(err));
});