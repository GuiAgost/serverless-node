document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!username || !password) {
    alert("Por favor, preencha todos os campos");
  }

  const response = await fetch(
    "http://s7my8wppsa.execute-api.eu-west-1.amazonaws.com/api/login",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },  
    },
  );

  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem("token", token);
    window.location.href = "/";
  } else {
    alert("Usuário ou senha inválidos");
  }
});
