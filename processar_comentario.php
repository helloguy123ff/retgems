<?php
// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $nome = $_POST["nome"];
    $comentario = $_POST["comentario"];
    
    // Abre o arquivo para escrita
    $arquivo = fopen("livro_de_visitas.txt", "a");
    
    // Escreve os dados no arquivo
    fwrite($arquivo, "Nome: $nome\n");
    fwrite($arquivo, "Comentário: $comentario\n\n");
    
    // Fecha o arquivo
    fclose($arquivo);
    
    // Redireciona de volta para a página do livro de visitas
    header("Location: index.html");
    exit();
}
?>
