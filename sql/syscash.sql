-- Criação do esquema
CREATE SCHEMA IF NOT EXISTS `syscash`;
USE `syscash`;

-- Tabela `usuario`
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Tabela `categoria`
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NOT NULL,
  `tipo` SMALLINT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categoria_usuario` (`usuario_id` ASC),
  CONSTRAINT `fk_categoria_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuario` (`id`)
) ENGINE = InnoDB;

-- Tabela `favorecidos`
CREATE TABLE IF NOT EXISTS `favorecidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `tipo` SMALLINT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_favorecidos_usuario` (`usuario_id` ASC),
  CONSTRAINT `fk_favorecidos_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuario` (`id`)
) ENGINE = InnoDB;

-- Tabela `conta_receber`
CREATE TABLE IF NOT EXISTS `conta_receber` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  `favorecido_id` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `data_vencimento` DATE NOT NULL,
  `categoria_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_conta_receber_categoria` (`categoria_id` ASC),
  INDEX `fk_conta_receber_favorecido` (`favorecido_id` ASC),
  INDEX `fk_conta_receber_usuario` (`usuario_id` ASC),
  CONSTRAINT `fk_conta_receber_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `categoria` (`id`),
  CONSTRAINT `fk_conta_receber_favorecido`
    FOREIGN KEY (`favorecido_id`)
    REFERENCES `favorecidos` (`id`),
  CONSTRAINT `fk_conta_receber_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuario` (`id`)
) ENGINE = InnoDB;

-- Tabela `conta_pagar`
CREATE TABLE IF NOT EXISTS `conta_pagar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `data_vencimento` DATE NOT NULL,
  `categoria_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_conta_pagar_categoria` (`categoria_id` ASC),
  INDEX `fk_conta_pagar_usuario` (`usuario_id` ASC),
  CONSTRAINT `fk_conta_pagar_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `categoria` (`id`),
  CONSTRAINT `fk_conta_pagar_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuario` (`id`)
) ENGINE = InnoDB;
