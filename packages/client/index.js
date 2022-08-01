var source;
var clientId;

if (typeof EventSource !== "undefined") {
  source = new EventSource("http://localhost:5003/api/notify", {});
} else {
  console.log("fuck u");
}

source.onmessage = function (e) {
  console.log(e.data);
  const data = JSON.parse(e.data);
  clientId = data.clientId;
  alert(data.msg);
};

source.onerror = function (e) {
  console.log("error");
};

const name = document.getElementById("name");
name.value = "nick";
const email = document.getElementById("email");
email.value = "nick@gmail.com";
const pass = document.getElementById("password");
pass.value = "gen";
const username = document.getElementById("username");
username.value = "sudonick";
const submit = document.getElementById("submit");

console.log("Hello World");

const post = () => {
  const data = {
    name: name.value,
    email: email.value,
    password: pass.value,
    username: username.value,
    clientId: clientId,
  };
  console.log(data);
  fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

console.log("end");
