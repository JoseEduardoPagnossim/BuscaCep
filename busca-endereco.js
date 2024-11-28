document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("address-form");
    const spinner = document.getElementById("spinner");
    const errorMessage = document.getElementById("error-message");
    const resultDiv = document.getElementById("result");

        // Verifica se os elementos existem
    if (!form || !spinner || !errorMessage || !resultDiv) {
        console.error("Um ou mais elementos não foram encontrados na página!");
        return;
    }

    console.log("Formulário encontrado:", form);
    console.log("Spinner encontrado:", spinner);
    console.log("Div de erro encontrada:", errorMessage);
    console.log("Div de resultado encontrada:", resultDiv);


  
    // Função para buscar CEP pelo endereço
    async function fetchCepByAddress(state, city, street) {
      try {
        spinner.classList.remove("hidden"); // Exibe o spinner
        resultDiv.classList.add("hidden"); // Esconde o resultado anterior
        errorMessage.classList.add("hidden"); // Esconde a mensagem de erro
  
        // Faz a requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${state}/${city}/${street}/json/`);
        if (!response.ok) throw new Error("Erro ao buscar o endereço");
  
        const data = await response.json();
        if (data.length === 0) throw new Error("Nenhum CEP encontrado para este endereço!");
  
        // Exibe o primeiro resultado encontrado
        document.getElementById("cep").textContent = data[0].cep;
        resultDiv.classList.remove("hidden"); // Mostra o resultado
      } catch (error) {
        errorMessage.textContent = error.message; // Mostra mensagem de erro
        errorMessage.classList.remove("hidden");
      } finally {
        spinner.classList.add("hidden"); // Esconde o spinner
      }
    }
  
    // Manipula o envio do formulário
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Previne o envio padrão do formulário
      const state = document.getElementById("state").value.trim().toUpperCase(); // Estado em maiúsculas
      const city = document.getElementById("city").value.trim();
      const street = document.getElementById("street").value.trim();
  
      // Validação básica dos campos
      if (!state || !city || !street) {
        errorMessage.textContent = "Por favor, preencha todos os campos.";
        errorMessage.classList.remove("hidden");
        return;
      }
  
      fetchCepByAddress(state, city, street); // Faz a busca
    });
  });