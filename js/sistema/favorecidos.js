$(document).ready(function () {
	//configurando a tabela de dados listados
	$("#lista_favorecidos").DataTable({
		columnDefs: [{
			targets: [2],
			orderable: false
		}],
		destroy: true,
		info: false,
		language: {
			decimal: ",",
			thousands: "."
		},
		order: [
			[0, "asc"]
		],
		ordering: true,
		paging: false,
		searching: false
	});

	//configurando validação dos dados digitados no cadastro/edição
	$("#favorecidos_dados").validate({
		rules: {
			descricao_favorecidos: {
				required: true
			},
			tipo_favorecidos: {
				required: true
			}
		},
		highlight: function (element) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function (element) {
			$(element).removeClass("is-invalid");
		},
		errorElement: "div",
		errorClass: "invalid-feedback",
		errorPlacement: function (error, element) {
			if (element.parent(".input-group-prepend").length) {
				$(element).siblings(".invalid-feedback").append(error);
			} else {
				error.insertAfter(element);
			}
		},
		messages: {
			descricao_favorecidos: {
				required: "Este campo não pode ser vazio!"
			},
			tipo_favorecidos: {
				required: "Este campo não pode ser vazio!",
			}
		}
	});

	//clicar no botão da div de erros e escondendo as mensagens de erros de validação da listagem
	$("#div_mensagem_botao_favorecidos").click(function () {
		$("#div_mensagem_favorecidos").hide();
	});

	//clicar no botão da div de erros e escondendo as mensagens de erros de validação do registro
	$("#div_mensagem_registro_botao_favorecidos").click(function () {
		$("#div_mensagem_registro_favorecidos").hide();
	});

	//voltando para a página inicial do menu do sistema
	$("#home_index_favorecidos").click(function () {
		$(location).prop("href", "menu.php");
	});

	//voltando para a página de listagem de favorecidos na mesma página onde ocorreu a chamada
	$("#favorecidos_index").click(function (e) {
		e.stopImmediatePropagation();

		$("#conteudo").load("favorecidos_index.php", {
			pagina_favorecidos: $("#pagina_favorecidos").val(),
			texto_busca_favorecidos: $("#texto_busca_favorecidos").val()
		});
	});

	//botão limpar do cadastro de informações
	$("#botao_limpar_favorecidos").click(function () {
		$("#nome").focus();
		$("#favorecidos_dados").each(function () {
			$(this).find(":input").removeClass("is-invalid");
			$(this).find(":input").removeAttr("value");
		});
	});

	//botão salvar do cadastro de informações
	$("#botao_salvar_favorecidos").click(function (e) {
		$("#modal_salvar_favorecidos").modal("show");
	});

	//botão sim da pergunta de salvar as informações de cadastro
	$("#modal_salvar_sim_favorecidos").click(function (e) {
		e.stopImmediatePropagation();

		if (!$("#favorecidos_dados").valid()) {
			$("#modal_salvar_favorecidos").modal("hide");
			return;
		}

		var dados = $("#favorecidos_dados").serializeArray().reduce(function (vetor, obj) {
			vetor[obj.name] = obj.value;
			return vetor;
		}, {});
		var operacao = null;

		$("#carregando_favorecidos").removeClass("d-none");

		if ($.trim($("#id_favorecidos").val()) != "") {
			operacao = "editar";
		} else {
			operacao = "adicionar";
		}
		dados = JSON.stringify(dados);

		$.ajax({
			type: "POST",
			cache: false,
			url: "favorecidos_crud.php",
			data: {
				acao: operacao,
				registro: dados
			},
			dataType: "json",
			success: function (e) {
				$("#conteudo").load("favorecidos_index.php", {
					pagina_favorecidos: $("#pagina_favorecidos").val(),
					texto_busca_favorecidos: $("#texto_busca_favorecidos").val()
				}, function () {
					$("#div_mensagem_texto_favorecidos").empty().append("favorecidos cadastrado!");
					$("#div_mensagem_favorecidos").show();
				});
			},
			error: function (e) {
				$("#div_mensagem_registro_texto_favorecidos").empty().append(e.responseText);
				$("#div_mensagem_registro_favorecidos").show();
			},
			complete: function () {
				$("#modal_salvar_favorecidos").modal("hide");
				$("#carregando_favorecidos").addClass("d-none");
			}
		});
	});

	//botão adicionar da tela de listagem de registros
	$("#botao_adicionar_favorecidos").click(function (e) {
		e.stopImmediatePropagation();

		//levando os elementos para tela de consulta para depois realizar as buscas/pesquisas
		var pagina = $("#pagina_favorecidos.btn.btn-primary.btn-sm").val();
		var texto_busca = $("#texto_busca_favorecidos").val();

		$("#conteudo").load("favorecidos_add.php", function () {
			$("#carregando_favorecidos").removeClass("d-none");

			$.ajax({
				type: "POST",
				cache: false,
				url: "favorecidos_add.php",
				data: {
					pagina_favorecidos: pagina,
					texto_busca_favorecidos: texto_busca
				},
				dataType: "html",
				success: function (e) {
					$("#conteudo").empty().append(e);
				},
				error: function (e) {
					$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
					$("#div_mensagem_favorecidos").show();
				},
				complete: function () {
					$("#carregando_favorecidos").addClass("d-none");
				}
			});
		});
	});

	//botão pesquisar da tela de listagem de registros
	$("#botao_pesquisar_favorecidos").click(function (e) {
		e.stopImmediatePropagation();

		$("#carregando_favorecidos").removeClass("d-none");

		$.ajax({
			type: "POST",
			cache: false,
			url: "favorecidos_index.php",
			data: {
				texto_busca_favorecidos: $("#texto_busca_favorecidos").val()
			},
			dataType: "html",
			success: function (e) {
				$("#conteudo").empty().append(e);
			},
			error: function (e) {
				$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
				$("#div_mensagem_favorecidos").show();
			},
			complete: function () {
				$("#carregando_favorecidos").addClass("d-none");
			}
		});
	});

	//botão editar da tela de listagem de registros
	$(document).on("click", "#botao_editar_favorecidos", function (e) {
		e.stopImmediatePropagation();
		//levando os elementos para tela de consulta para depois realizar as buscas/pesquisas
		var id = $(this).attr("chave");
		var pagina = $("#pagina_favorecidos.btn.btn-primary.btn-sm").val();
		var texto_busca = $("#texto_busca_favorecidos").val();

		$("#conteudo").load("favorecidos_edit.php", function () {
			$("#carregando_favorecidos").removeClass("d-none");

			$.ajax({
				type: "POST",
				cache: false,
				url: "favorecidos_edit.php",
				data: {
					id_favorecidos: id,
					pagina_favorecidos: pagina,
					texto_busca_favorecidos: texto_busca
				},
				dataType: "html",
				success: function (e) {
					$("#conteudo").empty().append(e);
				},
				error: function (e) {
					$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
					$("#div_mensagem_favorecidos").show();
				},
				complete: function () {
					$("#carregando_favorecidos").addClass("d-none");
				}
			});
		});
	});

	//botão visualizar da tela de listagem de registros
	$(document).on("click", "#botao_view_favorecidos", function (e) {
		e.stopImmediatePropagation();
		//levando os elementos para tela de consulta para depois realizar as buscas/pesquisas
		var id = $(this).attr("chave");
		var pagina = $("#pagina_favorecidos.btn.btn-primary.btn-sm").val();
		var texto_busca = $("#texto_busca_favorecidos").val();

		$("#conteudo").load("favorecidos_view.php", function () {
			$("#carregando_favorecidos").removeClass("d-none");

			$.ajax({
				type: "POST",
				cache: false,
				url: "favorecidos_view.php",
				data: {
					id_favorecidos: id,
					pagina_favorecidos: pagina,
					texto_busca_favorecidos: texto_busca
				},
				dataType: "html",
				success: function (e) {
					$("#conteudo").empty().append(e);
				},
				error: function (e) {
					$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
					$("#div_mensagem_favorecidos").show();
				},
				complete: function () {
					$("#carregando_favorecidos").addClass("d-none");
				}
			});
		});
	});

	//botão paginação da tela de listagem de registros
	$(document).on("click", "#pagina_favorecidos", function (e) {
		//Aqui como links de botões têm o mesmo nome é necessário parar as chamadas
		e.stopImmediatePropagation();

		var texto_busca = $("#texto_busca_favorecidos").val();
		var pagina = $(this).val();
		$("#carregando_favorecidos").removeClass("d-none");

		$.ajax({
			type: "POST",
			cache: false,
			url: "favorecidos_index.php",
			data: {
				pagina_favorecidos: pagina,
				texto_busca_favorecidos: texto_busca
			},
			dataType: "html",
			success: function (e) {
				$("#conteudo").empty().append(e);
			},
			error: function (e) {
				$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
				$("#div_mensagem_favorecidos").show();
			},
			complete: function () {
				$("#carregando_favorecidos").addClass("d-none");
				$("#texto_busca_favorecidos").text(texto_busca);
			}
		});
	});

	//botão excluir da tela de listagem de registros
	$(document).on("click", "#botao_excluir_favorecidos", function (e) {
		e.stopImmediatePropagation();

		confirmaExclusao(this);
	});

	function confirmaExclusao(registro) {
		$("#modal_excluir_favorecidos").modal("show");
		$("#id_excluir_favorecidos").val($(registro).attr("chave"));
	}

	//botão sim da pergunta de excluir de listagem de registros
	$("#modal_excluir_sim_favorecidos").click(function () {
		excluirRegistro();
	});

	//operação de exclusão do registro
	function excluirRegistro() {
		var registro = new Object();
		var registroJson = null;

		registro.id = $("#id_excluir_favorecidos").val();
		registroJson = JSON.stringify(registro);

		$.ajax({
			type: "POST",
			cache: false,
			url: "favorecidos_crud.php",
			data: {
				acao: "excluir",
				registro: registroJson
			},
			dataType: "json",
			success: function () {
				$("#div_mensagem_texto_favorecidos").empty().append("favorecidos excluída!");
				$("#div_mensagem_favorecidos").show();
				$("tr#" + registro.id + "_favorecidos").remove();
			},
			error: function (e) {
				$("#div_mensagem_texto_favorecidos").empty().append(e.responseText);
				$("#div_mensagem_favorecidos").show();
			},
			complete: function () {
				$("#modal_excluir_favorecidos").modal("hide");
			}
		});
	}
});