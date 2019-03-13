
    let url = new URLSearchParams(window.location.search);
    let user = url.get("username");

    fetch(`https://api.github.com/users/${user}`)
        .then(resp => resp.json())
        .then(function(json) {
            if (json.message === "Not Found") {
                let error = document.createElement("error");
                let errorText = document.createTextNode("Информация о пользователе не доступна");
                error.appendChild(errorText);
                document.body.appendChild(error);
            } else {
                //аватарка пользователя
                let userPhoto = document.getElementById("userPhoto");
                let img = document.createElement("img");
                img.src = json.avatar_url;
                userPhoto.appendChild(img);

                //имя пользователя
                let userName = document.getElementById("userName");
                let a = document.createElement("a");
                let linkText = document.createTextNode(json.name);
                a.appendChild(linkText);
                a.href = json.html_url;
                userName.appendChild(a);

                //описание профиля
                let userInformation = document.getElementById("userInformation");
                let p = document.createElement("p");
                let userText = document.createTextNode(json.bio);
                p.appendChild(userText);
                userInformation.appendChild(p);
            }
        })
        .catch((err) => {
            console.log(err);
        });
