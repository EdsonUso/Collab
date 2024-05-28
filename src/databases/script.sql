CREATE database COLLAB;

use collab;

CREATE TABLE tipoUsuario(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    tipo VARCHAR(45)
);

INSERT INTO tipoUsuario(tipo) VALUES
	('programador'),
    ('modelador'),
    ('musico'),
    ('designer');

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    email VARCHAR(100),
    senha VARCHAR(30),
    fkTipoUsuario INT, 
    CONSTRAINT usuarioTipoUsuario FOREIGN KEY(fkTipoUsuario) REFERENCES tipoUsuario(id),
    dtCriacao DATETIME
);

CREATE TABLE jogoInspirador(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45)
);
INSERT INTO jogoInspirador (nome) VALUES
('Hollow Knight'),
('Stardew Valley'),
('Factorio'),
('God of War'),
('Stardew Valley'),
('Factorio'),
('Undertale'),
('Cave Story'),
('Cuphead'),
('Ori and the Blind Forest'),
('The Legend of Zelda Breath of the Wild'),
('Child of Light'),
('Gris'),
('Limbo'),
('Inside'),
('Hyper Light Drifter'),
('Death Stranding'),
('Final Fantasy VII Remake'),
('Monster Hunter: World'),
('God of War'),
('Assassins Creed Odyssey'),
('Red Dead Redemption 2'),
('Cyberpunk 2077'),
('The Last of Us Part II'),
('Journey'),
('Celeste'),
('The Witcher 3: Wild Hunt'),
('Final Fantasy XV'),
('NieR: Automata'),
('Persona 5'),
('Undertale'),
('Bastion');

create table jogoInspiradorUsuario(
	id INT AUTO_INCREMENT, 
    fkUsuario INT,
    fkJogo INT, 
    CONSTRAINT pkComposta PRIMARY KEY(id, fkUsuario, fkJogo),
    CONSTRAINT jogoUsuarioUsuario FOREIGN KEY(fkUsuario) REFERENCES usuario(id),
    CONSTRAINT jogoUsuarioJogo FOREIGN KEY (fkJogo) REFERENCES jogoInspirador(id)
);

CREATE TABLE collab(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45)
);

INSERT INTO usuario values(
	default, "teste", "teste@gmail.com", "123", 1, now() 
);

CREATE TABLE projeto(
	id INT AUTO_INCREMENT, 
    fkCollab INT, 
    CONSTRAINT pkComposta PRIMARY KEY(id, fkCollab),
    nome VARCHAR(45),
    descricao VARCHAR(200),
    CONSTRAINT projetoCollab FOREIGN KEY(fkCollab) REFERENCES collab(id)
);

CREATE TABLE membrosCollab(
	id INT AUTO_INCREMENT, 
    fkCollab INT, 
    fkUsuario INT, 
    CONSTRAINT pkComposta PRIMARY KEY(id, fkCollab, fkUsuario),
    dtCriacao DATETIME, 
    CONSTRAINT membrosCollabCollab FOREIGN KEY (fkCollab) REFERENCES collab(id),
    CONSTRAINT membrosCollabUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE publicacao(
	id INT AUTO_INCREMENT, 
    fkCollab INT, 
    fkProjeto INT, 
    CONSTRAINT pkComposta PRIMARY KEY(id, fkCollab, fkProjeto), 
    descricao VARCHAR(130), 
    imgPub VARCHAR(255),
    CONSTRAINT publicacaoCollab FOREIGN KEY (fkCollab) REFERENCES collab(id),
    CONSTRAINT publicacaoProjeto FOREIGN KEY (fkProjeto) REFERENCES projeto(id)
);
