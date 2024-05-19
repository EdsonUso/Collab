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
