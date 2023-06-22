<?php

function validaDados($registro)
{
    $erros = [];

    if (!filter_var($registro->descricao_favorecidos, FILTER_SANITIZE_STRING)) {
        $erros["descricao_favorecidos"] =  "Descrição: Campo vazio e ou informação inválida!";
    }

    if (count($erros) > 0) {
        $_SESSION["erros"] = $erros;
        throw new Exception("Erro nas informações!");
    }
}
