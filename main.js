const API_URL = 'https://image.tmdb.org/t/p/w500/';

// 다크모드
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGEyOGNkMmFhZTQ2MDU4ZTA0ODA4ZmRkZGNlYmI1MSIsInN1YiI6IjY2MjllYzA3ZGUxMWU1MDA5YjcwY2NmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-uIQN59ATtVRmAkvkeL0Qcvm_Mwl1bG35uvhCHZSK_I'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {

        let data = response['results'];
        console.log(data);


        let main_card = document.getElementById("main_card");
        let bt_search = document.getElementById("bt_search");
        let input_movie = document.getElementById("input_movie");

        let buttonclick = () => {
            let resultHtml = "";
            let input_movie_value = input_movie.value.toLowerCase();
            data.forEach((item, idx) => {
                let title_name = data[idx]['title'].toLowerCase();
                if (title_name.includes(input_movie_value)) {

                    resultHtml +=
                        `
                    <div onclick=alert('id='+'${data[idx]['id']}') class="card col-4 card_event">
                        <h1 style="font-size:23px; font-weight: bolder;">${data[idx]['title']}</h1>
                        <img class="card_image" src=${API_URL + data[idx]['poster_path']}>
                        <button style="margin-right:95px;" type="button" class="btn btn-outline-dark card_button ">More</button>
                        <button style="margin-left:95px;" onclick=alert(${data[idx]['overview']}) type="button" class="btn btn-outline-dark card_button ">줄거리</button>
                    </div>
                    `;
                    main_card.innerHTML = resultHtml;
                }
            })



        }
        bt_search.addEventListener('click', buttonclick);



        //엔터키 누를시에 검색 
        document.addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                bt_search.click();
            }
        });





        // 메인화면 ( 카드 ) 조회
        let resultHtml = "";
        let MadeCard = () => {
            data.forEach((item, idx) => {
                console.log(data[idx]['overview']);
                resultHtml +=
                    `
                    <div  class="card col-4 card_event">
                        <h1 style="font-size:23px; font-weight: bolder;">${data[idx]['title']}</h1>
                        <img onclick=alert('id='+'${data[idx]['id']}') class="card_image" src=${API_URL + data[idx]['poster_path']}>
                        <button style="margin-right:95px;" onclick=alert('평점:'+${data[idx]['vote_average']}) type="button" class="btn btn-outline-dark card_button ">평점</button>
                        <button style="margin-left:95px;" onclick=alert(${data[idx]['overview']}) type="button" class="btn btn-outline-dark card_button ">줄거리</button>
                    </div>
                    `;
                main_card.innerHTML = resultHtml;

            })
        }




        MadeCard();










    })
    .catch(err => console.error(err));


