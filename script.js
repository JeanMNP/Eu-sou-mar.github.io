//Jean Marcelo Nogueira Paes Leme
//Para contemplação do projeto 02, será feita um conjunto de funções, eventos para adicionar e excluir conteudos em uma lista e Localstorage
//contantes para uso da função, ele pega do que o usuario escreve e o armazena
document.addEventListener('DOMContentLoaded', (event) => {
    const LDU = document.getElementById('LDU');
    const usuarioVal = document.getElementById('usuario');
    const emailVal = document.getElementById('email');
    const form = document.getElementById('userForm');

    // Carregar usuários do Local Storage ao iniciar
    loadUsers();

    form.addEventListener('submit', function(event) {
        //transformar em constantes para uso e colocar em uma lista 
        event.preventDefault();
        const usuario = usuarioVal.value;
        const email = emailVal.value;
        const date = new Date().toLocaleString();
        const dadoUsuario = { usuario, email, date };

        // Adicionar usuário à lista e ao Local Storage
        addUser(dadoUsuario);
        usuarioVal.value = '';
        emailVal.value = '';});

    function addUser(dadoUsuario) {
        // Adicionar ao Local Storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(dadoUsuario);
        localStorage.setItem('users', JSON.stringify(users));

        // Adicionar à lista na página
        appendUserToList(dadoUsuario);}

    function appendUserToList(dadoUsuario) {
        const li = document.createElement('li');
        li.textContent = `${dadoUsuario.date} - ${dadoUsuario.usuario} - ${dadoUsuario.email}`;
        
        // Botão de exclusão individual
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = function() {
            li.remove();
            deleteUser(dadoUsuario);
        };
        
        li.appendChild(deleteBtn);
        LDU.appendChild(li);}

    function deleteUser(dadoUsuario) {
        let users = JSON.parse(localStorage.getItem('users'));
        users = users.filter(user => user.date !== dadoUsuario.date);
        localStorage.setItem('users', JSON.stringify(users));}

    function loadUsers() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(appendUserToList);}
    
    //A penultima parte, excluir tudo da lista e do Local Storage
    document.getElementById('BDT').addEventListener('click', function() {
        deleteAllUsers();});
    
    function deleteAllUsers() {
        // Lidocumentmpar a lista na página
        LDU.innerHTML = '';
    
        // Limpar o Local Storage
        localStorage.removeItem('users');}
    //esta é a ultima, a opção de pesquisa
    document.getElementById('search').addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filterUsers(searchTerm);
        });

    function filterUsers(searchTerm) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const filteredUsers = users.filter(user => {
                const usuario = user.usuario.toLowerCase();
                const email = user.email.toLowerCase();
                return usuario.includes(searchTerm) || email.includes(searchTerm);
            });
        
            // Limpar a lista atual
            LDU.innerHTML = '';
        
            // Adicionar os usuários filtrados à lista
            filteredUsers.forEach(appendUserToList);
    }
            
    //13/06/2024,eu consegui terminar as funções
    //Yeaaah

});
