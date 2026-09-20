USE viniciusmartins_crudteste;

CREATE TABLE cliente_doador_tbl(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE, 
    senha VARCHAR(250) NOT NULL,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP, 
    ativo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE endereco_cliente(
    id INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(500) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(200) NOT NULL,
    dono_endereco INT NOT NULL UNIQUE, 
    CONSTRAINT fk_dono_endereco 
        FOREIGN KEY (dono_endereco) 
        REFERENCES cliente_doador_tbl(id) 
        ON DELETE CASCADE 
);

CREATE TABLE telefone_cliente(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ddd VARCHAR(2) NOT NULL,
    numero VARCHAR(9) NOT NULL,
    id_dono_tel INT NOT NULL UNIQUE, 
    CONSTRAINT fk_dono_telefone 
        FOREIGN KEY (id_dono_tel) 
        REFERENCES cliente_doador_tbl(id) 
        ON DELETE CASCADE 
);

INSERT INTO cliente_doador_tbl (nome, email, senha, ativo) VALUES
('João Silva', 'joao.silva@email.com', 'hash_da_senha_aqui', true),
('Maria Santos', 'maria.santos@email.com', 'hash_da_senha_aqui', true),
('Carlos Pereira', 'carlos.pereira@email.com', 'hash_da_senha_aqui', false),
('Ana Costa', 'ana.costa@email.com', 'hash_da_senha_aqui', true),
('Pedro Almeida', 'pedro.almeida@email.com', 'hash_da_senha_aqui', true);

INSERT INTO endereco_cliente (rua, bairro, cidade, estado, dono_endereco) VALUES
('Rua das Flores, 123', 'Centro', 'São Paulo', 'SP', 1),
('Avenida Paulista, 1500', 'Bela Vista', 'São Paulo', 'SP', 2),
('Rua XV de Novembro, 45', 'Centro', 'Curitiba', 'PR', 3),
('Avenida Atlântica, 500', 'Copacabana', 'Rio de Janeiro', 'RJ', 4),
('Rua da Bahia, 890', 'Lourdes', 'Belo Horizonte', 'MG', 5);

INSERT INTO telefone_cliente (ddd, numero, id_dono_tel) VALUES
('11', '987654321', 1),
('11', '912345678', 2),
('41', '999887766', 3),
('21', '988776655', 4),
('31', '977665544', 5);

SHOW TABLES;
SELECT * FROM cliente_doador_tbl;
SELECT * FROM endereco_cliente;
SELECT * FROM telefone_cliente;